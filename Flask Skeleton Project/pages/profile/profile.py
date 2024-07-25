# from flask import Blueprint
# from flask import render_template, redirect, url_for
#
#
# # homepage blueprint definition
# profile_bp = Blueprint(
#     'profile_bp',
#     __name__,
#     static_folder='static',
#     static_url_path='/profile',
#     template_folder='templates'
# )
#
#
# # Routes
# @profile_bp.route('/profile')
# def index():
#     return render_template('profile.html')

from flask import Blueprint, render_template, request, session, redirect, url_for
from connector_db import get_user_by_email, update_user

# profile blueprint definition
profile_bp = Blueprint(
    'profile_bp',
    __name__,
    static_folder='static',
    static_url_path='/profile',
    template_folder='templates'
)

@profile_bp.route('/profile', methods=['GET', 'POST'])
def profile():
    user_id = session.get('user_id')
    user = get_user_by_email(user_id)

    if request.method == 'POST':
        updated_data = {
            "first_name": request.form['first_name'],
            "last_name": request.form['last_name'],
            "phone": request.form['phone'],
            "birthdate": request.form['birthdate']
        }
        update_user(user_id, updated_data)
        return redirect(url_for('profile.profile'))

    return render_template('Profile.html', user=user)
