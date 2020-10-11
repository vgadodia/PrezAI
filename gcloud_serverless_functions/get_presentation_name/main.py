import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import uuid

SCOPES = ['https://www.googleapis.com/auth/presentations']

creds = None
if os.path.exists('token.pickle'):
    with open('token.pickle', 'rb') as token:
        creds = pickle.load(token)

slides_service = build('slides', 'v1', credentials=creds)

def get_name(id):
	k = slides_service.presentations().get(presentationId = id).execute()
	return {"status":"success", "title":k["title"]}


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
        return (get_name(request_json["id"]), 200, headers)
    except:
        return ({"status":"failed"}, 200, headers)
