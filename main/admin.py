from django.contrib import admin
from .models import Services, LandingImages, Category
# Register your models here.

class ServicesAdmin(admin.ModelAdmin):
    ...

class LandingImagesAdmin(admin.ModelAdmin):
    ...

class CategoryAdmin(admin.ModelAdmin):
    ...

admin.site.register(Category, CategoryAdmin)
admin.site.register(Services, ServicesAdmin)
admin.site.register(LandingImages, LandingImagesAdmin)