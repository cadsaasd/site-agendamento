from django.contrib import admin
from .models import Services, LandingImages
# Register your models here.

class ServicesAdmin(admin.ModelAdmin):
    ...

class LandingImagesAdmin(admin.ModelAdmin):
    ...

admin.site.register(Services, ServicesAdmin)
admin.site.register(LandingImages, LandingImagesAdmin)