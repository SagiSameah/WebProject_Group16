document.addEventListener('DOMContentLoaded', () => {
    const genresPopup = document.getElementById('genresPopup');
    const authorsPopup = document.getElementById('authorsPopup');
    const genresOptions = document.getElementById('genresOptions');
    const authorsOptions = document.getElementById('authorsOptions');
    const selectedGenresContainer = document.getElementById('selectedGenresContainer');
    const selectedAuthorsContainer = document.getElementById('selectedAuthorsContainer');
    const genresErrorMsg = document.getElementById('genresErrorMsg');
    const authorsErrorMsg = document.getElementById('authorsErrorMsg');
    const updateGenresButton = document.getElementById('updateGenres');
    const updateAuthorsButton = document.getElementById('updateAuthors');
    const closeGenresPopup = document.getElementById('closeGenresPopup');
    const closeAuthorsPopup = document.getElementById('closeAuthorsPopup');
    const saveGenresButton = document.getElementById('saveGenres');
    const saveAuthorsButton = document.getElementById('saveAuthors');

    const editButton = document.getElementById('editPersonalInfoButton');
    const saveButton = document.getElementById('savePersonalInfoButton');
    const showPasswordCheckbox = document.getElementById('showPassword');
    const showPasswordLabel = document.getElementById('showPasswordLabel');
    const inputFields = document.querySelectorAll('#profileForm input, #profileForm select');

    // Initially disable input fields
    inputFields.forEach(input => {
        input.disabled = true;
    });

    editButton.addEventListener('click', () => {
        inputFields.forEach(input => {
            input.disabled = false;
        });
        editButton.style.display = 'none';
        saveButton.style.display = 'block';
        showPasswordCheckbox.style.display = 'inline';
        showPasswordLabel.style.display = 'inline';
    });

    showPasswordCheckbox.addEventListener('change', () => {
        const passwordField = document.getElementById('password');
        if (showPasswordCheckbox.checked) {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    });

    const selectedGenres = new Set();
    const selectedAuthors = new Set();

    function populateOptions(container, selectedItems, errorMsg) {
        container.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', () => {
                const item = li.textContent.split(' (')[0];
                if (selectedItems.has(item)) {
                    selectedItems.delete(item);
                    li.classList.remove('selected');
                } else if (selectedItems.size < 5) {
                    selectedItems.add(item);
                    li.classList.add('selected');
                } else {
                    errorMsg.textContent = "ניתן לבחור עד 5 אפשרויות";
                }
                populateOptions(container, selectedItems, errorMsg);
            });
        });
    }

    updateGenresButton.addEventListener('click', () => {
        genresPopup.style.display = 'block';
        populateOptions(genresOptions, selectedGenres, genresErrorMsg);
    });

    updateAuthorsButton.addEventListener('click', () => {
        authorsPopup.style.display = 'block';
        populateOptions(authorsOptions, selectedAuthors, authorsErrorMsg);
    });

    closeGenresPopup.addEventListener('click', () => {
        genresPopup.style.display = 'none';
    });

    closeAuthorsPopup.addEventListener('click', () => {
        authorsPopup.style.display = 'none';
    });

    saveGenresButton.addEventListener('click', () => {
        genresPopup.style.display = 'none';
        updateSelectedItemsDisplay(selectedGenresContainer, selectedGenres, "הז'אנרים שלי: ");
        document.getElementById('selectedGenres').value = Array.from(selectedGenres).join(',');

        // Send the updated list to the server
        fetch('{{ url_for("profile_bp.update_favorites") }}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'genres',
                data: Array.from(selectedGenres)
            }),
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log("Genres updated successfully");
                } else {
                    console.error("Error updating genres");
                }
            });
    });

    saveAuthorsButton.addEventListener('click', () => {
        authorsPopup.style.display = 'none';
        updateSelectedItemsDisplay(selectedAuthorsContainer, selectedAuthors, "הסופרים שלי: ");
        document.getElementById('selectedAuthors').value = Array.from(selectedAuthors).join(',');

        // Send the updated list to the server
        fetch('{{ url_for("profile_bp.update_favorites") }}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'authors',
                data: Array.from(selectedAuthors)
            }),
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log("Authors updated successfully");
                } else {
                    console.error("Error updating authors");
                }
            });
    });

    function updateSelectedItemsDisplay(container, selectedItems, label) {
        container.innerHTML = label + Array.from(selectedItems).map(item => `<span class="selected-item">${item}</span>`).join(', ');
    }
});
