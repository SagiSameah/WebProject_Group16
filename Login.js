document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Validate email format
        if (!isValidEmail(usernameInput.value.trim())) {
            alert("אנא הזינו כתובת דואר אלקטרוני חוקית");
            return;
        }

        // Validate password format
        if (!isValidPassword(passwordInput.value.trim())) {
            alert("הסיסמה חייבת להכיל לפחות אות גדולה, אות קטנה ולפחות 8 תווים");
            return;
        }

        // If validation passes, proceed with form submission
        this.submit();
    });

    function isValidEmail(email) {
        // Basic email validation using regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function isValidPassword(password) {
        // Password should have at least one uppercase letter, one lowercase letter, and minimum 8 characters
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordPattern.test(password);
    }
});

function validateAndRedirect() {
    // Validate email and password here
    // Example validation for password with capital letter, lowercase letter, and minimum 8 characters
    const passwordInput = document.getElementById("password").value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!passwordPattern.test(passwordInput)) {
        alert("Password must contain at least one uppercase letter, one lowercase letter, and be at least 8 characters long.");
        return false; // Prevent form submission if validation fails
    }

    // Example validation for email (you can use a more robust validation method)
    const emailInput = document.getElementById("username").value;
    if (!isValidEmail(emailInput)) {
        alert("Invalid email address.");
        return false; // Prevent form submission if validation fails
    }

    // If validation passes, redirect to HomePage.html
    window.location.href = "HomePage.html";
}

function isValidEmail(email) {
    // Example email validation using a simple regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
