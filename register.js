document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const birthDateInput = document.getElementById("birthDate");
    const form = document.getElementById("registrationForm");
    const errorMessages = document.getElementById("errorMessages");

     // if (emailInput.value === '' || name.value === '' || passwordInput.value === '' ){
     //        msg.innerHTML = 'Please enter all fields'
     //        msg.classList.add('error')
     //        setTimeout(() => {
     //           msg.innerHTML = ''
     //           msg.classList.remove('error')
     //        }, 2000)
     //    }

    emailInput.addEventListener("input", validateEmail);
    passwordInput.addEventListener("input", validatePassword);
    confirmPasswordInput.addEventListener("input", validateConfirmPassword);
    birthDateInput.addEventListener("input", validateBirthDate);

    form.addEventListener("submit", (event) => {
        if (!validateForm()) {
            event.preventDefault();
        }
    });

    function validateEmail() {
        const emailStatus = document.getElementById("emailStatus");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(emailInput.value)) {
            emailStatus.classList.remove("hidden", "invalid");
            emailStatus.classList.add("valid");
        } else {
            emailStatus.classList.remove("hidden", "valid");
            emailStatus.classList.add("invalid");
        }
    }

function validatePassword() {
    const passwordStatus = document.getElementById("passwordStatus");
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (passwordPattern.test(passwordInput.value)) {
        passwordStatus.classList.remove("hidden", "invalid");
        passwordStatus.classList.add("valid");
    } else {
        passwordStatus.classList.remove("hidden", "valid");
        passwordStatus.classList.add("invalid");
    }
}

function validateConfirmPassword() {
    const confirmPasswordStatus = document.getElementById("confirmPasswordStatus");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const passwordInput = document.getElementById("password");

    if (confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value !== "") {
        confirmPasswordStatus.classList.remove("hidden", "invalid");
        confirmPasswordStatus.classList.add("valid");
        confirmPasswordStatus.textContent = ''; // Clear any previous error message
    } else {
        confirmPasswordStatus.classList.remove("hidden", "valid");
        confirmPasswordStatus.classList.add("invalid");
        confirmPasswordStatus.textContent = "Passwords don't match";
    }
}


    function validateBirthDate() {
        const birthDateStatus = document.getElementById("birthDateStatus");
        const birthDatePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (birthDatePattern.test(birthDateInput.value)) {
            birthDateStatus.classList.remove("hidden", "invalid");
            birthDateStatus.classList.add("valid");
        } else {
            birthDateStatus.classList.remove("hidden", "valid");
            birthDateStatus.classList.add("invalid");
        }
    }

    function validateForm() {
        validateEmail();
        validatePassword();
        validateConfirmPassword();
        validateBirthDate();

        const isValid = document.querySelectorAll('.valid').length === 4;

        if (!isValid) {
            errorMessages.textContent = "Please fix the errors in the form.";
            return false;
        }
        return true;
    }

function showCalendar() {
    const birthDateInput = document.getElementById("birthDate");

    const calendar = document.createElement("input");
    calendar.type = "date";
    calendar.style.position = "absolute";
    calendar.style.visibility = "hidden";

    // Ensure calendar is removed if already present
    const existingCalendar = document.querySelector(".calendar");
    if (existingCalendar) {
        document.body.removeChild(existingCalendar);
    }

    document.body.appendChild(calendar);
    calendar.click();

    calendar.onchange = function() {
        const date = new Date(calendar.value);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        birthDateInput.value = formattedDate;
        document.body.removeChild(calendar);
    };

    // Add a class to identify the calendar
    calendar.classList.add("calendar");
}

    ;
});
