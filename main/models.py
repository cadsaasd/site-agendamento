from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, null=True)

    def __str__(self):
        return self.name

class Services(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    duration = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name='services'
    )

    def __str__(self):
        return f'{self.name}-{self.category}'

    def format_duration(self):
        hours = self.duration // 60
        minutes = self.duration % 60

        if hours and minutes:
            return f"{hours}h {minutes}min"
        elif hours:
            return f"{hours}h"
        else:
            return f"{minutes}min"

class LandingImages(models.Model):
    class Section(models.TextChoices):
        HERO = "hero", "Hero"
        CAROUSEL = 'carousel', "Carrossel"

    image = models.ImageField(upload_to="landing/")
    section = models.CharField(max_length=10, choices=Section.choices)
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name='landing_images'
    )
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=False)