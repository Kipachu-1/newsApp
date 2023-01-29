from django.urls import path
from . import views

urlpatterns = [
    path('articles', views.ArticlesList.as_view()),
    path('upload/image/', views.ImageUploadView.as_view()),
    path('article/create/', views.ArticlePostView.as_view()),
    path('search', views.SearchArticleView.as_view())
]
