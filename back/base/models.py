from django.db import models
from django.contrib.auth.models import User

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender=User)
def create_user_data(sender, instance=None, created=False, **kwargs):
    UserData.objects.get_or_create(user=instance)




class Category(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self) -> str:
        return self.name



class Author(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    avatar = models.ImageField(upload_to='images/', blank=True, null=True)
    
    description = models.TextField(blank=True, null=True)
    
    
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    

class Image(models.Model):
    image = models.ImageField(upload_to='images/')


class Article(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    images = models.ManyToManyField(Image, blank=True)
    author = models.ForeignKey(Author, related_name='articles', on_delete=models.PROTECT)
    category = models.ManyToManyField(Category)
    UID = models.CharField(max_length=100)
    
    likes = models.IntegerField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    
    
    
    
    
class UserData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_data')
    
    Subscriptions = models.ManyToManyField(Author, related_name='subscriptions')
    LikedArticles = models.ManyToManyField(Article, related_name="liked_articles")
    SavedArticles = models.ManyToManyField(Article, related_name="saved_articles")
    Interests = models.ManyToManyField(Category)
    
    
    def __str__(self) -> str:
        return self.user.username+'Data'
    
    
    
    