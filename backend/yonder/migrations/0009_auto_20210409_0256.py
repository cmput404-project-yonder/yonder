# Generated by Django 3.1.6 on 2021-04-09 02:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yonder', '0008_auto_20210404_2306'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='published',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]