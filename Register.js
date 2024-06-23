document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    // const birthDateInput = document.getElementById("birthDate");
    const birthDateField = document.getElementById('birthDate');
    const form = document.getElementById("registerForm");
    document.getElementById("birthDate").addEventListener("click", showCalendar);
    document.querySelector(".calendar-icon").addEventListener("click", showCalendar);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = 'HomePage.html';
    });

    function validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(emailInput.value);
    }

    function validateBirthDate() {
        const birthDateInput = birthDateField.value;
        const [day, month, year] = birthDateInput.split('/');
        const birthDate = new Date(`${year}-${month}-${day}`);
        const startDate = new Date('1900-01-01');
        const endDate = new Date('2020-12-31');

        return birthDate >= startDate && birthDate <= endDate;
    }

    function validatePassword() {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordPattern.test(passwordInput.value);
    }

    function validateConfirmPassword() {
        return confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value !== "";
    }

    // function validateBirthDate() {
    //     const birthDatePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    //     return birthDatePattern.test(birthDateInput.value);
    // }

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
        if (!validateBirthDate()) {
            alert('Not a valid birthdate! Unless you\'re under 4 years old or over 120... 😉');
            return;
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
});

function showCalendar() {
    const birthDateInput = document.getElementById("birthDate");

    const calendar = document.createElement("input");
    calendar.type = "date";
    calendar.style.position = "absolute";
    calendar.style.visibility = "visible";

    // Ensure calendar is removed if already present
    const existingCalendar = document.querySelector(".calendar");
    if (existingCalendar) {
        document.body.removeChild(existingCalendar);
    }

    document.body.appendChild(calendar);
    calendar.click();

    calendar.onchange = function () {
        const date = new Date(calendar.value);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        birthDateInput.value = formattedDate;
        document.body.removeChild(calendar);
    };

    // Add a class to identify the calendar
    calendar.classList.add("calendar");
}
