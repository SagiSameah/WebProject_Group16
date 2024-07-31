from flask import Blueprint, render_template, request, jsonify
from connector_db import get_all_books, search_books
import logging

# HomePage blueprint definition
homePage_bp = Blueprint(
    'homePage_bp',
    __name__,
    static_folder='static',
    static_url_path='/homePage/static',
    template_folder='templates'
)


@homePage_bp.route('/home', methods=['GET', 'POST'])
def homePage():

    if request.method == 'POST':
        # Extract search parameters from the form
        search_params = request.json
        logging.debug(f"Search parameters: {search_params}")

        author = search_params.get('authorsFilter', '').strip()
        genre = search_params.get('genresFilter', '').strip()
        min_pages = search_params.get('minPages', 0)
        max_pages = search_params.get('maxPages', float('inf'))
        rating = search_params.get('ratingFilter', 0)
        min_year = search_params.get('yearMin', 1900)
        max_year = search_params.get('yearMax', 2024)

        # Fetch books based on search parameters using the connector_db function
        books = search_books(author, genre, min_pages, max_pages, rating, min_year, max_year)
        logging.debug(f"Found books: {books}")

        # Ensure ObjectId is converted to string for JSON serialization
        for book in books:
            book['_id'] = str(book['_id'])

        return jsonify(books)

    books = get_all_books()
    return render_template('homePage.html', books=books)
