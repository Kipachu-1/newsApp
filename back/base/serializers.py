from rest_framework import serializers
from . import models

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Author
        fields = ['name']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = ['image']

class ArticleSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()
    images = ImageSerializer(many=True)
    class Meta:
        model = models.Article
        fields = ['title', 'text', 'updated', 'created', 'author', 'pk', 'UID', 'images']


