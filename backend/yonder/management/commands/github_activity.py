from django.core.management.base import BaseCommand, CommandError
from yonder.models import Author, Post
from yonder.serializers import AuthorSerializer, PostSerializer
import requests
import time
import random

RANDOM_TITLE = [", it's neat", ", it's pretty dope", ", it's onto something", ", it's really cool"]

class Command(BaseCommand):
    help = 'Retreives github activity updates for authors'

    def handle(self, *args, **options):
        try:
            timestamp = time.time() - 600
            matchSince = time.strftime('%a, %d %b %Y %H:%M:%S GMT', time.gmtime(timestamp))
            headers = {
                "Accept": "application/vnd.github.v3+json",
                "If-Modified-Since": matchSince
            }

            authors = Author.objects.exclude(github="")
            for author in authors:
                githubUser = author.github.split("/")[-1]
                url = f"https://api.github.com/users/{githubUser}/events"
                response = requests.get(url, headers=headers)
                if response.status_code == 200 and len(response.content) > 0:
                    postable_events = [e for e in response.json() if e["type"] in ["WatchEvent", "ForkEvent"]]
                    self.create_posts_from_activity(author, postable_events)
                    self.stdout.write(self.style.SUCCESS("Pulled activity to "+author.displayName+"'s stream"))
        except Exception as e:
            self.stdout.write(self.style.ERROR("Failed to get github activity for authors:" + str(e)))
            return

        self.stdout.write(self.style.SUCCESS("Successfully retreived github activity"))
        return

    def create_posts_from_activity(self, author, activity):
        authorJSON = AuthorSerializer(instance=author).data

        for event in activity:
            data = {}
            data["author"] = authorJSON
            data["source"] = authorJSON["host"]
            data["origin"] = authorJSON["host"]
            data["description"] = "Auto created by Yonder :)"
            data["contentType"] = "text/markdown"
            data["categories"] = ["github"]
            data["unlisted"] = False
            data["visibility"] = "PUBLIC"
            repoUrl = "https://github.com/" + event["repo"]["name"]
            data["content"] = "[Check it out here]" + "(" + repoUrl + ")"

            if event["type"] == "WatchEvent":
                data["title"] = "I starred " + event["repo"]["name"] + random.choice(RANDOM_TITLE)
            elif event["type"] == "ForkEvent":
                data["title"] = "I forked " + event["repo"]["name"] + random.choice(RANDOM_TITLE)

            serializer = PostSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
            else:
                self.stdout.write(self.style.ERROR("failed to create post for " + author.displayName + " from a "+ event["type"]))
                self.stdout.write(self.style.ERROR(serializer.errors))
