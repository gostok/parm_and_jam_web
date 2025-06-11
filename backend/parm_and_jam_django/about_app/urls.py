from django.urls import path
from . import views

urlpatterns = [
    path('our_story/', views.our_story, name='our_story'),
    path('location/', views.location, name='location'),
    path('contact_us/', views.contact_us, name='contact_us'),
    path('jobs/', views.jobs, name='jobs'),
]