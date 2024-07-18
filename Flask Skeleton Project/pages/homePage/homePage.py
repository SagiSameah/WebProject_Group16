from flask import Blueprint, render_template, redirect, url_for

# homepage blueprint definition
homepage_bp = Blueprint(
    'homepage',
    __name__,
    static_folder='static',
    static_url_path='/homepage/static',
    template_folder='templates'
)


# Routes
@homepage_bp.route('/')
def index():
    return render_template('HomePage.html')

