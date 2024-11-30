# api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Manga
from .serializers import MangaSerializer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class MangaSearchView(APIView):
    def get(self, request):
        # Get the 'desribe' parameter from the request query
        title = request.GET.get('title', None)
        print('input title ' + title)

        # Serialize the records
        mangas = Manga.objects.all()
        serializer = MangaSerializer(mangas, many=True)

        synopses = []
        
        for i in range(0, len(mangas)):
            synopses.append(mangas[i].synopsis)
        
        tfidf = TfidfVectorizer(max_features=5000, stop_words='english')
        synopses_tfidf = tfidf.fit_transform(synopses)
        title_tfidf = tfidf.transform([title])

        cosine_similarities = cosine_similarity(title_tfidf, synopses_tfidf).flatten()
        top_n_indices = cosine_similarities.argsort()[-5:][::-1]
        top_titles = top_n_indices[0].item()
        
        result_manga = mangas.filter(title=mangas[top_titles])
                
        if not title:
            return Response({"error": "title parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Serialize the results
        serializer = MangaSerializer(result_manga, many=True)
    
        print(type(serializer))
        return Response(serializer.data, status=status.HTTP_200_OK)
