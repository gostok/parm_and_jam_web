from django.shortcuts import render



def index(request):
    return render(request, 'home_app/index.html')
