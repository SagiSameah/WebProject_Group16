# from flask import Blueprint, render_template
# from connector_db import books
#
# # book blueprint definition
# book_bp = Blueprint(
#     'book',
#     __name__,
#     static_folder='static',
#     static_url_path='/book',
#     template_folder='templates'
# )
#
# # Routes
# @book_bp.route('/', methods=['GET'])
# def book():
#     return render_template('book.html')

from flask import Blueprint, render_template, request, redirect, url_for, session
from connector_db import get_collection
from pip._internal.network import session

# Book blueprint definition
book_bp = Blueprint(
    'book_bp',
    __name__,
    static_folder='static',
    static_url_path='/book/static',
    template_folder='templates'
)

@book_bp.route('/book/<book_id>', methods=['GET', 'POST'])
def book_details(book_id):
    books = get_collection('books')
    comments = get_collection('comments')

    book = books.find_one({"_id": book_id})
    book_comments = comments.find({"book_id": book_id})

    if request.method == 'POST':
        comment_text = request.form['comment']
        rating = int(request.form['rating'])
        user_id = session.get('user_id')

        comment_data = {
            "book_id": book_id,
            "user_id": user_id,
            "comment": comment_text,
            "rating": rating
        }
        comments.insert_one(comment_data)
        return redirect(url_for('book.book_details', book_id=book_id))

    return render_template('Book.html', book=book, comments=book_comments)
