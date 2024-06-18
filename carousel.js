// document.addEventListener("DOMContentLoaded", () => {
//     const carouselTrack = document.querySelector(".carousel-track");
//     const slides = Array.from(document.querySelectorAll(".book-slide"));
//     const prevButton = document.querySelector(".prev");
//     const nextButton = document.querySelector(".next");
//     let currentIndex = 0;
//
//     // Number of slides to show at a time
//     const slidesToShow = 3;
//     const totalSlides = slides.length;
//
//     // Function to move slides
//     function moveSlide(direction) {
//         currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
//
//         const offset = -currentIndex * (100 / slidesToShow);
//         carouselTrack.style.transform = `translateX(${offset}%)`;
//     }
//
//     // Event listener for previous button
//     prevButton.addEventListener("click", () => {
//         moveSlide(-1);
//     });
//
//     // Event listener for next button
//     nextButton.addEventListener("click", () => {
//         moveSlide(1);
//     });
//
//     // Initial position
//     carouselTrack.style.width = `${(totalSlides / slidesToShow) * 100}%`;
//     carouselTrack.style.display = 'flex';
// });

document.addEventListener("DOMContentLoaded", () => {
    const carouselTrack = document.querySelector(".carousel-track");
    const slides = Array.from(document.querySelectorAll(".book-slide"));
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    let currentIndex = 0;

    const slidesToShow = 3; // Number of slides to show at a time
    const totalSlides = slides.length;

    function moveSlide(direction) {
        currentIndex = (currentIndex + direction + totalSlides) % totalSlides;

        const offset = -currentIndex * (100 / slidesToShow);
        carouselTrack.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener("click", () => {
        moveSlide(-1);
    });

    nextButton.addEventListener("click", () => {
        moveSlide(1);
    });

    carouselTrack.style.width = `${(totalSlides * 100) / slidesToShow}%`;
    carouselTrack.style.display = 'flex';
});
