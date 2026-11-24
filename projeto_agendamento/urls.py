from django.contrib import admin
from django.urls import URLPattern, URLResolver, include, path
from django.conf.urls.static import static
from django.conf import settings


urlpatterns: list[URLPattern | URLResolver] = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('', include('main.urls'))
]

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT,
)

urlpatterns += static(
    settings.STATIC_URL,
    document_root=settings.STATIC_ROOT,
)
