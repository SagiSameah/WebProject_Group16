from flask import Flask, redirect, url_for, render_template, request, session
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import logging
from logging import FileHandler, Formatter

app = Flask(__name__)
app.secret_key = '314'
app.config.from_pyfile('settings.py')

# MongoDB Connection
uri = "mongodb+srv://sagisa:WebProject16@cluster0.o0f3cvg.mongodb.net/Readiculous_WebProject16"
client = MongoClient(uri, server_api=ServerApi('1'))

# Ensure the correct database and collection references
db = client['Readiculous_WebProject16']
users = db['users']
books = db['books']
sorted_books_by_rating = books.find().sort('rating', 1)
sorted_books_by_pages = books.find().sort('pages', 1)
sorted_books_by_year = books.find().sort('year', 1)
authors = db['authors']
genres = db['genres']
comments = db['comments']

# Blueprint Imports
from pages.register.register import register_bp
from pages.login.login import login_bp
from pages.homePage.homePage import homePage_bp
from pages.book.book import book_bp
from pages.about.about import about_bp
from pages.profile.profile import profile_bp

# Blueprint Registration
app.register_blueprint(register_bp)
app.register_blueprint(login_bp)
app.register_blueprint(homePage_bp)
app.register_blueprint(book_bp)
app.register_blueprint(about_bp)
app.register_blueprint(profile_bp)

# Enable logging
if not app.debug:
    file_handler = FileHandler('errorlog.txt')
    file_handler.setLevel(logging.WARNING)
    file_handler.setFormatter(Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    app.logger.addHandler(file_handler)

@app.route('/show_collections')
def show_collections():
    collections = db.list_collection_names()
    return f"Collections: {', '.join(collections)}"

@app.route('/add_dummy_data')
def add_dummy_data():
    users.insert_one({
        "email": "dummy@example.com",
        "password": "DummyPassword123",
        "first_name": "Dummy",
        "last_name": "User",
        "phone": "1234567890",
        "birthdate": "01/01/1990"
    })
    books.insert_one({
        "title": "Dummy Book",
        "author": "Dummy Author",
        "rating": 5,
        "pages": 300,
        "year": 2023
    })
    return "Dummy data added!"

if __name__ == '__main__':
    app.run(debug=True)
