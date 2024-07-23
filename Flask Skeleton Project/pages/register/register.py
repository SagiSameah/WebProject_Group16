from flask import Blueprint, render_template, request, redirect, url_for, session, jsonify
from connector_db import users

# Register blueprint definition
register_bp = Blueprint(
    'register_bp',
    __name__,
    static_folder='static',
    static_url_path='/register/static',
    template_folder='templates'
)


# Functions
def new_user_func(user_email, data):
    user = users.find_one({"email": user_email})
    if not user:
        users.insert_one(data)
        return True
    return False


# Routes
@register_bp.route('/register', methods=['GET'])
def register():
    first_name = session.get('first_name')
    return render_template('register.html', current_page='home', first_name=first_name)


@register_bp.route('/register', methods=['POST'])
def registration():
    if request.method == 'POST':
        data = request.form
        user_email = data.get('email')
        user_data = {
            "email": data.get('email'),
            "password": data.get('password'),
            "first_name": data.get('first_name'),
            "last_name": data.get('last_name'),
            "birthdate": data.get('birthdate'),
        }
        if new_user_func(user_email, user_data):
            session['user_email'] = user_email
            session['first_name'] = data.get('first_name')
            return jsonify({'success': True, 'redirect': '/profile', 'first_name': data.get('first_name')}), 200
        return jsonify({'success': False, 'message': 'Email already exists'}), 200
