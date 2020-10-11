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

def get_name(id):
	k = slides_service.presentations().get(presentationId = id).execute()
	return k["title"]

