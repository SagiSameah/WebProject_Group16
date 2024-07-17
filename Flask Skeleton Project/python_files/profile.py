from flask import Blueprint, render_template, request, redirect, url_for, session, flash
from python_files.connector_db import *

# homepage blueprint definition
profile_bp = Blueprint(
    'profile_bp',
    __name__,
    static_folder='static',
    static_url_path='/profile',
    template_folder='templates'
)

@profile_bp.route('/profile')
def profile():
    if 'username' not in session:
        flash('You are not logged in!', 'error')
        return redirect(url_for('login.login'))

    user = get_user_by_username(session['username'])
    return render_template('profile.html', user=user)

@profile_bp.route('/update_profile', methods=['POST'])
def update_profile():
    if 'username' not in session:
        flash('You are not logged in!', 'error')
        return redirect(url_for('login.login'))

    email = request.form['email']
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    birthdate = request.form['birthdate']

    update_data = {
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "birthdate": birthdate
    }
    update_user(session['username'], update_data)
    flash('Profile updated successfully!', 'success')
    return redirect(url_for('profile.profile'))
