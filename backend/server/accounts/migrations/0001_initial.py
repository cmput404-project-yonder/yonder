# Generated by Django 3.1.6 on 2021-02-23 11:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('host', models.URLField()),
                ('displayName', models.CharField(max_length=100)),
                ('url', models.URLField(blank=True)),
                ('github', models.URLField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(max_length=100)),
                ('source', models.URLField()),
                ('origin', models.URLField()),
                ('description', models.CharField(max_length=500)),
                ('categories', models.JSONField()),
                ('count', models.IntegerField()),
                ('size', models.IntegerField()),
                ('comments', models.URLField()),
                ('published', models.DateTimeField()),
                ('visibility', models.CharField(max_length=10)),
                ('unlisted', models.BooleanField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.author')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('comment', models.CharField(max_length=500)),
                ('contentType', models.CharField(max_length=100)),
                ('published', models.DateTimeField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.author')),
            ],
        ),
    ]
