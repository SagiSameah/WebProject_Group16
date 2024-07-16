from flask import Blueprint, render_template, request, redirect, url_for, flash
from connector_db import add_user, get_user_by_username

register_bp = Blueprint('register',
                     __name__,
                     static_folder='static',
                     static_url_path='/register/static',
                     template_folder='../../templates')


@register_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        birthdate = request.form['birthdate']

        existing_user = get_user_by_username(username)
        if existing_user:
            flash('Username already exists!', 'error')
            return redirect(url_for('register.register'))

        user_data = {
            "username": username,
            "password": password,  # יש לבצע Hashing לסיסמא כאן
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "birthdate": birthdate
        }
        add_user(user_data)
        flash('Registration successful!', 'success')
        return redirect(url_for('login.login'))

    return render_template('register.html')
