## API KEY - AIzaSyBIzxU32xYTPmkcVA-UlEcT0QQZuLe_Cyc

## TEXT SUMMARIZATION

from nltk.corpus import stopwords 
from nltk.tokenize import word_tokenize 

import requests
  
example_sent = '''Artificial intelligence (AI), the ability of a digital computer or computer-controlled robot to perform tasks commonly associated with intelligent beings. The term is frequently applied to the project of developing systems endowed with the intellectual processes characteristic of humans, such as the ability to reason, discover meaning, generalize, or learn from past experience. Since the development of the digital computer in the 1940s, it has been demonstrated that computers can be programmed to carry out very complex tasks—as, for example, discovering proofs for mathematical theorems or playing chess—with great proficiency. Still, despite continuing advances in computer processing speed and memory capacity, there are as yet no programs that can match human flexibility over wider domains or in tasks requiring much everyday knowledge. On the other hand, some programs have attained the performance levels of human experts and professionals in performing certain specific tasks, so that artificial intelligence in this limited sense is found in applications as diverse as medical diagnosis, computer search engines, and voice or handwriting recognition.
In the twenty-first century, AI techniques have experienced a resurgence following concurrent advances in computer power, large amounts of data, and theoretical understanding; and AI techniques have become an essential part of the technology industry, helping to solve many challenging problems in computer science, software engineering and operations research. All but the simplest human behaviour is ascribed to intelligence, while even the most complicated insect behaviour is never taken as an indication of intelligence. What is the difference? Consider the behaviour of the digger wasp, Sphex ichneumoneus. When the female wasp returns to her burrow with food, she first deposits it on the threshold, checks for intruders inside her burrow, and only then, if the coast is clear, carries her food inside. The real nature of the wasp’s instinctual behaviour is revealed if the food is moved a few inches away from the entrance to her burrow while she is inside: on emerging, she will repeat the whole procedure as often as the food is displaced. Intelligence—conspicuously absent in the case of Sphex—must include the ability to adapt to new circumstances.
Psychologists generally do not characterize human intelligence by just one trait but by the combination of many diverse abilities. Research in AI has focused chiefly on the following components of intelligence: learning, reasoning, problem solving, perception, and using language.
'''

def main(sentence):  

    r = requests.post(
        "https://api.deepai.org/api/summarization",
        data={
            'text': sentence,
        },
        headers={'api-key': '96e205c7-7444-4392-a220-c606e89bc2a6'}
    )
    r = r.json()

    # Store text summarization in summary variable
    summary = r['output']

    print(summary)

    
    word_tokens = word_tokenize(summary) 
    # stop_words = set(stopwords.words('english')) 
    custom_stop_words = ["the", "a", "and", "A", "The", 'its', 'is', "'", "''", "`", "``"]
    
    # Remove custom stop words
    filtered_sentence = [w for w in word_tokens if not w in custom_stop_words] 

    # Join sentence
    newSentence = ' '.join(filtered_sentence)

    # Fix punctuation
    newSentence = newSentence.replace(" ,", ",")
    newSentence = newSentence.replace(" :", ":")
    newSentence = newSentence.replace(" .", ".")
    newSentence = newSentence.replace("( ", "(")
    newSentence = newSentence.replace(" )", ")")

    # New sentence after text summarization and without stop words
    print()
    print(newSentence)

    # Contains array of sentences after text summarization and remove of stop words
    arrayOfSentences = newSentence.split(".")

    # Now need to do a bunch of google slides api stuff to get this sentence on the slide,
    # in addition to image. And if slide already has 3 sentences, create new slide and add there.



main(example_sent)