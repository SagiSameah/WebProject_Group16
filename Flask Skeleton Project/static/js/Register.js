document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const form = document.getElementById("registerForm");

    firstNameInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^a-zA-Z\u0590-\u05FF]/g, '');
        validateLanguage(this.value, 'firstNameError');
    });

    lastNameInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^a-zA-Z\u0590-\u05FF]/g, '');
        validateLanguage(this.value, 'lastNameError');
    });

    function validateLanguage(value, errorElementId) {
        const hebrewPattern = /[\u0590-\u05FF]/;
        const englishPattern = /[a-zA-Z]/;

        const containsHebrew = hebrewPattern.test(value);
        const containsEnglish = englishPattern.test(value);

        const errorElement = document.getElementById(errorElementId);
        if (containsHebrew && containsEnglish) {
            errorElement.textContent = 'יש להזין שם פרטי ומשפחה בשפה אחת בלבד (עברית או אנגלית)';
        } else {
            errorElement.textContent = '';
        }
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "{{ url_for('home') }}";
    });


    function validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(emailInput.value);
    }

    function validatePassword() {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordPattern.test(passwordInput.value);
    }

    function validateConfirmPassword() {
        return confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value !== "";
    }

    function validateForm() {
        let errorMessage = "";
        if (!validateEmail()) {
            errorMessage += "Please enter a valid email address\n";
        }
        if (!validatePassword()) {
            errorMessage += "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and one number\n";
        }
        if (!validateConfirmPassword()) {
            errorMessage += "\nPasswords do not match\n";
        }
        if (!firstNameInput.value.trim() || !lastNameInput.value.trim()) {
            errorMessage += "Please fill in all required fields.\n";
        }

        if (errorMessage) {
            showModal(errorMessage);
            return false;
        }
        return true;
    }

    function showModal(message) {
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.left = "50%";
        modal.style.top = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.backgroundColor = "white";
        modal.style.padding = "20px";
        modal.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
        modal.style.zIndex = "1000";
        modal.style.maxWidth = "300px";
        modal.style.textAlign = "center";
        modal.style.borderRadius = "8px";
        modal.textContent = message;

        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.style.marginTop = "10px";
        closeButton.addEventListener("click", () => {
            document.body.removeChild(modal);
        });

        modal.appendChild(closeButton);
        document.body.appendChild(modal);
    }

    // Initialize the calendar permanently
    const calendarContainer = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarContainer, {
        initialView: 'dayGridMonth',
        selectable: true,
        locale: 'he',
        dateClick: function (info) {
            const birthDateInput = document.getElementById('birthDate');
            const date = new Date(info.dateStr);
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
            birthDateInput.value = formattedDate;
        }
    });
    calendar.render();
});
