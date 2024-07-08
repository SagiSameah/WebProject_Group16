from flask import Flask, redirect, url_for
from flask import render_template

app = Flask(__name__)


@app.route('/')
@app.route('/home')
def hello():
    return 'Hello'


@app.route('/login')
def login():
    return render_template('Login.html', name='Daniel')


@app.route('/check')
def check():
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)
