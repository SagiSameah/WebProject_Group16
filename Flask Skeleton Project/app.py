from flask import Flask, render_template
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import logging
from logging import FileHandler, Formatter
import os

app = Flask(__name__)
app.secret_key = '123'

app.config.from_pyfile('settings.py')

#--------------------MongoDB---------------------#

uri = "mongodb+srv://sagisa:WebProject16@cluster0.o0f3cvg.mongodb.net/Readiculous_WebProject16"
cluster = MongoClient(uri, server_api=ServerApi('1'))

# home
from pages.homePage import homePage
app.register_blueprint(homePage, current_page='homePage')

# about
from pages.about import about
app.register_blueprint(about, current_page='about')

# book
from pages.book import book
app.register_blueprint(book, current_page='book')

# login
from pages.login import login
app.register_blueprint(login, current_page='login')

# profile
from pages.profile import profile
app.register_blueprint(profile, current_page='profile')

# registration
from pages.register import register
app.register_blueprint(register, current_page='register')


# Enable logging
if not app.debug:
    file_handler = FileHandler('errorlog.txt')
    file_handler.setLevel(logging.WARNING)
    file_handler.setFormatter(Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    app.logger.addHandler(file_handler)

@app.route('/')
@app.route('/home')
def hello():
    return 'Hello'


@app.route('/menu')
def menu():
    return render_template('menu.html')


@app.route('/base')
def base():
    return render_template('base.html')


@app.route('/login')
def login():
    return render_template('Login.html')


@app.route('/home')
def home():
    return render_template('HomePage.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/book')
def book():
    return render_template('Book.html')


if __name__ == '__main__':
    app.run(debug=True)
