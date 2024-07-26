document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = data.redirect;
            } else {
                showModal(data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            showModal("An error occurred. Please try again.");
        });
    });
});

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
