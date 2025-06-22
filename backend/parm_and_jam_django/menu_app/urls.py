from django.urls import path
from . import views

urlpatterns = [
    path('', views.menu, name='menu'),
    path('create_order/', views.create_order_and_payment, name='create_order'),
    path('payment_callback/', views.payment_callback, name='payment_callback'),

]