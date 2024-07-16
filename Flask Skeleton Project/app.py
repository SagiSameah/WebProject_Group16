from flask import Flask, render_template, redirect, url_for
from python_files.about import about_bp
from python_files.catalog import catalog_bp
from python_files.HomePage import homepage_bp
from python_files.Login import login_bp
from python_files.menu import menu_bp
from python_files.profile import profile_bp
from components.main_menu.main_menu import main_menu
import logging
from logging import FileHandler, Formatter
import os

template_dir = os.path.abspath('Flask Skeleton Project/templates')
static_dir = os.path.abspath('Flask Skeleton Project/static')

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
app.config.from_pyfile('settings.py')

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
app.register_blueprint(main_menu)

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
    return render_template('profile.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/book')
def book():
    return render_template('Book.html')


# @app.errorhandler(500)
# def internal_error(error):
#     return "500 error", 500


if __name__ == '__main__':
    app.run(debug=True)
