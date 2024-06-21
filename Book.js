document.addEventListener('DOMContentLoaded', function() {
    const rateButton = document.getElementById('rateButton');
    const modal = document.getElementById('ratingModal');
    const closeModal = document.getElementById('closeRatingModal');
    const stars = document.querySelectorAll('#userRatingStars .star');
    const ratersCount = document.querySelector('#ratersCount');
    const currentRatingElement = document.getElementById('rating');
    const ratingValue = parseFloat(currentRatingElement.textContent); // Initial average rating
    let totalRatings = parseInt(ratersCount.textContent.match(/\d+/)[0]); // Total ratings count

    rateButton.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    stars.forEach((star, index) => {
    star.addEventListener('click', function() {
        const newRating = 5 - index;
        alert(`You rated this book ${newRating} stars!`);
        updateRatersCount();
        updateAverageRating(newRating);
        modal.style.display = 'none';
    });
});

function updateRatersCount() {
        totalRatings += 1;
        ratersCount.textContent = `(${totalRatings} מדרגים)`;
}

function updateAverageRating(newRating) {
    const ratingElement = document.getElementById('rating');
    let currentRating = parseFloat(ratingElement.textContent);
    let totalRatings = parseInt(document.querySelector('#ratersCount').textContent.match(/\d+/)[0]);
    let newAverageRating = ((currentRating * totalRatings) + newRating) / (totalRatings + 1);
    ratingElement.textContent = newAverageRating.toFixed(2);
}
});