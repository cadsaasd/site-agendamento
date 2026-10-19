from django.test import TestCase
from django.urls import reverse


class MainURLsTests(TestCase):
    def test_main_url_is_correct(self):
        url = reverse("main:home")
        self.assertEqual(url, '/')
