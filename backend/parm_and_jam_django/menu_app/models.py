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
