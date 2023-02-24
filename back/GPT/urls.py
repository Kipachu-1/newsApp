from django.urls import path
from . import views

urlpatterns = [
    path('topics', views.TopicsView.as_view()),
    path('write/article', views.ArticleView.as_view()),
]
