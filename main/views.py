from django.shortcuts import render
from .models import Services, LandingImages

# Create your views here.
def home(request):
    services = Services.objects.all()
    carousel_images = LandingImages.objects.filter(
        section="carousel",
        is_active=True
    ).order_by("order")[:6]

    hero_image = LandingImages.objects.filter(
        section="hero",
        is_active=True
    ).order_by("order").first()


    return render(request, 'main/pages/home.html',{
        "services": services,
        "carousel_images": carousel_images,
        "hero_image": hero_image
    })