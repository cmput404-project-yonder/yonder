from .models import Author, AuthorFollower, AuthorFriend
from .serializers import AuthorSerializer, AuthorFriendSerializer
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core import serializers
import uuid
import requests


def check_remote_follow(theirAuthor, ourAuthor):
    url = theirAuthor["url"] + "/followers/" + ourAuthor["id"]
    response = requests.get(url)
    if requests.status_code == 404:
        return False
    elif requests.status_code == 200:
        return True

# Our Server:
# B follows A
# check if A->B exist, if so then create Friend object
# Other servers (A: our server,  B: other server):
# A follows B => same as our server scenario
# B follows A => call author/B/followers/A to check if A->B exists
@receiver(post_save, sender=AuthorFollower)
def create_friend(sender, instance, **kwargs):
    authorB_id = instance.follower["id"]
    authorA = instance.author
    authorA_json = AuthorSerializer(authorA).data
    try:
        authorB = Author.objects.get(pk=uuid.UUID(authorB_id))
        authorB_follow = AuthorFollower.objects.get(author=authorB, follower=authorA_json)
        # Create the friendship both ways
        authorA_friend_serializer = AuthorFriendSerializer(data={
            "author": authorA.id,
            "friend": instance.follower
        })
        authorB_friend_serializer = AuthorFriendSerializer(data={
            "author": authorB.id,
            "friend": authorA_json
        })
        authorA_friend_serializer.is_valid()
        authorB_friend_serializer.is_valid()
        authorA_friend_serializer.save()
        authorB_friend_serializer.save()
    except Author.DoesNotExist:
        # Handle remote server request
        if check_remote_follow(instance.follower, authorA_json):
            # Save this friendship for our author
            authorA_friend_serializer = AuthorFriendSerializer(data={
                "author": authorA.id,
                "friend": instance.follower
            })
            authorA_friend_serializer.save()
    except AuthorFollower.DoesNotExist:
        # The relationship is only one-way, so ignore
        return
