from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db import IntegrityError

User = get_user_model()

class UserCreationTest(TestCase):
    def test_create_user_with_email_and_password(self):
        email = "test@example.com"
        password = "strongpassword123"

        user = User.objects.create_user(
            email=email,
            password=password
        )

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))
        self.assertTrue(user.is_active)

    def test_create_superuser(self):
        email = "admin@example.com"
        password = "adminpassword123"

        user = User.objects.create_superuser(
            email=email,
            password=password
        )

        self.assertEqual(user.email, email)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

    def test_create_user_without_email_raises_error(self):
        with self.assertRaises(ValueError):
            User.objects.create_user(
                email="",
                password="password123"
            )

    def test_create_user_with_duplicate_email_raises_error(self):
        User.objects.create_user(
            email="duplicate@example.com",
            password="password123"
        )

        with self.assertRaises(IntegrityError):
            User.objects.create_user(
                email="duplicate@example.com",
                password="password456"
            )
