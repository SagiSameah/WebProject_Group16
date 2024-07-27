# from flask import Blueprint, render_template
#
# # HomePage blueprint definition
# homePage_bp = Blueprint(
#     'homePage_bp',
#     __name__,
#     static_folder='static',
#     static_url_path='/homePage/static',
#     template_folder='templates'
# )
#
# # Routes
# @homePage_bp.route('/', methods=['GET'])
# def homePage():
#     return render_template('HomePage.html')

from flask import Blueprint, render_template
from connector_db import get_collection, get_all_books

# HomePage blueprint definition
homePage_bp = Blueprint(
    'homePage_bp',
    __name__,
    static_folder='static',
    static_url_path='/homePage/static',
    template_folder='templates'
)

@homePage_bp.route('/home')
def homePage():
    books = get_all_books()
    return render_template('HomePage.html', books=books)
