from django.db import models

# Create your models here.
class Services(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    duration = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)

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
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=False)