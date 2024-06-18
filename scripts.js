document.addEventListener('DOMContentLoaded', () => {
    // Open modals
    document.querySelector('#updateGenres').addEventListener('click', () => {
        openModal('genresModal');
    });

    document.querySelector('#updateAuthors').addEventListener('click', () => {
        openModal('authorsModal');
    });

    // Close modals
    document.querySelector('#closeGenresPopup').addEventListener('click', () => {
        closeModal('genresModal');
    });

    document.querySelector('#closeAuthorsPopup').addEventListener('click', () => {
        closeModal('authorsModal');
    });

    // Close modals when clicking outside the modal content
    window.addEventListener('click', (event) => {
        const genresModal = document.getElementById('genresModal');
        const authorsModal = document.getElementById('authorsModal');

        if (event.target === genresModal) {
            closeModal('genresModal');
        }

        if (event.target === authorsModal) {
            closeModal('authorsModal');
        }
    });

    // Handle option selection
    const optionItems = document.querySelectorAll('.option-item');
    optionItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('selected')) {
                item.classList.remove('selected');
            } else if (document.querySelectorAll('.option-item.selected').length < 5) {
                item.classList.add('selected');
            } else {
                alert('ניתן לבחור עד 5 אפשרויות');
            }

            // Move selected items to the top
            const container = item.parentElement;
            const selectedItems = Array.from(container.querySelectorAll('.option-item.selected'));
            selectedItems.forEach(selectedItem => container.prepend(selectedItem));
        });
    });

    // Search functionality
    document.querySelectorAll('.search-container input').forEach(input => {
        input.addEventListener('input', (event) => {
            const query = event.target.value.toLowerCase();
            const items = event.target.parentElement.nextElementSibling.querySelectorAll('.option-item');
            items.forEach(item => {
                if (item.textContent.toLowerCase().includes(query)) {
                    item.style.display = 'inline-block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Save selected genres
    document.querySelector('#saveGenres').addEventListener('click', () => {
        const selectedGenres = document.querySelectorAll('.genre-item.selected');
        if (selectedGenres.length < 2) {
            alert('יש לבחור לפחות 2 ז\'אנרים כדי שנוכל להמשיך להמליץ לכם על ספרים נוספים בהתאם להעדפותיכם :)');
            return;
        }

        const genresList = Array.from(selectedGenres).map(item => item.textContent).join(', ');
        document.getElementById('genresList').textContent = genresList;
        closeModal('genresModal');
    });

    // Handle opening and closing of the rating form
    document.querySelector('#rateBook').addEventListener('click', () => {
        document.querySelector('#ratingForm').style.display = 'block';
    });

    // Handle form submission for rating
    document.querySelector('#submitRating').addEventListener('click', (event) => {
        event.preventDefault();
        const rating = document.querySelector('#userRating').value;
        const comment = document.querySelector('#comment').value;

        // Validate the rating
        if (rating < 1 || rating > 5) {
            alert('Please enter a rating between 1 and 5.');
            return;
        }

        // Submit the rating and comment (for demonstration purposes, we'll just log it)
        console.log('Rating:', rating);
        console.log('Comment:', comment);

        // Clear the form
        document.querySelector('#userRating').value = '';
        document.querySelector('#comment').value = '';
        document.querySelector('#ratingForm').style.display = 'none';

        // Update the book rating display
        // Assuming a function updateBookRating exists that updates the displayed rating
        // updateBookRating(rating, comment);

        alert('Thank you for your rating!');
    });

    // Assuming we have a function to load book details based on a search or selection
    function loadBookDetails(bookId) {
        // Fetch book details from the server or database
        // For demonstration, we'll use hardcoded data
        const bookDetails = {
            author: 'Author Name',
            publisher: 'Publisher Name',
            year: '2023',
            genre: 'Genre Name',
            pages: '300',
            rating: '4.5',
            numRaters: '120'
        };

        // Update the book details in the DOM
        document.getElementById('author').textContent = bookDetails.author;
        document.getElementById('publisher').textContent = bookDetails.publisher;
        document.getElementById('year').textContent = bookDetails.year;
        document.getElementById('genre').textContent = bookDetails.genre;
        document.getElementById('pages').textContent = bookDetails.pages;
        document.getElementById('bookRating').textContent = bookDetails.rating;
        document.getElementById('numRaters').textContent = bookDetails.numRaters;
    }

    // Example: Load book details for a specific book ID
    loadBookDetails(1);

    // Assuming we have a function to load comments
    function loadComments(bookId) {
        // Fetch comments from the server or database
        // For demonstration, we'll use hardcoded data
        const comments = [
            { user: 'User1', comment: 'Great book!' },
            { user: 'User2', comment: 'Really enjoyed it.' }
        ];

        // Update the comments list in the DOM
        const commentsList = document.getElementById('commentsList');
        commentsList.innerHTML = ''; // Clear existing comments
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `<strong>${comment.user}:</strong> ${comment.comment}`;
            commentsList.appendChild(commentElement);
        });
    }

    // Example: Load comments for a specific book ID
    loadComments(1);
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}
