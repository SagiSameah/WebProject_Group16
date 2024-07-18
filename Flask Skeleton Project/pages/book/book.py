from flask import Blueprint, render_template

book_bp = Blueprint('book',
                    __name__,
                    template_folder='templates',
                    static_folder='static')

@book_bp.route('/book')
def book():
    return render_template('book.html')
