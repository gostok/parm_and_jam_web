from django.shortcuts import render
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404, redirect
from .models import MenuItem, Order, OrderItem


# Настройки Юкасса
YOOKASSA_SHOP_ID = 'ваш_shop_id'
YOOKASSA_SECRET_KEY = 'ваш_секретный_ключ'
YOOKASSA_API_URL = 'https://api.yookassa.ru/v3/payments'

# Настройки Айки
AIKA_API_URL = 'https://api.aika.ru/v1/receipt'
AIKA_API_KEY = 'ваш_ключ_айки'


def menu(request):
    items = MenuItem.objects.all()
    return render(request, 'menu_app/menu.html', {'items': items})


@csrf_exempt
def create_order_and_payment(request):
    """
    Получаем данные корзины от клиента, создаем заказ и платеж в Юкассе,
    возвращаем ссылку на оплату.
    """
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST allowed'}, status=405)
    
    data = json.loads(request.body)
    cart_items = data.get('cart_items')  # ожидается список {id: ..., quantity: ...}
    if not cart_items:
        return JsonResponse({'error': 'Cart is empty'}, status=400)
    
    # Создаем заказ
    order = Order.objects.create(total_amount=0)
    total_amount = 0

    for item in cart_items:
        menu_item = get_object_or_404(MenuItem, id=item['id'])
        quantity = item.get('quantity', 1)
        price = menu_item.price
        OrderItem.objects.create(order=order, menu_item=menu_item, quantity=quantity, price=price)
        total_amount += price * quantity

    order.total_amount = total_amount
    order.save()

    # Создаем платеж в Юкасса
    payment_data = {
        "amount": {
            "value": f"{total_amount:.2f}",
            "currency": "RUB"
        },
        "confirmation": {
            "type": "redirect",
            "return_url": request.build_absolute_uri('/payment_success/')
        },
        "capture": True,
        "description": f"Заказ #{order.id}"
    }

    auth = (YOOKASSA_SHOP_ID, YOOKASSA_SECRET_KEY)
    response = requests.post(YOOKASSA_API_URL, json=payment_data, auth=auth)

    if response.status_code != 200 and response.status_code != 201:
        return JsonResponse({'error': 'Failed to create payment'}, status=500)

    payment_response = response.json()
    payment_id = payment_response['id']
    confirmation_url = payment_response['confirmation']['confirmation_url']

    order.payment_id = payment_id
    order.save()

    return JsonResponse({'confirmation_url': confirmation_url})


@csrf_exempt
def payment_callback(request):
    """
    Обработка уведомления от Юкасса.
    """
    data = json.loads(request.body)
    # TODO: проверить подпись запроса (для безопасности)
    event = data.get('event')
    payment = data.get('object')

    if event == 'payment.succeeded':
        payment_id = payment['id']
        try:
            order = Order.objects.get(payment_id=payment_id)
            order.is_paid = True
            order.save()

            # Отправляем данные заказа в Айку
            send_order_to_aika(order)

        except Order.DoesNotExist:
            return HttpResponse(status=404)

    return HttpResponse(status=200)


def send_order_to_aika(order):
    """
    Отправка данных заказа в Айку для пробития чека.
    """
    # Формируем данные для Айки
    items_data = []
    for item in order.items.all():
        items_data.append({
            "name": item.menu_item.title,
            "price": float(item.price),
            "quantity": item.quantity,
            "amount": float(item.price) * item.quantity,
            "vat": "none"
        })

    payload = {
        "order_id": str(order.id),
        "items": items_data,
        "total": float(order.total_amount),
        "payment_type": "card",  # или cash, зависит от оплаты
        # добавьте другие необходимые поля по документации Айки
    }

    headers = {
        'Authorization': f'Bearer {AIKA_API_KEY}',
        'Content-Type': 'application/json'
    }

    response = requests.post(AIKA_API_URL, json=payload, headers=headers)

    if response.status_code != 200:
        # Логируем ошибку
        print(f"Failed to send order {order.id} to Aika: {response.text}")
    else:
        print(f"Order {order.id} sent to Aika successfully")

