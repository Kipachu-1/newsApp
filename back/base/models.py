from django.db import models
from django.contrib.auth.models import User

class Author(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

class Image(models.Model):
    image = models.ImageField(upload_to='images/')


class Article(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    images = models.ManyToManyField(Image, blank=True)
    author = models.ForeignKey(Author, related_name='articles', on_delete=models.PROTECT)
    category = models.CharField(max_length=200, blank=True)
    UID = models.CharField(max_length=100)
    
    likes = models.IntegerField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    
    
    