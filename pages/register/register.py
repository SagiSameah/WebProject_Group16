from flask import Blueprint, render_template, request, redirect, url_for, flash
from connector_db import add_user, get_user_by_email

# Register blueprint definition
register_bp = Blueprint(
    'register_bp',
    __name__,
    static_folder='static',
    static_url_path='/register/static',
    template_folder='templates'
)
@register_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirmPassword']
        first_name = request.form['firstName']
        last_name = request.form['lastName']
        birthdate = request.form['birthDate']

        # Check if passwords match
        if password != confirm_password:
            return render_template('Register.html', error="Passwords do not match")

        # Check if user already exists
        if get_user_by_email(email):
            return render_template('Register.html', error="User already exists")

        user_data = {
            "email": email,
            "password": password,
            "first_name": first_name,
            "last_name": last_name,
            "birthdate": birthdate
        }
        add_user(user_data)
        flash('Registration successful')
        return redirect(url_for('profile_bp.profile'))
    return render_template('Register.html')
