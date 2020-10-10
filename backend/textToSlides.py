## API KEY - AIzaSyBIzxU32xYTPmkcVA-UlEcT0QQZuLe_Cyc

## TEXT SUMMARIZATION
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import uuid

SCOPES = ['https://www.googleapis.com/auth/presentations']
presentation_id = '1lU8du20fM-88-r865705F674KL4CS1ibWcom8Ql0NGQ'


creds = None
if os.path.exists('token.pickle'):
    with open('token.pickle', 'rb') as token:
        creds = pickle.load(token)

# if not creds or not creds.valid:
#     if creds and creds.expired and creds.refresh_token:
#         creds.refresh(Request())
#     else:
#         flow = InstalledAppFlow.from_client_secrets_file(
#             'credentials.json', SCOPES)
#         creds = flow.run_local_server(port=0)
#     with open('token.pickle', 'wb') as token:
#         pickle.dump(creds, token)


slides_service = build('slides', 'v1', credentials=creds)



def insert_point(presentation_id, text, n):
    k = slides_service.presentations().get(presentationId = presentation_id).execute().get('slides')

    if n % 3 == 1:
        page_id = str(uuid.uuid1())
        requests = [
        {
        'createSlide': {
            'objectId': page_id,
            'insertionIndex': str(len(k)),
            'slideLayoutReference': {
                'predefinedLayout': 'TITLE_ONLY'
            }
        }
        }
        ]
        body = {
        'requests': requests
        }
        response = slides_service.presentations().batchUpdate(presentationId=presentation_id, body=body).execute()
        
        element_id = str(uuid.uuid1())
        requests = [{'createShape': {'objectId': element_id,'shapeType': 'TEXT_BOX','elementProperties': {'pageObjectId': page_id,
                'size': {'height': {'magnitude':30, 'unit':'PT'},'width': {'magnitude':400, 'unit':'PT'}},
                'transform': {'scaleX': 1,'scaleY': 1,'translateX': 30,'translateY': 130,'unit': 'PT'}}}},
        {
        'insertText': {
            'objectId': element_id,
            'insertionIndex': 0,
            'text': '1. ' + text,}
        },

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


import requests
  
example_sent = "This is a Dog. This is a Cat."

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

def main(sentence, id):  

    r = requests.post(
        "https://api.deepai.org/api/summarization",
        data={
            'text': sentence,
        },
        headers={'api-key': '96e205c7-7444-4392-a220-c606e89bc2a6'}
    )
    r = r.json()
    summary = r['output']
    if summary == "":
        summary = sentence
    final = []
    ff = []
    for i in summary.split("."):
        
        final.append(remove_stop_words(i))

    for i in final:
        if i != ' ':
            ff.append(i)
    for i in range (1, len(ff) + 1):
        insert_point(id, ff[i - 1], i)


    return {"status":"success"}

import time
start = time.time()
print(main(example_sent, presentation_id))
end = time.time()

print(end - start)