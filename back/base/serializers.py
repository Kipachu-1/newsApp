from rest_framework import serializers
from . import models

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Author
        fields = ['name', 'avatar']



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

class FullAuthorSerializer(serializers.ModelSerializer):
    followers = serializers.IntegerField(source='subscriptions.count', read_only=True)
    articles = ArticleSerializer(many=True)
    class Meta:
        model = models.Author
        fields = ['name', 'avatar', 'followers', 'description', 'articles']

class UserDataArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Article
        fields = ['UID']

class UserDataSerialiazer(serializers.ModelSerializer):
    Subscriptions = AuthorSerializer(many=True)
    SavedArticles = ArticleSerializer(many=True)
    LikedArticles = UserDataArticleSerializer(many=True)
    
    class Meta:
        model = models.UserData
        fields = ['Subscriptions', 'SavedArticles', 'LikedArticles']
    
