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

slides_service = build('slides', 'v1', credentials=creds)

def get_name(id):
	k = slides_service.presentations().get(presentationId = id).execute()
	return k["title"]

