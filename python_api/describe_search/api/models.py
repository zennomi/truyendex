from django.db import models

# Create your models here.
class Manga(models.Model):
    manga_id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)
    sfw = models.IntegerField()
    genres = models.CharField(max_length=100)
    themes = models.CharField(max_length=100)
    demographics = models.CharField(max_length=100)
    authors = models.CharField(max_length=100)
    synopsis = models.CharField(max_length=1000)
    background = models.CharField(max_length=1000)
    title_english = models.CharField(max_length=100)
    title_japanese = models.CharField(max_length=100)
    title_synonyms = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    
    class Meta:
        managed = False
        db_table = 'manga'