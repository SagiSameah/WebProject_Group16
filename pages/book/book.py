import logging

from flask import Blueprint, render_template, request, session, redirect, url_for
from connector_db import get_book_by_id, update_book, add_comment
from datetime import datetime

book_bp = Blueprint(
    'book_bp',
    __name__,
    static_folder='static',
    static_url_path='/book/static',
    template_folder='templates'
)

@book_bp.route('/<book_id>', methods=['GET', 'POST'])
def book_details(book_id):
    logging.info(f"Accessing book details for book ID: {book_id}")
    book = get_book_by_id(book_id)
    if not book:
        logging.info("Book not found, redirecting to homepage")
        return redirect(url_for('homePage_bp.homePage'))

    if request.method == 'POST':
        if 'comment' in request.form:
            comment = {
                "user_id": session.get('user_id'),
                "comment": request.form['comment'],
                "timestamp": request.form.get('timestamp', datetime.utcnow().isoformat())
            }
            add_comment(book_id, comment)
        elif 'rating' in request.form:
            rating_str = request.form['rating']
            if rating_str:
                new_rating = float(rating_str)
                updated_data = {
                    "rating": (book['rating'] * book['raters_count'] + new_rating) / (book['raters_count'] + 1),
                    "raters_count": book['raters_count'] + 1
                }
                update_book(book_id, updated_data)
        return redirect(url_for('book_bp.book_details', book_id=book_id))

    return render_template('book.html', book=book)
