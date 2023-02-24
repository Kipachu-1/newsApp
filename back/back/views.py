from django.http import FileResponse
from django.shortcuts import render

def swIndex(request):
    return FileResponse(open('./build/service-worker.js', 'rb'))

def index(request):
    return render(request, 'index.html')

def WebManifest(request):
    return FileResponse(open('./build/manifest.json', 'rb'))

def swMap(request):
    return FileResponse(open('./build/service-worker.js.map', 'rb'))