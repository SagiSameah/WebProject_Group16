// function validateAndRedirect() {
//     const emailInput = document.getElementById("username");
//     const passwordInput = document.getElementById("password");
//
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
//
//     const isEmailValid = emailPattern.test(emailInput.value);
//     const isPasswordValid = passwordPattern.test(passwordInput.value);
//
//     if (isEmailValid && isPasswordValid) {
//         window.location.href = 'HomePage.html';
//     } else {
//         if (!isEmailValid) {
//             alert('Please enter a valid email address.');
//         }
//         if (!isPasswordValid) {
//             alert('Password must be at least 8 characters and contain an uppercase letter, lowercase letter and one number.');
//         }
//     }
// }

function validateAndRedirect() {
    const emailInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    const isEmailValid = emailPattern.test(emailInput);
    const isPasswordValid = passwordPattern.test(passwordInput);

    if (isEmailValid && isPasswordValid) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = 'HomePage.html';
    } else {
        let errorMessage = 'Please fix the following errors:\n';
        if (!isEmailValid) {
            errorMessage += 'Please enter a valid email address.\n';
        }
        if (!isPasswordValid) {
            errorMessage += 'Password must be at least 8 characters long and contain an uppercase letter, lowercase letter, and one number\n';
        }
        showModal(errorMessage);
    }
}

function showModal(message) {
    const modal = document.getElementById("errorModal");
    const modalMessage = document.getElementById("modalMessage");
    const closeModal = document.getElementById("closeModal");

    modalMessage.textContent = message;
    modal.style.display = "block";

    closeModal.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission
        validateAndRedirect();
    });
});
