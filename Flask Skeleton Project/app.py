from flask import Flask, redirect, url_for
from flask import render_template

app = Flask(__name__)


@app.route('/')
@app.route('/home')
def hello():
    return 'Hello'


@app.route('/login')
def login():
    return render_template('Login.html')


@app.route('/homePage')
def check():
    return render_template('HomePage.html')


if __name__ == '__main__':
    app.run(debug=True)




# ###### App setup
# app = Flask(__name__)
# app.config.from_pyfile('settings.py')
#
# ###### Pages
# ## Homepage
# from pages.homepage.homepage import homepage
#
# app.register_blueprint(homepage)
#
# ## About - TO ADD
# from pages.about.about import about
#
# app.register_blueprint(about)
#
# ## Profile
# from pages.profile.profile import profile
#
# app.register_blueprint(profile)
#
# ## Menu
# from pages.menu.menu import menu
#
# app.register_blueprint(menu)
#
# ## Catalog
# from pages.catalog.catalog import catalog
#
# app.register_blueprint(catalog)
#
# ## Page error handlers
# from pages.page_error_handlers.page_error_handlers import page_error_handlers
#
# app.register_blueprint(page_error_handlers)
#
# ###### Components
# ## Main menu
# from components.main_menu.main_menu import main_menu
#
# app.register_blueprint(main_menu)
