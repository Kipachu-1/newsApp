# Generated by Django 4.1.5 on 2023-02-01 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_article_likes'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Interests', models.TextField()),
                ('LikedArticles', models.ManyToManyField(related_name='liked_articles', to='base.article')),
                ('SavedArticles', models.ManyToManyField(related_name='saved_articles', to='base.article')),
                ('Subscriptions', models.ManyToManyField(to='base.author')),
            ],
        ),
    ]
