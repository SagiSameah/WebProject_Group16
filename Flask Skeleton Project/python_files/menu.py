from flask import render_template
from flask import Blueprint

# about blueprint definition
menu_bp = Blueprint(
    'menu',
    __name__,
    static_folder='static',
    static_url_path='/menu',
    template_folder='templates'
)


# Routes
@menu_bp.route('/menu')
def menu():
    return render_template('menu.html')
