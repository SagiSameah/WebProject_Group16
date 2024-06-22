document.addEventListener('DOMContentLoaded', () => {
    const genresPopup = document.getElementById('genresPopup');
    const authorsPopup = document.getElementById('authorsPopup');
    const genresOptions = document.getElementById('genresOptions');
    const authorsOptions = document.getElementById('authorsOptions');
    const selectedGenresContainer = document.getElementById('selectedGenres');
    const selectedAuthorsContainer = document.getElementById('selectedAuthors');
    const genderSelect = document.getElementById('gender');
    const passwordField = document.getElementById('password');
    const emailField = document.getElementById('email');
    const birthDateField = document.getElementById('birthDate');

    const genres = ["דרמה", "קומדיה", "מתח", "רומן", "מדע בדיוני", "פנטזיה", "היסטוריה", "ביוגרפיה"];
    const authors = ["שייקספיר", "ארנסט המינגוויי", "אגתה כריסטי", "צ'ארלס דיקנס", "ג'יין אוסטן", "ג'יי .קיי. רולינג", "לב טולסטוי", "מארק טוויין"];

    let selectedGenres = new Set();
    let selectedAuthors = new Set();
    let passwordTouched = false;
    let emailTouched = false;

    passwordField.addEventListener('input', () => {
        passwordTouched = true;
    });

    emailField.addEventListener('input', () => {
        emailTouched = true;
    });

    function populateOptions(container, items, selectedItems) {
        container.innerHTML = '';
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

    const editPersonalInfoButton = document.getElementById('editPersonalInfo');
    const savePersonalInfoButton = document.getElementById('savePersonalInfo');
    const personalInfoFields = document.querySelectorAll('.profile-info input, .profile-info select');

    editPersonalInfoButton.addEventListener('click', () => {
        personalInfoFields.forEach(field => {
            field.removeAttribute('readonly');
        });
        genderSelect.disabled = false;
        editPersonalInfoButton.style.display = 'none';
        savePersonalInfoButton.style.display = 'block';
    });

    savePersonalInfoButton.addEventListener('click', () => {
        if (passwordTouched && !validatePassword()) {
            return;
        }
        if (!validateBirthDate()) {
            alert('Not a valid birthdate! Unless you\'re under 4 years old or over 120... 😉');
            return;
        }

        personalInfoFields.forEach(field => {
            field.setAttribute('readonly', 'true');
            field.value = '';
        });
        genderSelect.disabled = true;
        editPersonalInfoButton.style.display = 'block';
        savePersonalInfoButton.style.display = 'none';
        showUpdatePopup();
    });

    function validatePassword() {
        const password = passwordField.value;
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);

        if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasNumber) {
            alert('Password must be at least 8 characters long and contain an uppercase letter, lowercase letter, and one number\n');
            return false;
        }
        return true;
    }

    function validateBirthDate() {
        const birthDateInput = birthDateField.value;
        const [day, month, year] = birthDateInput.split('/');
        const birthDate = new Date(`${year}-${month}-${day}`);
        const startDate = new Date('1900-01-01');
        const endDate = new Date('2020-12-31');

        return birthDate >= startDate && birthDate <= endDate;
    }

    function showUpdatePopup() {
        const popup = document.createElement('div');
        popup.classList.add('update-popup');
        popup.textContent = 'הפרטים האישיים עודכנו בהצלחה';
        document.body.appendChild(popup);
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 3000);
    }
});
