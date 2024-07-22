from flask import render_template, Blueprint, request, redirect, jsonify, url_for, session
from connector_db import users
import logging

# Register blueprint definition
register_bp = Blueprint(
    'register',
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
# @register_bp.route('/registration', methods=['GET', 'POST'])
# def index():
#     first_name = session.get('first_name')  # Retrieve first_name from session
#     return render_template('register.html', current_page='home', first_name=first_name)

@register_bp.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.json
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

# from flask import render_template, Blueprint, request
# from flask import redirect, jsonify, url_for, session
# from connector_db import users
# import logging
#
# # Register blueprint definition
# register_bp = Blueprint(
#     'register',
#     __name__,
#     static_folder='static',
#     static_url_path='/register/static',
#     template_folder='templates'
# )
#
# # functions
# def new_user_func(user_email, data):
#     user = users.find_one({"email": user_email})
#     if not user:
#         users(data)
#         return True
#     return False
#
#
# def create_user(data):
#     new_user = {
#         "email": data['user_email'],
#         "password": data['user_password'],
#         "first_name": data['user_first_name'],
#         "last_name": data['user_last_name'],
#         "phone": data['user_phone'],
#         "birthdate": data['user_birthdate'],
#     }
#     users.insert_one(new_user)
#
# # routes
# @register_bp.route('/registration', methods=['GET', 'POST'])
# def index():
#     first_name = session.get('first_name')  # Retrieve first_name from session
#
#     return render_template('register.html', current_page='home', first_name=first_name)
#
#
# @register_bp.route('/register', methods=['POST'])
# def register():
#     if request.method == 'POST':
#         data = request.json
#         customer_email = data.get('customer_email')
#         if new_user_func(user_email= data):
#             first_name = users.find_one({"email": customer_email})["first_name"]
#             session['userId'] = customer_email
#             session['first_name'] = first_name
#             return jsonify({'success': True, 'redirect': '/workshops', 'first_name': first_name}), 200
#         return jsonify({'success': False, 'message': 'Email already exists'}), 200
# #
# # Routes
# @register_bp.route('/Registration', methods=['GET', 'POST'])
# def index():
#     return render_template('register.html')
#
# def insert_user(data):
#     users.insert_one(data)
#
# def get_user_by_parameter(parameter, value):
#     return users.find_one({parameter: value})
#
#
# @register_bp.route('/register', methods=['GET', 'POST'])
# def submit():
#     data = request.json
#     # Check if the provided ID already exists
#     existing_user = get_user_by_parameter('id', data.get('id'))
#     if existing_user:
#         return jsonify({'success': False, 'message': 'ID already exists'})
#
#     # Check if the provided email already exists
#     existing_email = get_user_by_parameter('email', data.get('email'))
#     if existing_email:
#         return jsonify({'success': False, 'message': 'Email already exists'})
#     # Assume user registration process here...
#     # After successfully registering the user:
#     session['user_id'] = data.get('id')  # Use a unique identifier for the user
#     insert_user(data)
#     return jsonify({'success': True, 'redirect': url_for('Profile.index', user_id=session['user_id'])})
