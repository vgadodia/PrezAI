import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import uuid
import requests

stopwords = """i
me
my
myself
we
our
ours
ourselves
you
your
yours
yourself
yourselves
he
him
his
himself
she
her
hers
herself
it
its
itself
they
them
their
theirs
themselves
what
which
who
whom
this
that
these
those
am
is
are
was
were
be
been
being
have
has
had
having
do
does
did
doing
a
an
the
and
but
if
or
because
as
until
while
of
at
by
for
with
about
against
between
into
through
during
before
after
above
below
to
from
up
down
in
out
on
off
over
under
again
further
then
once
here
there
when
where
why
how
all
any
both
each
few
more
most
other
some
such
no
nor
not
only
own
same
so
than
too
very
s
t
can
will
just
don
should
now""".splitlines()

def remove_stopwords_image(k):
    k = k.lower()
    x = ""
    for i in k:
        if i.isalpha() == True or i == " ":
            x += i
    final = ""

    f = []
    
    for i in x.split(" "):
        if i in stopwords:
            continue
        else:
            f.append(i)

    y = 6
    if len(f) < 6:
        y = len(f)
    for i in f[0:y]:
        final += i + " "
    return final

SCOPES = ['https://www.googleapis.com/auth/presentations']
subscription_key = "670712e42f1940fd84207363f6ca988f"
search_url = "https://api.cognitive.microsoft.com/bing/v7.0/images/search"
headers = {"Ocp-Apim-Subscription-Key" : subscription_key}

def get_image(search_term):
    params  = {"q": remove_stopwords_image(search_term), "license": "public", "imageType": "photo"}
    response = requests.get(search_url, headers=headers, params=params)
    response.raise_for_status()
    search_results = response.json()
    thumbnail_urls = [img["thumbnailUrl"] for img in search_results["value"][:1]]
    try:
        imageURL = thumbnail_urls[0]
        return imageURL
    except:
        return "https://media.istockphoto.com/photos/bright-blue-defocused-blurred-motion-abstract-background-picture-id1047234038?k=6&m=1047234038&s=612x612&w=0&h=O1lP8GIn46sboZL5bnMsznd4A1tRNJ7iXm1MMVh5I5c="


creds = None
if os.path.exists('token.pickle'):
    with open('token.pickle', 'rb') as token:
        creds = pickle.load(token)

slides_service = build('slides', 'v1', credentials=creds)



def insert_point(presentation_id, text, n):
    if len(text) > 68:
        text = text[0:68]
    k = slides_service.presentations().get(presentationId = presentation_id).execute().get('slides')

    if n % 3 == 1:
        page_id = str(uuid.uuid1())
        element_id = str(uuid.uuid1())
        requests = [

         {
        'createSlide': {
            'objectId': page_id,
            'insertionIndex': str(len(k)),
            'slideLayoutReference': {
                'predefinedLayout': 'TITLE_ONLY'
            }
        }
        },
        {'createShape': {'objectId': element_id,'shapeType': 'TEXT_BOX','elementProperties': {'pageObjectId': page_id,
                'size': {'height': {'magnitude':30, 'unit':'PT'},'width': {'magnitude':400, 'unit':'PT'}},
                'transform': {'scaleX': 1,'scaleY': 1,'translateX': 30,'translateY': 130,'unit': 'PT'}}}},
        {
        'insertText': {
            'objectId': element_id,
            'insertionIndex': 0,
            'text': '1. ' + text,}
        },

        {
        "createImage": {
        "url": get_image(text),
        "elementProperties": {
          "pageObjectId": page_id,
          "size": {
            "width": {
              "magnitude": 200,
              "unit": "PT"
            },
            "height": {
              "magnitude": 200,
              "unit": "PT"
            }
          },
          "transform": {
            "scaleX": 1,
            "scaleY": 1,
            "translateX": 500,
            "translateY": 60,
            "unit": "PT"
        }}}},

        {'updateTextStyle': {'objectId': element_id,'style': {'fontSize': {'magnitude': 24,'unit': 'PT'}},'fields': 'fontSize'}}]


        body = {'requests': requests}
        response = slides_service.presentations().batchUpdate(presentationId=presentation_id, body=body).execute()

    elif n  % 3 == 2:
        page_id = k[len(k) - 1]["objectId"]
        element_id = str(uuid.uuid1())
        requests = [{'createShape': {'objectId': element_id,'shapeType': 'TEXT_BOX','elementProperties': {'pageObjectId': page_id,
                'size': {'height': {'magnitude':30, 'unit':'PT'},'width': {'magnitude':400, 'unit':'PT'}},
                'transform': {'scaleX': 1,'scaleY': 1,'translateX': 30,'translateY': 210,'unit': 'PT'}}}},
        {
        'insertText': {
            'objectId': element_id,
            'insertionIndex': 0,
            'text': '2. ' + text,}
        },

        {
        "createImage": {
        "url": get_image(text),
        "elementProperties": {
          "pageObjectId": page_id,
          "size": {
            "width": {
              "magnitude": 200,
              "unit": "PT"
            },
            "height": {
              "magnitude": 200,
              "unit": "PT"
            }
          },
          "transform": {
            "scaleX": 1,
            "scaleY": 1,
            "translateX": 500,
            "translateY": 200,
            "unit": "PT"
        }}}},

        {'updateTextStyle': {'objectId': element_id,'style': {'fontSize': {'magnitude': 24,'unit': 'PT'}},'fields': 'fontSize'}}]


        body = {'requests': requests}
        response = slides_service.presentations().batchUpdate(presentationId=presentation_id, body=body).execute()
    else:
        page_id = k[len(k) - 1]["objectId"]
        element_id = str(uuid.uuid1())
        requests = [{'createShape': {'objectId': element_id,'shapeType': 'TEXT_BOX','elementProperties': {'pageObjectId': page_id,
                'size': {'height': {'magnitude':30, 'unit':'PT'},'width': {'magnitude':400, 'unit':'PT'}},
                'transform': {'scaleX': 1,'scaleY': 1,'translateX': 30,'translateY': 290,'unit': 'PT'}}}},
        {
        'insertText': {
            'objectId': element_id,
            'insertionIndex': 0,
            'text': '3. ' + text,}
        },

        {'updateTextStyle': {'objectId': element_id,'style': {'fontSize': {'magnitude': 24,'unit': 'PT'}},'fields': 'fontSize'}}]


        body = {'requests': requests}
        response = slides_service.presentations().batchUpdate(presentationId=presentation_id, body=body).execute()

def remove_stop_words(k):
    final = ""

    f = ""
    for i in k:
        if i.isalpha() == True or i == " " or i == "(" or i == ")" or i == "/":
            f += i

    

    for i in f.split(" "):
        if i.lower() == "a" or i.lower() == "an" or i.lower() == "the":
            continue
        else:
            final += i
            final += " "


    return final

def main(sentence, id, n):  

    
    insert_point(id, remove_stop_words(sentence), n)


    return {"status":"success"}

def hello_world(request):
    
    request_json = request.get_json()
    
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Content-Type':'application/json',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
        return ('', 204, headers)
    
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type':'application/json'
    }

    

    try:
        return (main(request_json["text"], request_json["id"], request_json["num"]), 200, headers)
    except:
        return ({"status":"failed"}, 200, headers)
