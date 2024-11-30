from rest_framework import serializers
from .models import Manga

class MangaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manga
        fields = '__all__'    # Include all fields in the API response