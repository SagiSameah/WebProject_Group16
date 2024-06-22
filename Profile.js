document.addEventListener('DOMContentLoaded', () => {
    const genresPopup = document.getElementById('genresPopup');
    const authorsPopup = document.getElementById('authorsPopup');
    const genresOptions = document.getElementById('genresOptions');
    const authorsOptions = document.getElementById('authorsOptions');
    const selectedGenresContainer = document.getElementById('selectedGenres');
    const selectedAuthorsContainer = document.getElementById('selectedAuthors');

    const genres = ["דרמה", "קומדיה", "מתח", "רומן", "מדע בדיוני", "פנטזיה", "היסטוריה", "ביוגרפיה"];
    const authors = ["שייקספיר", "המינגוויי", "אגתה כריסטי", "צ'ארלס דיקנס", "ג'יין אוסטן", "ג'.ק. רולינג", "לב טולסטוי", "מארק טוויין"];

    let selectedGenres = new Set();
    let selectedAuthors = new Set();

    function populateOptions(container, items, selectedItems) {
        container.innerHTML = ''; // Clear previous options
        const sortedItems = Array.from(items).sort((a, b) => {
            if (selectedItems.has(a) && !selectedItems.has(b)) return -1;
            if (!selectedItems.has(a) && selectedItems.has(b)) return 1;
            return a.localeCompare(b);
        });

        sortedItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            li.classList.add(selectedItems.has(item) ? 'selected' : 'unselected');
            li.addEventListener('click', () => {
                if (selectedItems.has(item)) {
                    selectedItems.delete(item);
                } else {
                    if (selectedItems.size < 5) {
                        selectedItems.add(item);
                    } else {
                        alert('ניתן לבחור עד 5 אפשרויות');
                        return;
                    }
                }
                populateOptions(container, items, selectedItems);
                updateSelectedItems(selectedGenresContainer, selectedGenres);
                updateSelectedItems(selectedAuthorsContainer, selectedAuthors);
            });
            container.appendChild(li);
        });
    }

    function updateSelectedItems(container, selectedItems) {
        container.innerHTML = '';
        Array.from(selectedItems).sort().forEach(item => {
            const div = document.createElement('div');
            div.textContent = item;
            container.appendChild(div);
        });
    }

    document.getElementById('updateGenres').addEventListener('click', () => {
        populateOptions(genresOptions, genres, selectedGenres);
        genresPopup.style.display = 'block';
    });

    document.getElementById('updateAuthors').addEventListener('click', () => {
        populateOptions(authorsOptions, authors, selectedAuthors);
        authorsPopup.style.display = 'block';
    });

    document.getElementById('closeGenresPopup').addEventListener('click', () => {
        genresPopup.style.display = 'none';
    });

    document.getElementById('closeAuthorsPopup').addEventListener('click', () => {
        authorsPopup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === genresPopup) {
            genresPopup.style.display = 'none';
        } else if (event.target === authorsPopup) {
            authorsPopup.style.display = 'none';
        }
    });

    updateSelectedItems(selectedGenresContainer, selectedGenres);
    updateSelectedItems(selectedAuthorsContainer, selectedAuthors);
});
