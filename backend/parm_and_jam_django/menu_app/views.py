from django.shortcuts import render



def menu(request):
    return render(request, 'menu_app/menu.html')
