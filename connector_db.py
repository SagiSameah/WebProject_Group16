# import os
# from pymongo import MongoClient
# from pymongo.server_api import ServerApi
#
# uri = os.environ.get('DB_URI')
#
# # Create a new client and connect to the server
# client = MongoClient(uri, server_api=ServerApi('1'))
#
# mydb = client["mydatabase"]
# users = mydb['users']
# books = mydb['books']
#
# def add_user(user_data):
#     users.insert_one(user_data)
#
# def get_user_by_email(email):
#     return users.find_one({"email": email})
#
# def update_user(email, updated_data):
#     users.update_one({"email": email}, {"$set": updated_data})
#
# def delete_user(email):
#     users.delete_one({"email": email})

import os
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# Database connection URI
uri = os.getenv('DB_URI')

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Access the database
db = client["Readiculous_WebProject16"]
users_col = db['users']
books_col = db['books']

# Function to get collection
def get_collection(name):
    return db[name]

# CRUD operations for users
def add_user(user_data):
    try:
        users_col.insert_one(user_data)
    except Exception as e:
        print(f"Error adding user: {e}")

def get_user_by_email(email):
    try:
        return users_col.find_one({"email": email})
    except Exception as e:
        print(f"Error fetching user: {e}")
        return None

def update_user(email, updated_data):
    try:
        users_col.update_one({"email": email}, {"$set": updated_data})
    except Exception as e:
        print(f"Error updating user: {e}")

def delete_user(email):
    try:
        users_col.delete_one({"email": email})
    except Exception as e:
        print(f"Error deleting user: {e}")

# CRUD operations for books (add more as needed)
def add_book(book_data):
    try:
        books_col.insert_one(book_data)
    except Exception as e:
        print(f"Error adding book: {e}")

def get_book_by_title(title):
    try:
        return books_col.find_one({"title": title})
    except Exception as e:
        print(f"Error fetching book: {e}")
        return None

