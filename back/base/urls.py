from django.urls import path
from . import views

urlpatterns = [
    path('articles', views.ArticlesList.as_view()),
    path('upload/image/', views.ImageUploadView.as_view()),
    path('article/create/', views.ArticlePostView.as_view()),
    path('search', views.SearchArticleView.as_view()),
    path('user/', views.UserView.as_view()),
    path('user/like/article', views.LikeArticles.as_view()),
    path('user/save/article', views.SavedArticles.as_view()),    
    path('user/follow/author', views.Subscriptions.as_view()),
    path('create/categories', views.createCategories),
    path('get/categories', views.getCategories),
    path('get/author', views.getFullAuthorInfo), 
]
