from flask import Blueprint, render_template, request, redirect, url_for, session, jsonify
from connector_db import users

# Login blueprint definition
login_bp = Blueprint(
    'login_bp',
    __name__,
    static_folder='static',
    static_url_path='/login/static',
    template_folder='templates'
)

# Route for login page
@login_bp.route('/', methods=['GET'])
def login():
    return render_template('login.html')

# Route for handling login
@login_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data['email']
    password = data['password']
    user = users.find_one({"email": email})
    if user and user['password'] == password:
        session['user_email'] = user['email']
        session['first_name'] = user['first_name']
        return jsonify({'success': True, 'redirect': url_for('homePage_bp.homePage')})
    return jsonify({'success': False, 'message': 'Invalid email or password'}), 401
