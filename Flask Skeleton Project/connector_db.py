import os
from pymongo import MongoClient
from pymongo.server_api import ServerApi

uri = os.environ.get('DB_URI')

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

mydb = client["mydatabase"]
users = mydb['users']
books = mydb['books']

# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv
#
# load_dotenv()
#
# client = MongoClient(os.getenv("DB_URI"))
# db = client['Readiculous_WebProject16']
#
# users = db['users']

def add_user(user_data):
    users.insert_one(user_data)

def get_user_by_email(email):
    return users.find_one({"email": email})

def update_user(email, updated_data):
    users.update_one({"email": email}, {"$set": updated_data})

def delete_user(email):
    users.delete_one({"email": email})