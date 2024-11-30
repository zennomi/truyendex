from django.test import TestCase
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import nltk

nltk.download('punkt')
nltk.download('wordnet')
nltk.download('omw-1.4')
# Create your tests here.
def preprocess_text(text):
    # Tokenize the text
    tokens = word_tokenize(text)
    
    # Convert to lowercase and remove stopwords
    stop_words = set(stopwords.words('english'))
    filtered_tokens = [token.lower() for token in tokens if token.isalnum() and token.lower() not in stop_words]
    
    return ' '.join(filtered_tokens)

document = "This is a document to demonstrate the TF-IDF calculation and cosine similarity."
print(preprocess_text(document))