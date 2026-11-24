from django.test import TestCase
from django.urls import reverse


class AccountViewTests(TestCase):
    def test_account_flow_is_available_at_the_single_account_url(self):
        url = reverse('accounts:account')
        response = self.client.get(url)

        self.assertEqual(url, '/accounts/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'accounts/pages/account.html')
