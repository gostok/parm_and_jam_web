from django.shortcuts import render


def shop(request):
    return render(request, 'shop_app/shop.html')
