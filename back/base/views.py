from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from django.views.decorators.cache import cache_page
from . import models, serializers
from . import namer
import os


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'page_size'
    max_page_size = 10000

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100






class ArticlesList(APIView):
    pagination_class = StandardResultsSetPagination
    def get(self, request, format=None):
        articles =models.Article.objects.filter(category__icontains=request.GET.get('category')).order_by('-likes')
        paginator = self.pagination_class()
        result_data = paginator.paginate_queryset(articles, request)
        serializer = serializers.ArticleSerializer(data=result_data, many=True, context={'request': request})
        serializer.is_valid()
        return Response({'articles':serializer.data}) 
    
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