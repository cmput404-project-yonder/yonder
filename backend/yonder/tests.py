from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.utils import timezone
from .models import Author, User, Post, AuthorFollower
from .serializers import AuthorSerializer


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
        self.author = Author.objects.create(**self.testAuthor, user=user)
        self.testAuthor["id"] = self.author.id

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
            "displayName": "newDisplayName",
            "github": "https://github.com/newGithubLink",
        }
        url = reverse('author_detail', args=[self.author.id])
        response = self.client.put(
            url,
            data=data,
            format='json'
        )
        author_data = response.json()

        author = Author.objects.get(displayName="newDisplayName")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(author_data["displayName"], author.displayName)
        self.assertEqual(author_data["github"], author.github)

    def test_delete(self):
        url = reverse('author_detail', args=[self.author.id])
        response = self.client.delete(url)

        try:
            _ = Author.objects.get(displayName="newDisplayName")
            self.fail("author not deleted")
        except Author.DoesNotExist:
            self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class PostTests(APITestCase):
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
        self.author = Author.objects.create(**self.testAuthor, user=user)

        self.post = {
            "title": "A post title about a post about web dev",
            "description": "This post discusses stuff -- brief",
            "contentType": "text/plain",
            "content": "Þā wæs on burgum Bēowulf Scyldinga",
            "author": self.testAuthor,
            "categories": ["web", "tutorial"],
            "visibility": "PUBLIC",
            "unlisted": False
        }

    def test_create(self):
        url = reverse('posts', args=[self.author.id])
        response = self.client.post(
            url, data=self.post, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIsNotNone(Post.objects.get(
            title=self.post["title"]))

class FollowerTests(APITestCase):
    def setUp(self):
        self.credentials1 = {
            'username': 'testUser1',
            'password': 'testPassword1'
        }
        self.testAuthor1 = {
            "displayName": "testAuthor1",
            "github": "https://github.com/cmput404-project-yonder/yonder",
            "host": "http://testserver.com"
        }
        user1 = User.objects.create_user(**self.credentials1)
        self.author1 = Author.objects.create(**self.testAuthor1, user=user1)
        self.authorJSON1 = AuthorSerializer(instance=self.author1).data

        self.credentials2 = {
            'username': 'testUser2',
            'password': 'testPassword2'
        }
        self.testAuthor2 = {
            "displayName": "testAuthor2",
            "github": "https://github.com/cmput404-project-yonder/yonder",
            "host": "http://testserver.com"
        }
        user2 = User.objects.create_user(**self.credentials2)
        self.author2 = Author.objects.create(**self.testAuthor2, user=user2)
        self.authorJSON2 = AuthorSerializer(instance=self.author2).data

    def test_follow(self):
        self.assertEqual(0, Author.objects.get(pk=self.author1.id).followers.count())

        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.put(url, data={'author': self.authorJSON1, 'follower': self.authorJSON2}, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(1, AuthorFollower.objects.filter(author=self.author1.id).count())

    def test_get_followers(self):
        url = reverse('follower_list', args=[self.author1.id])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(1, Author.objects.get(pk=self.author1.id).followers.count())

    def test_delete_follower(self):
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(0, Author.objects.get(pk=self.author1.id).followers.count())

    def test_check_not_follower(self):
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_check_is_follower(self):
        # Setup a follow
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.put(url)

        # Get follower
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.get(url)
        follower_data = response.json()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(follower_data["displayName"], self.author2.displayName)

