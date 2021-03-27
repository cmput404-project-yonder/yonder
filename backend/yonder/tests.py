from django.urls import reverse
from django.test import TestCase
from django.db.models import signals
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from django.utils import timezone
from .models import Author, User, Post, Inbox, AuthorFollower, AuthorFriend
from . import signals
from .serializers import AuthorSerializer
from unittest.mock import patch
import json
import base64

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
        author = Author.objects.get(displayName=data["displayName"])

        self.assertIsNotNone(Inbox.objects.get(author_id=author.id))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(author.displayName, 'testRegister')

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

    def test_get_authors(self):
        url = reverse('authors')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)


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

        credBytes= base64.b64encode(f'{self.credentials["username"]}:{self.credentials["password"]}'.encode())
        self.client.credentials(HTTP_AUTHORIZATION='Basic ' + credBytes.decode())

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

        credBytes= base64.b64encode(f'{self.credentials1["username"]}:{self.credentials1["password"]}'.encode())
        self.client.credentials(HTTP_AUTHORIZATION='Basic ' + credBytes.decode())

    def test_follow(self):
        self.assertEqual(0, AuthorFollower.objects.filter(author=self.author1.id).count())

        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.put(url, data=self.authorJSON2, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(1, AuthorFollower.objects.filter(author=self.author1.id).count())

    def test_get_followers(self):
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.put(url, data=self.authorJSON2, format='json')

        url = reverse('follower_list', args=[self.author1.id])
        response = self.client.get(url)
        followers_data = response.json()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(followers_data), AuthorFollower.objects.filter(author=self.author1.id).count())

    def test_delete_follower(self):
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.put(url, data=self.authorJSON2, format='json')

        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.delete(url, data=self.authorJSON2, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(0, AuthorFollower.objects.filter(author=self.author1.id).count())

    def test_check_not_follower(self):
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.get(url, data=self.authorJSON2, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_check_is_follower(self):
        # Setup a follow
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.put(url, data=self.authorJSON2, format='json')

        # Get follower
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_are_friends(self):
        # Setup two-way following
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.put(url, data=self.authorJSON2, format='json')
        url = reverse('followers', args=[self.author2.id, self.author1.id])
        response = self.client.put(url, data=self.authorJSON1, format='json')

        self.author1.refresh_from_db()
        self.author2.refresh_from_db()

        self.assertEqual(1, AuthorFriend.objects.filter(author=self.author1, friend=self.authorJSON2).count())
        self.assertEqual(1, AuthorFriend.objects.filter(author=self.author2, friend=self.authorJSON1).count())


class InboxTests(APITestCase):
    def setUp(self):
        self.credentials = {
            'username': 'testUser',
            'password': 'testPassword'
        }
        self.testAuthor = {
            "displayName": "testAuthor",
            "github": "https://github.com/cmput404-project-yonder/yonder",
            "host": "http://testserver.com"
        }
        user = User.objects.create_user(**self.credentials)
        self.author = Author.objects.create(**self.testAuthor, user=user)

        credBytes= base64.b64encode(f'{self.credentials["username"]}:{self.credentials["password"]}'.encode())
        self.client.credentials(HTTP_AUTHORIZATION='Basic ' + credBytes.decode())

        data = {
            "type": "post",
            "title": "A Friendly post title about a post about web dev",
            "id": "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/764efa883dda1e11db47671c4a3bbd9e",
            "source": "http://lastplaceigotthisfrom.com/posts/yyyyy",
            "origin": "http://whereitcamefrom.com/posts/zzzzz",
            "description": "This post discusses stuff -- brief",
            "contentType": "text/plain",
            "content": "Þā wæs on burgum Bēowulf Scd ccan",
            "author": {
                "type": "author",
                "id": "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
                "host": "http://127.0.0.1:5454/",
                "displayName": "Lara Croft",
                "url": "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
                "github": "http://github.com/laracroft"
            },
            "categories": ["web", "tutorial"],
            "comments": "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments",
            "published": "2015-03-09T13:07:04+00:00",
            "visibility": "FRIENDS",
            "unlisted": False
        }
        self.data_json = json.dumps(data, sort_keys=True)

    def test_get_inbox(self):
        url = reverse('inbox', args=[self.author.id])
        response = self.client.get(url)
        inbox_data = response.json()
        self.assertEqual(inbox_data["author"], self.author.get_absolute_url())
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_inbox(self):
        url = reverse('inbox', args=[self.author.id])
        response = self.client.post(url, content_type='application/json', data=self.data_json)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        author = Author.objects.get(displayName=self.testAuthor["displayName"])
        inbox = Inbox.objects.get(author_id=author.id)
        self.assertEqual(len(inbox.items), 1)
        self.assertEqual(self.data_json, json.dumps(inbox.items[0], sort_keys=True))

    def test_delete_inbox(self):
        url = reverse('inbox', args=[self.author.id])
        response = self.client.post(url, content_type='application/json', data=self.data_json)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        author = Author.objects.get(displayName=self.testAuthor["displayName"])
        inbox = Inbox.objects.get(author_id=author.id)
        self.assertEqual(len(inbox.items), 1)

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        inbox = Inbox.objects.get(author_id=author.id)
        self.assertEqual(len(inbox.items), 0)

class SignalTests(TestCase):
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
        

        self.post = {
            "title": "A post testing post save signal",
            "description": "This post discusses stuff -- brief",
            "contentType": "text/plain",
            "content": "Þā wæs on burgum Bēowulf Scyldinga",
            "author": self.author1,
            "categories": ["web", "tutorial"],
            "visibility": "PUBLIC",
            "unlisted": False
        }
        self.testFollow = {
            "author": self.author1,
            "follower": self.authorJSON2
        }

    #@patch('yonder.signals.signal_handler_post_save')
    def test_post_to_inbox(self):
        AuthorFollower.objects.create(**self.testFollow)
        post = Post.objects.create(**self.post)

    #@patch('yonder.signals.signal_handler_follow_save')
    def test_follow_to_inbox(self):
        AuthorFollower.objects.create(**self.testFollow)