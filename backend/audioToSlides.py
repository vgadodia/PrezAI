## API KEY - AIzaSyBIzxU32xYTPmkcVA-UlEcT0QQZuLe_Cyc

from nltk.corpus import stopwords 
from nltk.tokenize import word_tokenize
from nltk.tokenize import sent_tokenize
  
example_sent = "This is a sample sentence, showing off the stop words filtration."

def main(sentence):  

    # Remove stop words
    stop_words = set(stopwords.words('english')) 
    
    word_tokens = word_tokenize(sentence) 
    
    filtered_sentence = [w for w in word_tokens if not w in stop_words] 

    newSentence = ' '.join(filtered_sentence)

    # New sentence without stop words
    print(newSentence)

    # Now need to do a bunch of google slides api stuff to get this sentence on the slide,
    # in addition to image. And if slide already has 3 sentences, create new slide and add there.

import time

start = time.time()
print(sent_tokenize("Good morning Dr. Adams The patient is waiting for you in room number 3"))
end = time.time()
print(end - start)
