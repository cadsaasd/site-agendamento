"""URLs do fluxo de autenticação."""
from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('', views.account_view, name='account'),
]
