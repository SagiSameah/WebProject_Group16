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

    // Handle genre selection
    const genreItems = document.querySelectorAll('.genre-item');
    genreItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('selected')) {
                item.classList.remove('selected');
            } else if (document.querySelectorAll('.genre-item.selected').length < 5) {
                item.classList.add('selected');
            }
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
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}
