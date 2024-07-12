from flask import Blueprint
from flask import render_template, redirect, url_for


# homepage blueprint definition
profile_bp = Blueprint(
    'profile_bp',
    __name__,
    static_folder='static',
    static_url_path='/profile',
    template_folder='templates'
)


# Routes
@profile_bp.route('/profile')
def index():
    return render_template('profile.html')
