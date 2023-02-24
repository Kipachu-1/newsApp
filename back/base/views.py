from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from rest_framework import permissions
from django.db.models import Q
from django.views.decorators.cache import cache_page
from . import models, serializers
from . import namer
import os
import time
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.shortcuts import render
import openai
openai.api_key = ''

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'page_size'
    max_page_size = 10000

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10
    def get_paginated_response(self, data):
        return ({
            'page_size': self.page_size,
            'total_objects': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page_number': self.page.number,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
        })
    def get_total_pages(self):
        return self.page.paginator.num_pages
        

class ArticlesList(APIView):
    pagination_class = StandardResultsSetPagination
    def get(self, request, format=None):
        try:
            articles = models.Article.objects.filter(category__in=[models.Category.objects.get(name=request.GET.get('category'))]).distinct().order_by('-likes')
        except:
            articles = models.Article.objects.all().order_by('-likes')
        paginator = self.pagination_class()
        result_data = paginator.paginate_queryset(articles, request)
        serializer = serializers.ArticleSerializer(data=result_data, many=True, context={'request': request})
        serializer.is_valid()
        return Response({'articles':serializer.data, 'total_pages':paginator.get_total_pages()}) 
    
class ImageUploadView(APIView): 
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request,  format=None):
        image = request.data['image']
        models.Image.objects.create(image=image)
        return Response({'message':'Image was uplaoded'}, status=200)  
    
    
class ArticlePostView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, format=None):
        data = request.data
        images = request.FILES.getlist('images')
        UID = namer.generate_unique_name()
        article = models.Article.objects.create(title=data['title'],text=data['text'],
                                                         author=models.Author.objects.get(name='imArsik'),
                                                         category=data['category'], UID=UID)
        for i in range(len(images)):
            imageModel = models.Image()
            extension = os.path.splitext(images[i].name)[-1]
            imageModel.image.save(f"{UID}_{i+1}.{extension}", images[i], save=True)
            article.images.add(imageModel.pk)
        return Response(status=200, data={'message': 'asd'})            
    
class SearchArticleView(APIView):
    
    def get(self, request, format=None):
        articles = models.Article.objects.filter(title__icontains=request.GET.get('q'))
        serializer = serializers.ArticleSerializer(data=articles, many=True, context={'request': request})
        serializer.is_valid()
        return Response(data=serializer.data, status=200)
    


class UserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    def get(self, request):
        data = models.UserData.objects.get(user=request.user)
        Subs = serializers.AuthorSerializer(data=data.Subscriptions.all(), many=True)
        Saves = serializers.ArticleSerializer(data=data.SavedArticles.all(), many=True)
        Likes = serializers.UserDataArticleSerializer(data=data.LikedArticles.all(), many=True)
        Subs.is_valid()
        Saves.is_valid()
        Likes.is_valid()
        return Response(data={
            'Subscriptions': Subs.data,
            'SavedArticles': Saves.data,
            'LikedArticles': Likes.data,
        })
    

class LikeArticles(APIView):   
    permissions = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    def get(self, request):
        try:
            userData = models.UserData.objects.get(user=request.user)
            article = models.Article.objects.get(UID=request.GET.get('UID'))
            if request.GET.get('action') == 'add':
                userData.LikedArticles.add(article)
                return Response({'msg':'the article has been liked successfully'})
            else:
                userData.LikedArticles.remove(article)
                return Response({'msg':'the article has been unliked successfully'})
        except:
            return Response({'msg':'sorry error, please try again error'})
    
class SavedArticles(APIView):
    permissions = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    def get(self, request):
        try:
            userData = models.UserData.objects.get(user=request.user)
            article = models.Article.objects.get(UID=request.GET.get('UID'))
            if request.GET.get('action') == 'add':
                userData.SavedArticles.add(article)
                return Response({'msg':'the article has been liked successfully'})
            else:
                userData.SavedArticles.remove(article)
                return Response({'msg':'the article has been unliked successfully'})
        except:
            return Response({'msg':'sorry error, please try again error'})
        
class Subscriptions(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    def get(self, request):
        try:
            userData = models.UserData.objects.get(user=request.user)
            author = models.Author.objects.get(name=request.GET.get('name'))
            if request.GET.get('action') == 'add':
                userData.Subscriptions.add(author)
                return Response({'msg':'you have successfully followed the author'})
            else:
                userData.Subscriptions.remove(author)
                return Response({'msg':'you have successfully unfollowed the author'})
        except:
            return Response({'msg':'sorry error, please try again error'})
               
@api_view(['GET'])
def createCategories(request):
    articles = models.Article.objects.all()
    for article in articles:
        paragraphs = article.text.split('\n')
        if 'categor' or 'Categor' in paragraphs[-1]:
            try:
                intrs = paragraphs[-1][paragraphs[-1].index(':')+1:].replace(', ', ',').replace(', and ', ',').replace('.', '').split(',')
                for intr in intrs:
                    if intr[0] == ' ':
                        newintr, created = models.Category.objects.get_or_create(name=intr[1:])
                    else:
                        newintr, created = models.Category.objects.get_or_create(name=intr)
                    article.category.add(newintr)
                    article.save()
            except Exception as error:
                pass
    return Response(data={'msg':'OK'})

@api_view(['GET'])
def getCategories(request):
    categories = models.Category.objects.all()
    list_category = []
    for intr in categories:
        list_category.append(intr.name)
    return Response(data={'categories':list_category})

    
@api_view(['GET'])
def getFullAuthorInfo(request):
    try:
        author = models.Author.objects.get(name=request.GET.get('name'))
        serializer = serializers.FullAuthorSerializer(instance=author, context={'request':request})
        return Response(data=serializer.data)
    except:
        return Response(data={'msg':'nothing'})
    