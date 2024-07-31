from flask import Blueprint, render_template, request, url_for, session, jsonify
from connector_db import users_col

# Login blueprint definition
login_bp = Blueprint(
    'login_bp',
    __name__,
    static_folder='static',
    static_url_path='/login/static',
    template_folder='templates'
)


@login_bp.route('/', methods=['GET'])
def index():
    return render_template('Login.html')


@login_bp.route('/login', methods=['GET', 'POST'])
def submit():
    if request.method == 'GET':
        return render_template('Login.html')

    if request.method == 'POST':
        data = request.get_json()
        useremail = data.get('email')
        password = data.get('password')
        myquery = {"email": useremail}
        user = users_col.find_one(myquery)
        if user is not None and password == user['password']:
            session['user_id'] = useremail
            return jsonify({"success": True, "redirect": url_for('profile_bp.profile')})
        return jsonify({"success": False, "message": "Incorrect username or password"})
