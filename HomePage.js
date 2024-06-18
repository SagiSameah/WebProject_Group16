document.addEventListener("DOMContentLoaded", () => {
    const carouselTrack = document.querySelector(".carousel-track");
    const slides = Array.from(document.querySelectorAll(".book-slide"));
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    let currentIndex = 0;

    // Number of slides to show at a time
    const slidesToShow = 3;

    // Event listener for previous button
    prevButton.addEventListener("click", () => {
        moveSlide(-1);
    });

    // Event listener for next button
    nextButton.addEventListener("click", () => {
        moveSlide(1);
    });

    // Function to move slides
    function moveSlide(direction) {
        const totalSlides = slides.length;
        currentIndex = (currentIndex + direction + totalSlides) % totalSlides;

        // Ensure the index is within the correct range
        if (currentIndex < 0) {
            currentIndex = totalSlides - slidesToShow;
        } else if (currentIndex + slidesToShow > totalSlides) {
            currentIndex = 0;
        }

        const offset = -currentIndex * (100 / slidesToShow);
        carouselTrack.style.transform = `translateX(${offset}%)`;
    }
});