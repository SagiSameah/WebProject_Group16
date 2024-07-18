from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from python_files.about import about_bp
from python_files.catalog import catalog_bp
from python_files.HomePage import homepage_bp
from python_files.Login import login_bp
from python_files.menu import menu_bp
from python_files.profile import profile_bp
from python_files.Register import register_bp
from components.main_menu.main_menu import main_menu
from connector_db import *
import logging
from logging import FileHandler, Formatter
import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Create Flask app
template_dir = os.path.abspath('Flask Skeleton Project/templates')
static_dir = os.path.abspath('Flask Skeleton Project/static')

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
app.config.from_pyfile('settings.py')
app.secret_key = os.getenv('SECRET_KEY')

# Enable logging
if not app.debug:
    file_handler = FileHandler('errorlog.txt')
    file_handler.setLevel(logging.WARNING)
    file_handler.setFormatter(Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    app.logger.addHandler(file_handler)

# Register blueprints
app.register_blueprint(about_bp)
app.register_blueprint(catalog_bp)
app.register_blueprint(homepage_bp)
app.register_blueprint(login_bp)
app.register_blueprint(menu_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(register_bp)  # Register the register blueprint
app.register_blueprint(main_menu)

# Connect to MongoDB
client = MongoClient(os.getenv('DB_URI'))
db = client.Readiculous_WebProject16

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

@app.route('/homePage')
def homePage():
    return render_template('HomePage.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/profile')
def profile():
    if 'user_email' not in session:
        return redirect(url_for('login'))
    user = find_user_by_email(session['user_email'])
    return render_template('profile.html', user=user)

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/book')
def book():
    return render_template('Book.html')

@app.route('/show_collections')
def show_collections():
    collections = db.list_collection_names()
    return f"Collections: {', '.join(collections)}"

@app.route('/register', methods=['POST'])
def register_user():
    user_data = {
        "email": request.form['email'],
        "firstName": request.form['firstName'],
        "lastName": request.form['lastName'],
        "birthDate": request.form['birthDate'],
        "password": request.form['password'],
        "genres": [],
        "authors": []
    }
    add_user(user_data)
    session['user_email'] = user_data['email']
    return redirect(url_for('homePage'))

@app.route('/login', methods=['POST'])
def login_user():
    email = request.form['username']
    password = request.form['password']
    user = find_user_by_email(email)
    if user and user['password'] == password:
        session['user_email'] = email
        return redirect(url_for('homePage'))
    else:
        flash('Invalid email or password')
        return redirect(url_for('login'))

@app.route('/update_profile', methods=['POST'])
def update_profile():
    if 'user_email' not in session:
        return jsonify({"success": False, "message": "User not logged in"}), 403
    email = session['user_email']
    updated_data = request.json
    update_user(email, updated_data)
    return jsonify({"success": True})

@app.route('/update_genres', methods=['POST'])
def update_genres():
    if 'user_email' not in session:
        return jsonify({"success": False, "message": "User not logged in"}), 403
    email = session['user_email']
    genres = request.json['genres']
    update_user_genres(email, genres)
    return jsonify({"success": True})

@app.route('/update_authors', methods=['POST'])
def update_authors():
    if 'user_email' not in session:
        return jsonify({"success": False, "message": "User not logged in"}), 403
    email = session['user_email']
    authors = request.json['authors']
    update_user_authors(email, authors)
    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(debug=True)
