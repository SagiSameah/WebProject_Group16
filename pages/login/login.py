from flask import Blueprint, render_template, request, redirect, url_for, session, jsonify
from connector_db import users_col, get_user_by_email

# Login blueprint definition
login_bp = Blueprint(
    'login_bp',
    __name__,
    static_folder='static',
    static_url_path='/login/static',
    template_folder='templates'
)


def login_func(login_email, login_password):
    user = users_col.find_one({"email": login_email})
    if user:
        if user["password"] == login_password:
            return True, None  # Login successful
        else:
            return False, "התקבלה סיסמא שגויה. אנא נסה שנית"  # Incorrect password
    else:
        return False, "המשתמש לא קיים. אנא להירשם לאתר!"  # User does not exist


@login_bp.route('/', methods=['GET'])
def index():
    return render_template('Login.html')

@login_bp.route('/login', methods=['GET', 'POST'])
def submit():
    if request.method == 'GET':
        return redirect(url_for('login_bp.index'))
    if request.method == 'POST':
        useremail = request.form['email']
        password = request.form['password']
        myquery = {"email": useremail}
        user = users_col.find_one(myquery)
        if user is not None:
            if password == user['password']:
                session['user_id'] = useremail
                return redirect(url_for('homePage_bp.homePage'))
            return render_template('Login.html', error='Incorrect username or password')
        return render_template('Login.html', error='Incorrect username or password')
    return redirect(url_for('login_bp.index'))
