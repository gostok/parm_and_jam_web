from django.shortcuts import render


def our_story(request):
    return render(request, 'about_app/our_story.html')


def location(request):
    return render(request, 'about_app/location.html')


def contact_us(request):
    return render(request, 'about_app/contact_us.html')


def jobs(request):
    return render(request, 'about_app/jobs.html')
