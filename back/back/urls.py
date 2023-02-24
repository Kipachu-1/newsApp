from django.contrib import admin
from . import settings, views
from django.urls import path, include
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.urls')),
    path('gpt/', include('GPT.urls')),
    path('api/', include('Auth.urls')),
    path('service-worker.js', views.swIndex),
    path('', views.index),
    path('index.html', views.index),
    path('manifest.json', views.WebManifest),
    path('service-worker.js.map', views.swMap)
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
