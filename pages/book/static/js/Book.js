document.addEventListener('DOMContentLoaded', function () {
    const rateButton = document.getElementById('rateButton');
    const modal = document.getElementById('ratingModal');
    const closeModal = document.getElementById('closeRatingModal');
    const stars = document.querySelectorAll('#userRatingStars .star');
    const ratersCount = document.querySelector('#ratersCount');
    const currentRatingElement = document.getElementById('rating');
    let ratingInput = document.getElementById('ratingInput');
    const rateForm = document.getElementById('ratingForm');

    if (!rateButton || !modal || !closeModal || !stars || !ratersCount || !currentRatingElement || !ratingInput) {
        console.error("One or more elements are not found in the DOM.");
        console.log({
            rateButton, modal, closeModal, stars, ratersCount, currentRatingElement, ratingInput
        });
        return;
    }

    const ratingValue = parseFloat(currentRatingElement.textContent);
    let totalRatings = ratersCount.textContent.match(/\d+/) ? parseInt(ratersCount.textContent.match(/\d+/)[0]) : 0;

    rateButton.addEventListener('click', function (event) {
        event.stopPropagation();
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', function (event) {
        event.stopPropagation();
        modal.style.display = 'none';
    });

    modal.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    document.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    stars.forEach((star, index) => {
        star.addEventListener('click', function (event) {
            event.stopPropagation();
            const newRating = 5 - index;
            alert(`You rated this book ${newRating} stars!`);
            if (!isNaN(newRating)) {
                updateAverageRating(newRating);
                updateRatersCount();
                ratingInput.value = newRating;
                modal.style.display = 'none';
                rateForm.submit();
            }
        });
    });

    rateForm.addEventListener('submit', function (event) {
        event.preventDefault();
        submitRating();
    });

    function submitRating() {
        const formData = new FormData(rateForm);
        fetch(rateForm.action, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log('Rating submitted:', data);
            })
            .catch(error => {
                console.error('Error submitting rating:', error);
            });
    }

    function updateRatersCount() {
        totalRatings += 1;
        ratersCount.textContent = `(${totalRatings} מדרגים)`;
    }

    function updateAverageRating(newRating) {
        const ratingElement = document.getElementById('rating');
        let currentRating = parseFloat(ratingElement.textContent);
        let totalRatings = parseInt(document.querySelector('#ratersCount').textContent.match(/\d+/)[0]);

        if (!isNaN(currentRating) && !isNaN(totalRatings)) {
            let newAverageRating = ((currentRating * totalRatings) + newRating) / (totalRatings + 1);
            ratingElement.textContent = newAverageRating.toFixed(2);
        }
    }
});
