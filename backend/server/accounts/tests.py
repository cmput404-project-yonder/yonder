from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Author, User


class AuthorAccountTests(APITestCase):
    def setUp(self):
        self.credentials = {
            'username': 'testUser1',
            'password': 'testPassword1'
        }
        self.testAuthor = {
            "displayName": "testLogin",
            "github": "https://github.com/cmput404-project-yonder/yonder",
            "host": "http://testserver.com"
        }
        user = User.objects.create_user(**self.credentials)
        author = Author.objects.create(**self.testAuthor, user=user)
        self.testAuthor["id"] = author.id
        self.testAuthor["url"] = author.url

    def test_signup(self):
        data = {
            "username": "testUser2",
            "displayName": "testRegister",
            "password": "testPassword2",
            "github": "https://github.com/cmput404-project-yonder/yonder",
            "host": "http://testserver.com"
        }
        url = reverse('signup')
        response = self.client.post(
            url, data=data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Author.objects.get(
            displayName=data["displayName"]).displayName, 'testRegister')

    def test_login(self):
        data = {
            "username": "testUser1",
            "password": "testPassword1"
        }
        url = reverse('login')
        response = self.client.post(
            url, data=data, format='json')
        author_data = response.json()["author"]

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(author_data["displayName"], 'testLogin')
    
    def test_edit(self):
        data = {
            "id": self.testAuthor["id"],
            "displayName": "newDisplayName",
            "host": self.testAuthor["host"],
            "github": "https://github.com/newGithubLink",
            "url": self.testAuthor["url"],
        }
        url = reverse('author')
        response = self.client.post(
            url, data=data, format='json')
        author_data = response.json()["author"]

        author = Author.objects.get(displayName="newDisplayName")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(author_data["displayName"], author.displayName)
        self.assertEqual(author_data["github"], author.github)

    def test_delete(self):
        data = {
            "id": self.testAuthor["id"],
        }
        url = reverse('author')
        response = self.client.delete(
            url, data=data, format='json')
        
        try:
            author = Author.objects.get(displayName="newDisplayName")
            self.fail("author not deleted")
        except Author.DoesNotExist:
            self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)