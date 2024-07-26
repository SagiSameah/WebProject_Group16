document.addEventListener('DOMContentLoaded', () => {
    const genresPopup = document.getElementById('genresPopup');
    const authorsPopup = document.getElementById('authorsPopup');
    const personalInfoPopup = document.getElementById('personalInfoPopup');
    const genresOptions = document.getElementById('genresOptions');
    const authorsOptions = document.getElementById('authorsOptions');
    const selectedGenresContainer = document.getElementById('selectedGenresContainer');
    const selectedAuthorsContainer = document.getElementById('selectedAuthorsContainer');
    const genresErrorMsg = document.getElementById('genresErrorMsg');
    const authorsErrorMsg = document.getElementById('authorsErrorMsg');
    const displayFirstName = document.getElementById('displayFirstName');
    const displayLastName = document.getElementById('displayLastName');
    const displayEmail = document.getElementById('displayEmail');
    const displayBirthDate = document.getElementById('displayBirthDate');
    const displayGender = document.getElementById('displayGender');
    const displayPassword = document.getElementById('displayPassword');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const birthDateInput = document.getElementById('birthDate');
    const genderSelect = document.getElementById('gender');
    const passwordInput = document.getElementById('password');

    const genres = ["פנטזיה", "מתח", "רומנטיקה", "מדע בדיוני", "פילוסופיה", "פרוזה", "ביוגרפיה"];
    const authors = ["ש\"י עגנון", "דוד גרוסמן", "צרויה שלו", "עמוס עוז", "שגיא שמח", "דניאל נוס", "אלונה קמחי"];
    const selectedGenres = new Set();
    const selectedAuthors = new Set();

    function populateOptions(container, items, selectedItems, errorMsg) {
        container.innerHTML = '';
        errorMsg.textContent = '';
        const sortedItems = items.sort((a, b) => {
            if (selectedItems.has(a) && !selectedItems.has(b)) return -1;
            if (!selectedItems.has(a) && selectedItems.has(b)) return 1;
            return a.localeCompare(b);
        });

        for (const item of sortedItems) {
            const li = document.createElement('li');
            li.textContent = item;
            if (selectedItems.has(item)) {
                li.classList.add('selected');
            }
            li.addEventListener('click', () => {
                if (selectedItems.has(item)) {
                    selectedItems.delete(item);
                    li.classList.remove('selected');
                } else if (selectedItems.size < 5) {
                    selectedItems.add(item);
                    li.classList.add('selected');
                } else {
                    errorMsg.textContent = "ניתן לבחור עד 5 אפשרויות";
                }
                populateOptions(container, items, selectedItems, errorMsg);
            });
            container.appendChild(li);
        }
    }

    document.getElementById('editPersonalInfo').addEventListener('click', () => {
        personalInfoPopup.style.display = 'block';
        firstNameInput.value = displayFirstName.textContent;
        lastNameInput.value = displayLastName.textContent;
        emailInput.value = displayEmail.textContent;
        birthDateInput.value = displayBirthDate.textContent;
        genderSelect.value = displayGender.textContent === 'זכר' ? 'male' : 'female';
        passwordInput.value = displayPassword.textContent;
    });

    document.getElementById('savePersonalInfo').addEventListener('click', () => {
        if (firstNameInput.value) displayFirstName.textContent = firstNameInput.value;
        if (lastNameInput.value) displayLastName.textContent = lastNameInput.value;
        if (emailInput.value) displayEmail.textContent = emailInput.value;
        if (birthDateInput.value) displayBirthDate.textContent = birthDateInput.value;
        if (genderSelect.value) displayGender.textContent = genderSelect.value === 'male' ? 'זכר' : 'נקבה';
        if (passwordInput.value) displayPassword.textContent = passwordInput.value;
        personalInfoPopup.style.display = 'none';
    });

    document.getElementById('updateGenres').addEventListener('click', () => {
        genresPopup.style.display = 'block';
        populateOptions(genresOptions, genres, selectedGenres, genresErrorMsg);
    });

    document.getElementById('updateAuthors').addEventListener('click', () => {
        authorsPopup.style.display = 'block';
        populateOptions(authorsOptions, authors, selectedAuthors, authorsErrorMsg);
    });

    document.getElementById('closeGenresPopup').addEventListener('click', () => {
        genresPopup.style.display = 'none';
        updateSelectedItemsDisplay(selectedGenresContainer, selectedGenres);
    });

    document.getElementById('closeAuthorsPopup').addEventListener('click', () => {
        authorsPopup.style.display = 'none';
        updateSelectedItemsDisplay(selectedAuthorsContainer, selectedAuthors);
    });

    document.getElementById('closePersonalInfoPopup').addEventListener('click', () => {
        personalInfoPopup.style.display = 'none';
    });

    document.getElementById('editPersonalInfo').onclick = function () {
        document.getElementById('personalInfoPopup').style.display = 'block';
    }
    document.getElementById('closePersonalInfoPopup').onclick = function () {
        document.getElementById('personalInfoPopup').style.display = 'none';
    }
    window.onclick = function (event) {
        if (event.target == document.getElementById('personalInfoPopup')) {
            document.getElementById('personalInfoPopup').style.display = 'none';
        }
    }

    function updateSelectedItemsDisplay(container, selectedItems) {
        container.innerHTML = Array.from(selectedItems).map(item => `<span class="selected-item">${item}</span>`).join(', ');
    }

    window.onclick = function (event) {
        if (event.target === genresPopup) {
            genresPopup.style.display = "none";
            updateSelectedItemsDisplay(selectedGenresContainer, selectedGenres);
        } else if (event.target === authorsPopup) {
            authorsPopup.style.display = "none";
            updateSelectedItemsDisplay(selectedAuthorsContainer, selectedAuthors);
        } else if (event.target === personalInfoPopup) {
            personalInfoPopup.style.display = "none";
        }
    }
});
