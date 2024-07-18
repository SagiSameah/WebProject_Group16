from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()  # טוען את המשתנים מקובץ ה-env

client = MongoClient(os.getenv("MONGO_URI"))
db = client['Readiculous_WebProject16']

def get_data():
    return list(db['books'].find({}))
