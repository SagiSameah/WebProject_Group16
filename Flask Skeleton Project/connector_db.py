import os
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv

load_dotenv()  # טוען את המשתנים מקובץ ה-env

# cluster = MongoClient(os.getenv("DB_URI"))
# db = cluster['Readiculous_WebProject16']

# get your uri from .env file
uri = os.environ.get('DB_URI')

# create cluster
cluster = MongoClient(uri, server_api=ServerApi('1'))

# get all dbs and collestions that needed
db = cluster['Readiculous_WebProject16']
users_col = db['users']

def get_data():
    return list(db['books'].find({}))

def get_user_by_username(username):
    return db.users.find_one({"username": username})

def add_user(user_data):
    db.users.insert_one(user_data)

def update_user(username, update_data):
    db.users.update_one({"username": username}, {"$set": update_data})

def delete_user(username):
    db.users.delete_one({"username": username})


def find_user_by_email(email):
    return db.users.find_one({"email": email})

def update_user_genres(email, genres):
    db.users.update_one({"email": email}, {"$set": {"genres": genres}})

def update_user_authors(email, authors):
    db.users.update_one({"email": email}, {"$set": {"authors": authors}})