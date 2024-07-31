from flask import Blueprint, render_template, request, session, redirect, url_for, jsonify
from connector_db import get_user_by_email, update_user, get_all_books
import logging
from collections import Counter

# Profile blueprint definition
profile_bp = Blueprint(
    'profile_bp',
    __name__,
    static_folder='static',
    static_url_path='/profile',
    template_folder='templates'
)

def get_unique_authors():
    books = get_all_books()
    authors_counter = Counter()

    for book in books:
        authors_counter[book['author']] += 1

    return authors_counter


def get_unique_genres():
    books = get_all_books()
    genres_counter = Counter()

    for book in books:
        genres_counter[book['genre']] += 1

    return genres_counter

@profile_bp.route('/profile', methods=['GET', 'POST'])
def profile():
    user_id = session.get('user_id')
    if not user_id:
        return redirect(url_for('login_bp.index'))  # Redirect to login if not logged in
    user = get_user_by_email(user_id)
    authors_counter = get_unique_authors()
    genres_counter = get_unique_genres()

    if request.method == 'POST':
        updated_data = {
            "first_name": request.form['first_name'],
            "last_name": request.form['last_name'],
            "phone": request.form['phone'],
            "birthdate": request.form['birthdate'],
            "password": request.form['password'],
            "gender": request.form['gender'],
            "selected_genres": request.form.getlist('selected_genres'),
            "selected_authors": request.form.getlist('selected_authors')
        }
        update_user(user_id, updated_data)
        return redirect(url_for('profile_bp.profile'))

    return render_template('profile.html', user=user, authors_counter=authors_counter, genres_counter=genres_counter)

@profile_bp.route('/update_favorites', methods=['POST'])
def update_favorites():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "User not logged in"}), 401

    data = request.json
    update_field = {
        'genres': 'selected_genres',
        'authors': 'selected_authors'
    }.get(data['type'])

    if not update_field:
        return jsonify({"error": "Invalid type"}), 400

    updated_data = {update_field: data['data']}
    logging.debug(f"Updating {update_field} for user {user_id} with data {data['data']}")
    update_user(user_id, updated_data)

    return jsonify({"success": True})
