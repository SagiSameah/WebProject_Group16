document.addEventListener("DOMContentLoaded", () => {
    const filtersForm = document.getElementById("filtersForm");

    filtersForm.addEventListener("submit", (event) => {
        event.preventDefault();
        applyFilters();
    });

    function applyFilters() {
        const authorsFilter = document.getElementById("authorsFilter").value.trim();
        const genresFilter = document.getElementById("genresFilter").value.trim();
        const minPages = parseInt(document.getElementById("minPages").value) || 0;
        const maxPages = parseInt(document.getElementById("maxPages").value) || Infinity;
        const ratingFilter = parseInt(document.getElementById("ratingFilter").value) || 0;
        const yearMin = parseInt(document.getElementById("yearMin").value) || 1900;
        const yearMax = parseInt(document.getElementById("yearMax").value) || new Date().getFullYear();

        console.log("Selected Authors:", authorsFilter);
        console.log("Selected Genres:", genresFilter);
        console.log("Min Pages Value:", minPages);
        console.log("Max Pages Value:", maxPages);
        console.log("Rating Value:", ratingFilter);
        console.log("Min Year Value:", yearMin);
        console.log("Max Year Value:", yearMax);

        fetch("/homePage/home", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                authorsFilter: authorsFilter,
                genresFilter: genresFilter,
                minPages: minPages,
                maxPages: maxPages,
                ratingFilter: ratingFilter,
                yearMin: yearMin,
                yearMax: yearMax,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Filtered books:", data);
            displayResults(data);
        })
        .catch(error => {
            console.error("Error fetching filtered books:", error);
        });
    }

    function displayResults(books) {
        const carouselContainer = document.querySelector(".recommended-books");
        const resultsContainer = document.createElement("div");
        resultsContainer.classList.add("search-results");
        resultsContainer.innerHTML = `
            <h2>תוצאות החיפוש שלי</h2>
            <div class="book-grid">
                ${books.map(book => `
                    <div class="book-item">
                        <a href="/book/${book._id}">
                            <img src="/static/${book.image_url}" alt="${book.title}">
                        </a>
                        <p>${book.title}</p>
                    </div>
                `).join('')}
            </div>
        `;
        carouselContainer.replaceWith(resultsContainer);
    }
});
