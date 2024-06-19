document.addEventListener('DOMContentLoaded', () => {

    const maxSelections = 5;
    let selectedGenres = [];
    let selectedAuthors = [];

    // Update genres and authors popups
    const updateGenresButton = document.getElementById('updateGenres');
    const updateAuthorsButton = document.getElementById('updateAuthors');
    const genresPopup = document.getElementById('genresPopup');
    const authorsPopup = document.getElementById('authorsPopup');
    const closeGenresPopup = document.getElementById('closeGenresPopup');
    const closeAuthorsPopup = document.getElementById('closeAuthorsPopup');
    const genresOptionsList = document.getElementById('genresOptions');
    const authorsOptionsList = document.getElementById('authorsOptions');

    updateGenresButton.addEventListener('click', () => {
        openPopup(genresPopup);
        populateOptions(genresOptionsList, genres, selectedGenres);
    });

    updateAuthorsButton.addEventListener('click', () => {
        openPopup(authorsPopup);
        populateOptions(authorsOptionsList, authors, selectedAuthors);
    });

    closeGenresPopup.addEventListener('click', () => {
        closePopup(genresPopup);
    });

    closeAuthorsPopup.addEventListener('click', () => {
        closePopup(authorsPopup);
    });

    // Close the popup if the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target === genresPopup) {
            closePopup(genresPopup);
        }
        if (event.target === authorsPopup) {
            closePopup(authorsPopup);
        }
    });

    // Function to open a popup
    function openPopup(popupElement) {
        popupElement.style.display = 'block';
    }

    // Function to close a popup
    function closePopup(popupElement) {
        popupElement.style.display = 'none';
    }

    // Populate the options in the popup
    function populateOptions(listElement, options, selectedItems) {
        listElement.innerHTML = '';
        options.forEach(option => {
            const li = document.createElement('li');
            li.textContent = option;
            li.classList.add('popup-option');
            if (selectedItems.includes(option)) {
                li.classList.add('selected');
            }
            li.addEventListener('click', () => {
                toggleOption(li, selectedItems);
            });
            listElement.appendChild(li);
        });
    }

    // Function to toggle an option (select/deselect)
    function toggleOption(optionElement, selectedItems) {
        if (optionElement.classList.contains('selected')) {
            deselectOption(optionElement, selectedItems);
        } else {
            selectOption(optionElement, selectedItems);
        }
    }

    // Function to select an option
    function selectOption(optionElement, selectedItems) {
        if (selectedItems.length >= maxSelections) {
            alert('ניתן לבחור עד 5 אפשרויות');
            return;
        }
        optionElement.classList.add('selected');
        selectedItems.push(optionElement.textContent);
        selectedItems.sort(); // Sort selected items alphabetically
    }

    // Function to deselect an option
    function deselectOption(optionElement, selectedItems) {
        optionElement.classList.remove('selected');
        const index = selectedItems.indexOf(optionElement.textContent);
        if (index !== -1) {
            selectedItems.splice(index, 1);
        }
    }

    // Example options for genres and authors
    const genres = ['Sci-Fi', 'Romance', 'Comedy', 'Biography', 'History', 'Detective', 'Drama', 'Series', 'Children', 'Comics', 'Autobiography', 'Politics'];
    const authors = ['Author 1', 'Author 2', 'Author 3', 'Author 4', 'Author 5', 'Author 6', 'Author 7', 'Author 8', 'Author 9', 'Author 10', 'Author 11', 'Author 12'];

});
