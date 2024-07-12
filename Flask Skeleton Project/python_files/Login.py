from flask import Blueprint, render_template

login_bp = Blueprint('login',
    __name__,
    static_folder='static',
    static_url_path='/login/static',
    template_folder='../../templates')

@login_bp.route('/login')
def login():
    return render_template('Login.html')
