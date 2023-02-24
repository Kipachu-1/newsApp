from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('token/', jwt_views.TokenObtainPairView.as_view()),
    path('token/refresh', jwt_views.TokenRefreshView.as_view()), 
    path('register/', views.RegisterView.as_view()),
    path('login/', views.LoginView.as_view()),
    path('register/', views.RegisterView.as_view()),
    
]
