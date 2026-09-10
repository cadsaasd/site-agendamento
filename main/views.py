from django.shortcuts import render

from .models import Services, LandingImages, Category


def home(request):
    categories = Category.objects.all()
    services = Services.objects.all()

    nails_images = LandingImages.objects.filter(
        section="carousel",
        is_active=True,
        category__slug="nails"
    ).order_by("order")

    lash_brow_images = LandingImages.objects.filter(
        section="carousel",
        is_active=True,
        category__slug="lash_brow"
    ).order_by("order")

    carousel_images = []

    for nail, lash in zip(nails_images, lash_brow_images):
        carousel_images.append(nail)
        carousel_images.append(lash)

    hero_image = LandingImages.objects.filter(
        section="hero",
        is_active=True
    ).order_by("order").first()

    return render(request, 'main/pages/home.html', {
        "services": services,
        "carousel_images": carousel_images,
        "hero_image": hero_image,
        "categories": categories,
    })