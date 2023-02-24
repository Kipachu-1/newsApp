from django.shortcuts import render
import openai
from rest_framework.response import Response
from rest_framework.views import APIView
from base import models
from base import serializers
from base import namer
from django.shortcuts import HttpResponse
import time

class TopicsView(APIView):
    
    def get(self, request):
        response = openai.Completion.create(model="text-davinci-003", prompt=f"list topics for article about {request.GET.get('list')}. just list topics.", temperature=0.7, max_tokens=1000)
        topics = response['choices'][0]['text'].strip().split('\n')
        topics = [sentence.strip().split(".")[1].strip() for sentence in topics]
        return Response(data={'topics': topics})
    
class ArticleView(APIView):
    
    def get(self, request):
        
        title = request.GET.get('title')
        try:
            article=models.Article.objects.get(title=title)
            serializer = serializers.ArticleSerializer(instance=article, context={'request':request})
            return Response(data=serializer.data)
        except:
            response = openai.Completion.create(model="text-davinci-003", prompt=f"write article on '{title}'. In the end, list (with comma) categories which article is related to.", temperature=1, max_tokens=3600)
            author = models.Author.objects.get(name='MetaWriter')
            UID = namer.generate_unique_name()
            article = models.Article.objects.create(title=title, text=response['choices'][0]['text'], author=author, UID=UID, likes=1)
            return Response(data={
                'title': title,
                'text':response['choices'][0]['text'],
                'UID':UID,
                "author":{'name':author.name, 'avatar':request.build_absolute_uri(author.avatar.url)}
            })
