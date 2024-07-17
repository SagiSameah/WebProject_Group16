from flask import Blueprint, render_template, request, redirect, url_for, session, flash
from python_files.connector_db import *

login_bp = Blueprint('login',
                     __name__,
                     static_folder='static',
                     static_url_path='/login/static',
                     template_folder='../../templates')

@login_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        user = get_user_by_username(email)
        if user and user['password'] == password:  # יש לבצע Hashing והשוואה נכונה לסיסמא
            session['username'] = user['username']
            flash('Login successful!', 'success')
            return redirect(url_for('profile.profile'))
        else:
            flash('Invalid credentials!', 'error')
            return redirect(url_for('login.login'))

    return render_template('login.html')
