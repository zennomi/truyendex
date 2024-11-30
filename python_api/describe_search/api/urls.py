from django.urls import path
from .views import MangaSearchView

urlpatterns = [
    path('search/', MangaSearchView.as_view(), name='manga-search'),
]
