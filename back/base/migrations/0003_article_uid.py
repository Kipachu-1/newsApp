# Generated by Django 4.1.3 on 2023-01-26 17:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_article_category_alter_article_images'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='UID',
            field=models.CharField(default=232, max_length=100),
            preserve_default=False,
        ),
    ]
