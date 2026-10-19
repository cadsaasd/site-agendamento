from django.test import TestCase
from django.urls import resolve, reverse
from main import views


class MainURLsTests(TestCase):
    def test_main_url_is_correct(self):
        url = reverse("main:home")
        self.assertEqual(url, '/')


class MainViewsTests(TestCase):
    def test_home_view_function_is_correct(self):
        view = resolve(reverse("main:home"))
        self.assertIs(view.func, views.home)
