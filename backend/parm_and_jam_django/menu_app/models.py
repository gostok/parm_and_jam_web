from django.db import models

class MenuItem(models.Model):
    CATEGORY_CHOICES = [
        ('specials', 'Specials'),
        ('hot_sandwiches', 'Hot Sandwiches'),
        ('cold_sandwiches', 'Cold Sandwiches'),
        ('plates', 'Plates'),
        ('sides', 'Sides'),
        ('breakfast', 'Breakfast'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=0)
    image_url = models.ImageField(upload_to='menu_images/', blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    def __str__(self):
        return f"{self.title} ({self.category})"


# для оплаты

class Order(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_paid = models.BooleanField(default=False)
    payment_id = models.CharField(max_length=100, blank=True, null=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    menu_item = models.ForeignKey(MenuItem, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
