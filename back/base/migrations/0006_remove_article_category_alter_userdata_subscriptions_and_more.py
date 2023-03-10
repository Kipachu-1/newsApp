# Generated by Django 4.1.5 on 2023-02-01 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_category_userdata'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='category',
        ),
        migrations.AlterField(
            model_name='userdata',
            name='Subscriptions',
            field=models.ManyToManyField(related_name='subscriptions', to='base.author'),
        ),
        migrations.AddField(
            model_name='article',
            name='category',
            field=models.ManyToManyField(to='base.category'),
        ),
    ]
