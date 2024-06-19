document.addEventListener('DOMContentLoaded', () => {
    // Display initial rating stars
    const rating = 4.5; // Example rating value
    displayRatingStars(rating);

    // Open rating modal
    const rateBookButton = document.getElementById('rateBookButton');
    const ratingModal = document.getElementById('ratingModal');
    const closeRatingModal = document.getElementById('closeRatingModal');

    rateBookButton.addEventListener('click', () => {
        ratingModal.style.display = 'block';
    });

    closeRatingModal.addEventListener('click', () => {
        ratingModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === ratingModal) {
            ratingModal.style.display = 'none';
        }
    });

    // Handle user rating stars
    const userRatingStars = document.querySelectorAll('#userRatingStars .star');
    userRatingStars.forEach(star => {
        star.addEventListener('click', () => {
            const ratingValue = star.getAttribute('data-value');
            userRatingStars.forEach(s => {
                if (s.getAttribute('data-value') <= ratingValue) {
                    s.classList.add('full');
                } else {
                    s.classList.remove('full');
                }
            });

            // Here, you can send the rating value to the server or process it as needed
            console.log('User rating:', ratingValue);
            alert(`You rated this book ${ratingValue} stars!`);
            ratingModal.style.display = 'none';
        });
    });

    // Function to open a popup
    function openPopup(popupId) {
        document.getElementById(popupId).style.display = 'block';
    }

    // Function to close a popup
    function closePopup(popupId) {
        document.getElementById(popupId).style.display = 'none';
    }

    // Event listeners for update buttons
    document.getElementById('updateGenres').addEventListener('click', () => {
        openPopup('genresPopup');
    });

    document.getElementById('updateAuthors').addEventListener('click', () => {
        openPopup('authorsPopup');
    });

    document.getElementById('updatePersonalInfo').addEventListener('click', () => {
        openPopup('personalInfoPopup');
    });

    // Event listeners for close buttons
    document.getElementById('closeGenresPopup').addEventListener('click', () => {
        closePopup('genresPopup');
    });

    document.getElementById('closeAuthorsPopup').addEventListener('click', () => {
        closePopup('authorsPopup');
    });

    // Close the popup if the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup')) {
            event.target.style.display = 'none';
        }
    });

    // Example options for genres and authors
    const genres = ['Sci-Fi', 'Romance', 'Comedy', 'Biography', 'History', 'Detective', 'Drama', 'Series', 'Children', 'Comics', 'Autobiography', 'Politics'];
    const authors = ['Author 1', 'Author 2', 'Author 3', 'Author 4', 'Author 5', 'Author 6', 'Author 7', 'Author 8', 'Author 9', 'Author 10', 'Author 11', 'Author 12'];

    // Populate the options
    function populateOptions(listId, options) {
        const list = document.getElementById(listId);
        options.forEach(option => {
            const li = document.createElement('li');
            li.textContent = option;
            list.appendChild(li);
        });
    }

    populateOptions('genresOptions', genres);
    populateOptions('authorsOptions', authors);
});

function displayRatingStars(rating) {
    const starsContainer = document.getElementById('stars-container');
    starsContainer.innerHTML = ''; // Clear any existing stars

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        starsContainer.innerHTML += '<span class="star full">&#9733;</span>'; // Full star
    }

    if (halfStar) {
        starsContainer.innerHTML += '<span class="star half">&#9734;</span>'; // Half star (outline star)
    }

    for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
        starsContainer.innerHTML += '<span class="star">&#9734;</span>'; // Empty star
    }
}
