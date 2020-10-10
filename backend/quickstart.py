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






insert_point(presentation_id, "Hello", 1)