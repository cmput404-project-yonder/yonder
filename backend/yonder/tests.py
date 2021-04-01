from django.urls import reverse
from django.test import TestCase
from django.db.models import signals
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from django.utils import timezone
from .models import Author, User, Post, Inbox, AuthorFollower, AuthorFriend, Comment, Like
from . import signals
from .serializers import AuthorSerializer, InboxSerializer
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

class PublicPostTests(APITestCase):
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

        self.post1 = {
            "title": "A public post",
            "description": "public post",
            "contentType": "text/plain",
            "content": "Everyone can see this",
            "author": self.testAuthor,
            "categories": ["web", "tutorial"],
            "visibility": "PUBLIC",
            "unlisted": False
        }
        self.post2 = {
            "title": "Another public post",
            "description": "public post",
            "contentType": "text/plain",
            "content": "Everyone can also see this",
            "author": self.testAuthor,
            "categories": ["web", "tutorial"],
            "visibility": "PUBLIC",
            "unlisted": False
        }
        self.post3 = {
            "title": "A private post",
            "description": "private post",
            "contentType": "text/plain",
            "content": "Not everyone can see this",
            "author": self.testAuthor,
            "categories": ["web", "tutorial"],
            "visibility": "PRIVATE",
            "unlisted": False
        }

        def test_get(self):
            #Create two public posts and a private post
            post_url = reverse('posts', args=[self.author.id])
            self.client.post(post_url, data=self.post1, format='json')
            self.client.post(post_url, data=self.post2, format='json')
            self.client.post(post_url, data=self.post3, format='json')

            get_url = reverse('public_posts')
            response = self.client.get(get_url)
            #Returns two public posts that were created
            self.assertEqual(len(response), 2)

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

        self.followJSON1 = {"actor": self.authorJSON2, "object": self.authorJSON1}
        self.followJSON2 = {"actor": self.authorJSON1, "object": self.authorJSON2}

        credBytes= base64.b64encode(f'{self.credentials1["username"]}:{self.credentials1["password"]}'.encode())
        self.client.credentials(HTTP_AUTHORIZATION='Basic ' + credBytes.decode())

        self.data =  {
            "type": "post",
            "title": "A Friendly post title about a post about web dev",
            "id": "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/764efa883dda1e11db47671c4a3bbd9e",
            "source": "http://lastplaceigotthisfrom.com/posts/yyyyy",
            "origin": "http://whereitcamefrom.com/posts/zzzzz",
            "description": "This post discusses stuff -- brief",
            "contentType": "text/plain",
            "content": "Þā wæs on burgum Bēowulf Scd ccan",
            "author": self.authorJSON1,
            "categories": ["web", "tutorial"],
            "comments": "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments",
            "published": "2015-03-09T13:07:04+00:00",
            "visibility": "FRIENDS",
            "unlisted": False
        }

    def test_follow(self):
        self.assertEqual(0, AuthorFollower.objects.filter(author=self.author1.id).count())

        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.put(url, data=self.followJSON1, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(1, AuthorFollower.objects.filter(author=self.author1.id).count())

    def test_get_followers(self):
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.put(url, data=self.followJSON1, format='json')

        url = reverse('follower_list', args=[self.author1.id])
        response = self.client.get(url)
        followers_data = response.json()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(followers_data), AuthorFollower.objects.filter(author=self.author1.id).count())

    def test_delete_follower(self):
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.put(url, data=self.followJSON1, format='json')

        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(0, AuthorFollower.objects.filter(author=self.author1.id).count())

    def test_check_not_follower(self):
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.get(url, data=self.followJSON1, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_check_is_follower(self):
        # Setup a follow
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.put(url, self.followJSON1, format='json')

        # Get follower
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_are_friends(self):
        # Setup two-way following
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        response = self.client.put(url, data=self.followJSON1, format='json')
        url = reverse('followers', args=[self.author2.id, self.author1.id])
        response = self.client.put(url, data=self.followJSON2, format='json')

        self.author1.refresh_from_db()
        self.author2.refresh_from_db()

        self.assertEqual(1, AuthorFriend.objects.filter(author=self.author1, friend=self.authorJSON2).count())
        self.assertEqual(1, AuthorFriend.objects.filter(author=self.author2, friend=self.authorJSON1).count())

    def test_friends_post_inbox_negative(self):
        # Only friend post should not be sent to followers
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        self.client.put(url, data=self.followJSON1, format='json')

        url = reverse('inbox', args=[self.author2.id])
        response = self.client.post(url, content_type='application/json', data=json.dumps(self.data))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        inbox = Inbox.objects.get(author_id=self.author2.id)
        self.assertEqual(len(inbox.items), 1)

    def test_friends_post_inbox_positive(self):
        url = reverse('followers', args=[self.author1.id, self.author2.id])
        self.client.put(url, data=self.followJSON1, format='json')
        url = reverse('followers', args=[self.author2.id, self.author1.id])
        self.client.put(url, data=self.followJSON2, format='json')

        url = reverse('inbox', args=[self.author2.id])
        response = self.client.post(url, content_type='application/json', data=json.dumps(self.data))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        inbox = Inbox.objects.get(author_id=self.author2.id)
        # 2 => follow & post items
        self.assertEqual(len(inbox.items), 2)


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
            "host": "http://testserver.com/"
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
            "host": "http://testserver.com/"
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
        self.like = {
            "author": self.author2,
            "object_url": ""
        }
        self.testFollow = {
            "author": self.author1,
            "follower": self.authorJSON2
        }

    def test_create_post(self):
        #author1 creates a post and sends the data to followers' inbox
        AuthorFollower.objects.create(**self.testFollow)
        Post.objects.create(**self.post)
        inbox_item1 = Inbox.objects.filter(author=self.author1).count()
        inbox_item2= Inbox.objects.filter(author=self.author2).count()
        #one inbox for each author, one for creating follower and one for creating post
        self.assertEqual(inbox_item1,1)
        self.assertEqual(inbox_item2,1)

    def test_follow_to_inbox(self):
        #author2 follows author1 and sends the data to followee's inbox
        AuthorFollower.objects.create(**self.testFollow)
        inbox_item = Inbox.objects.filter(author=self.author1).count()
        #one inbox for author1 sent from author2's follow
        self.assertEqual(inbox_item,1)
    
    def test_like_to_inbox(self):
        #author2 likes a post created by author1 and sends the data to author1's inbox
        AuthorFollower.objects.create(**self.testFollow)
        post = Post.objects.create(**self.post)
        self.like["object_url"] = post.get_absolute_url()
        Like.objects.create(**self.like)
        inbox = Inbox.objects.filter(author=self.author1)
        for _inbox in inbox:
            inbox_items = _inbox.items
        #one inbox created for author1
        self.assertEqual(inbox.count(),1)
        #two inbox items from author2's follow and author2's like on the post
        self.assertEqual(len(inbox_items), 2)
        

 
class LikeTests(APITestCase):
    def setUp(self):
        self.credentials1 = {
            'username': 'testUser1',
            'password': 'testPassword1'
        }
        self.credentials2 = {
            'username': 'testUser2',
            'password': 'testPassword2'
        }
        self.testAuthor1 = {
            "displayName": "testAuthor1",
            "github": "https://github.com/cmput404-project-yonder/yonder",
            "host": "http://testserver.com/"
        }
        self.testAuthor2 = {
            "displayName": "testAuthor2",
            "github": "https://github.com/cmput404-project-yonder/yonder",
            "host": "http://testserver.com/"
        }
        user1 = User.objects.create_user(**self.credentials1)
        user2 = User.objects.create_user(**self.credentials2)
        self.author1 = Author.objects.create(**self.testAuthor1, user=user1)
        self.author2 = Author.objects.create(**self.testAuthor2, user=user2)

        # create post and comment
        self.author2_post = {
            "title": "A post title about a post about web dev",
            "description": "This post discusses stuff -- brief",
            "contentType": "text/plain",
            "content": "Þā wæs on burgum Bēowulf Scyldinga",
            "author": self.author2,
            "categories": ["web", "tutorial"],
            "visibility": "PUBLIC",
            "unlisted": False
        }
        self.author2_post = Post.objects.create(**self.author2_post)
        self.author1_comment = {
            "post": self.author2_post,
            "author": self.author1,
            "comment": "cool post dude",
            "published": "2015-03-09T13:07:04+00:00"
        }
        self.author1_comment = Comment.objects.create(**self.author1_comment)

        # request post and comment data
        post_like_data = {
            "type": "Like",
            "author":{
                "type":"author",
                "host": self.author1.host,
                "displayName": self.author1.displayName,
                "url": self.author1.get_absolute_url(),
                "github": self.author1.github
            },
            "object": self.author2_post.get_absolute_url()
        }
        comment_like_data = {
            "type": "Like",
            "author":{
                "type":"author",
                "host": self.author2.host,
                "displayName": self.author2.displayName,
                "url": self.author2.get_absolute_url(),
                "github": self.author2.github
            },
            "object": self.author1_comment.get_absolute_url()
        }
        self.post_like_data_json = json.dumps(post_like_data)
        self.comment_like_data_json = json.dumps(comment_like_data)

        credBytes= base64.b64encode(f'{self.credentials1["username"]}:{self.credentials1["password"]}'.encode())
        self.client.credentials(HTTP_AUTHORIZATION='Basic ' + credBytes.decode())
    
    def test_post_like(self):
        # author1 sends like to author2_post
        url = reverse('inbox', args=[self.author1.id])
        response = self.client.post(url, content_type='application/json', data=self.post_like_data_json)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        author = Author.objects.get(displayName=self.testAuthor2["displayName"])
        like = Like.objects.get(object_url=self.author2_post.get_absolute_url())
        self.assertEqual(like.author.id, self.author1.id)
    
    def test_get_post_likes(self):
        # author1 sends like to author2_post
        url = reverse('inbox', args=[self.author1.id])
        response = self.client.post(url, content_type='application/json', data=self.post_like_data_json)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        url = reverse('post_likes', args=[self.author1.id, self.author2_post.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["author"], self.author1.id)
        self.assertEqual(response.data[0]["object_url"], self.author2_post.get_absolute_url())
    
    def test_get_comment_likes(self):
        # author2 sends like to author1_comment
        url = reverse('inbox', args=[self.author2.id])
        response = self.client.post(url, content_type='application/json', data=self.comment_like_data_json)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        url = reverse('comment_likes', args=[self.author2.id, self.author2_post.id, self.author1_comment.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["author"], self.author2.id)
        self.assertEqual(response.data[0]["object_url"], self.author1_comment.get_absolute_url())

    def test_get_liked(self):
        # author1 sends like to author1_comment
        url = reverse('inbox', args=[self.author1.id])
        response = self.client.post(url, content_type='application/json', data=self.comment_like_data_json)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # author1 sends like to author2_post
        url = reverse('inbox', args=[self.author1.id])
        response = self.client.post(url, content_type='application/json', data=self.post_like_data_json)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        url = reverse('likes', args=[self.author1.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["items"]), 2)
