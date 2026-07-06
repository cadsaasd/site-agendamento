from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.decorators import login_required


def login_view(request):
    return render(request, 'accounts/pages/login.html')


def register_view(request):
    return render(request, 'accounts/pages/register.html')