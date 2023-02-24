from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response  import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import Token, RefreshToken
from base import serializers, models
class RegisterView(APIView):
    
    def post(self, request, format=None):
        data = request.data
        print(data)
        
class LoginView(APIView):
    def post(self, request):
        user_info = request.data
        user, created = User.objects.get_or_create(email=user_info['email'])
        refresh = RefreshToken.for_user(user)
        data = models.UserData.objects.get(user=user)
        Subs = serializers.AuthorSerializer(data=data.Subscriptions.all(), many=True)
        Saves = serializers.ArticleSerializer(data=data.SavedArticles.all(), many=True)
        Likes = serializers.UserDataArticleSerializer(data=data.LikedArticles.all(), many=True)
        Subs.is_valid()
        Saves.is_valid()
        Likes.is_valid()
        if created:
            user.username = 'arsikgoogle'
            user.first_name = 'arsikgoogle'
            user.last_name = user_info['family_name']
            user.save()
        return Response({
            'Subscriptions': Subs.data,
            'SavedArticles': Saves.data,
            'LikedArticles': Likes.data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
        
        
class RegisterView(APIView):
    def post(self, request):
        user_info = request.data
        user, created = User.objects.get_or_create(email=user_info['email'])
        refresh = RefreshToken.for_user(user)
        data = models.UserData.objects.get(user=user)
        if created:
            user.username = 'arsikgoogle'
            user.first_name = 'arsikgoogle'
            user.last_name = user_info['family_name']
            user.save()
        else:
            return Response({'msg':'the account is registered'})
        
        Subs = serializers.AuthorSerializer(data=data.Subscriptions.all(), many=True)
        Saves = serializers.ArticleSerializer(data=data.SavedArticles.all(), many=True)
        Likes = serializers.UserDataArticleSerializer(data=data.LikedArticles.all(), many=True)
        Subs.is_valid()
        Saves.is_valid()
        Likes.is_valid()
        
        return Response({
            'Subscriptions': Subs.data,
            'SavedArticles': Saves.data,
            'LikedArticles': Likes.data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
        
    
        
        
        