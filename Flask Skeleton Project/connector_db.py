from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()  # טוען את המשתנים מקובץ ה-env

client = MongoClient(os.getenv("DB_URI"))
db = client['Readiculous_WebProject16']

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
