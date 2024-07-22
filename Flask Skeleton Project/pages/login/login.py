from flask import Blueprint, render_template

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
        user = get_user_by_email(email)
        if user and user['password'] == password:
            return redirect(url_for('homePage'))
        else:
            return "Login Failed", 401
    return render_template('login.html')
