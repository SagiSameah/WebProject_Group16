# from flask import Flask, redirect, url_for, render_template, request, session
# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi
# import logging
# from logging import FileHandler, Formatter
# from flask import jsonify
#
# app = Flask(__name__)
# app.secret_key = '123'
# app.config.from_pyfile('settings.py')
#
# #--------------------MongoDB---------------------#
# uri = "mongodb+srv://sagisa:WebProject16@cluster0.o0f3cvg.mongodb.net/Readiculous_WebProject16"
# client = MongoClient(uri, server_api=ServerApi('1'))
#
# myDB = client["mydatabase"]
# books = myDB['books']
# sorted_books_by_rating = books.find().sort('rating', 1)
# sorted_books_by_pages = books.find().sort('pages', 1)
# sorted_books_by_year = books.find().sort('year', 1)
#
# users = myDB['users']
# authors = myDB['authors']
# genres = myDB['genres']
# comments = myDB['comments']
#
# dblist = client.list_database_names()
# if "mydatabase" in dblist:
#     print("The database exists.")
#
# app = Flask(__name__)
# app.secret_key = '314'
#
# # Blueprint Imports
# from pages.homePage.homePage import homepage_bp
# from pages.about.about import about_bp
# from pages.book.book import book_bp
# from pages.login.login import login_bp
# from pages.profile.profile import profile_bp
# from pages.register.register import register_bp
#
# # Blueprint Registration
# app.register_blueprint(homepage_bp, url_prefix='/home')
# app.register_blueprint(about_bp, url_prefix='/about')
# app.register_blueprint(book_bp, url_prefix='/book')
# app.register_blueprint(login_bp, url_prefix='/login')
# app.register_blueprint(profile_bp, url_prefix='/profile')
# app.register_blueprint(register_bp, url_prefix='/register')
#
# # Enable logging
# if not app.debug:
#     file_handler = FileHandler('errorlog.txt')
#     file_handler.setLevel(logging.WARNING)
#     file_handler.setFormatter(Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
#     app.logger.addHandler(file_handler)
#
# # Generic Routes
# @app.route('/')
# def root():
#     return render_template('homepage.html')
#
# @app.route('/register')
# def register():
#     return render_template('register.html')
#
#
# @app.route('/base')
# def base():
#     return render_template('base.html')
#
#
# @app.route('/add_dummy_data')
# def add_dummy_data():
#     users.insert_one({
#         "email": "dummy@example.com",
#         "password": "DummyPassword123",
#         "first_name": "Dummy",
#         "last_name": "User",
#         "phone": "1234567890",
#         "birthdate": "01/01/1990"
#     })
#
#     books.insert_one({
#         "title": "Dummy Book",
#         "author": "Dummy Author",
#         "rating": 5,
#         "pages": 300,
#         "year": 2023
#     })
#
#     return "Dummy data added!"
#
#
# @app.route('/show_collections')
# def show_collections():
#     try:
#         collections = myDB.list_collection_names()
#         if not collections:
#             return "No collections found"
#         return f"Collections: {', '.join(collections)}"
#     except Exception as e:
#         return str(e)
#
#
# if __name__ == '__main__':
#     app.run(debug=True)
#
from flask import Flask, render_template, redirect, url_for, jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import logging
from logging import FileHandler, Formatter

app = Flask(__name__)
app.secret_key = '123'
app.config.from_pyfile('settings.py')

# MongoDB Connection
uri = "mongodb+srv://sagisa:WebProject16@cluster0.o0f3cvg.mongodb.net/Readiculous_WebProject16"
client = MongoClient(uri, server_api=ServerApi('1'))

# Ensure the correct database and collection references
db = client['Readiculous_WebProject16']
users = db['users']
books = db['books']
authors = db['authors']
genres = db['genres']
comments = db['comments']

# Blueprint Imports
from pages.homePage.homePage import homepage_bp
from pages.about.about import about_bp
from pages.book.book import book_bp
from pages.login.login import login_bp
from pages.profile.profile import profile_bp
from pages.register.register import register_bp

# Blueprint Registration
app.register_blueprint(homepage_bp, url_prefix='/home')
app.register_blueprint(about_bp, url_prefix='/about')
app.register_blueprint(book_bp, url_prefix='/book')
app.register_blueprint(login_bp, url_prefix='/login')
app.register_blueprint(profile_bp, url_prefix='/profile')
app.register_blueprint(register_bp, url_prefix='/register')

# Enable logging
if not app.debug:
    file_handler = FileHandler('errorlog.txt')
    file_handler.setLevel(logging.WARNING)
    file_handler.setFormatter(Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    app.logger.addHandler(file_handler)

# Generic Routes
# @app.route('/')
# def root():
#     return render_template('Register.html')
#
# @app.route('/register')
# def register():
#     return render_template('Register.html')
#
# @app.route('/show_collections')
# def show_collections():
#     collections = db.list_collection_names()
#     return f"Collections: {', '.join(collections)}"
#
# @app.route('/add_dummy_data')
# def add_dummy_data():
#     # Add dummy data to test collections
#     db.books.insert_one({"title": "Dummy Book", "author": "Author Name"})
#     db.users.insert_one({"email": "dummy@example.com", "name": "Dummy User"})
#     db.authors.insert_one({"name": "Dummy Author"})
#     db.genres.insert_one({"name": "Dummy Genre"})
#     db.comments.insert_one({"content": "Dummy Comment"})
#     return "Dummy data added!"

if __name__ == '__main__':
    app.run(debug=True)
