from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.utils import timezone
from .models import Author, User, Post, Inbox
import json


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

        # url = reverse('login')
        # response = self.client.post(
        #     url, data=self.credentials, format='json')
        # print(response.json())

        self.post = {
            "title": "A post title about a post about web dev",
            "description": "This post discusses stuff -- brief",
            "contentType": "text/plain",
            "content": "Þā wæs on burgum Bēowulf Scyldinga, lēof lēod-cyning, longe þrāge folcum gefrǣge (fæder ellor hwearf, aldor of earde), oð þæt him eft onwōc hēah Healfdene; hēold þenden lifde, gamol and gūð-rēow, glæde Scyldingas. Þǣm fēower bearn forð-gerīmed in worold wōcun, weoroda rǣswan, Heorogār and Hrōðgār and Hālga til; hȳrde ic, þat Elan cwēn Ongenþēowes wæs Heaðoscilfinges heals-gebedde. Þā wæs Hrōðgāre here-spēd gyfen, wīges weorð-mynd, þæt him his wine-māgas georne hȳrdon, oð þæt sēo geogoð gewēox, mago-driht micel. Him on mōd bearn, þæt heal-reced hātan wolde, medo-ærn micel men gewyrcean, þone yldo bearn ǣfre gefrūnon, and þǣr on innan eall gedǣlan geongum and ealdum, swylc him god sealde, būton folc-scare and feorum gumena. Þā ic wīde gefrægn weorc gebannan manigre mǣgðe geond þisne middan-geard, folc-stede frætwan. Him on fyrste gelomp ǣdre mid yldum, þæt hit wearð eal gearo, heal-ærna mǣst; scōp him Heort naman, sē þe his wordes geweald wīde hæfde. Hē bēot ne ālēh, bēagas dǣlde, sinc æt symle. Sele hlīfade hēah and horn-gēap: heaðo-wylma bād, lāðan līges; ne wæs hit lenge þā gēn þæt se ecg-hete āðum-swerian 85 æfter wæl-nīðe wæcnan scolde. Þā se ellen-gǣst earfoðlīce þrāge geþolode, sē þe in þȳstrum bād, þæt hē dōgora gehwām drēam gehȳrde hlūdne in healle; þǣr wæs hearpan swēg, swutol sang scopes. Sægde sē þe cūðe frum-sceaft fīra feorran reccan",
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
        Inbox.objects.create(author=self.author)

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
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        author = Author.objects.get(displayName=self.testAuthor["displayName"])
        inbox = Inbox.objects.get(author_id=author.id)
        self.assertEqual(len(inbox.items), 1)
        self.assertEqual(self.data_json, json.dumps(inbox.items[0], sort_keys=True))

    def test_delete_inbox(self):
        url = reverse('inbox', args=[self.author.id])
        response = self.client.post(url, content_type='application/json', data=self.data_json)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        author = Author.objects.get(displayName=self.testAuthor["displayName"])
        inbox = Inbox.objects.get(author_id=author.id)
        self.assertEqual(len(inbox.items), 1)

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        inbox = Inbox.objects.get(author_id=author.id)
        self.assertEqual(len(inbox.items), 0)