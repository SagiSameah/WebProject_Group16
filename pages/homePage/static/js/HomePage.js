document.addEventListener("DOMContentLoaded", () => {
    const filtersForm = document.getElementById("filtersForm");

    filtersForm.addEventListener("submit", (event) => {
        event.preventDefault();
        applyFilters();
    });

    function applyFilters() {
        const bookFilter = document.getElementById("bookFilter").value;
        const authorsFilter = document.getElementById("authorsFilter").value;
        const genresFilter = document.getElementById("genresFilter").value;
        const minPages = document.getElementById("minPages").value || 0;
        const maxPages = document.getElementById("maxPages").value || Infinity;
        const ratingFilter = document.getElementById("ratingFilter").value || 0;
        const yearMin = document.getElementById("yearMin").value || 1900;
        const yearMax = document.getElementById("yearMax").value || new Date().getFullYear();

        fetch("/homePage/home", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bookFilter: bookFilter,
                authorsFilter: authorsFilter,
                genresFilter: genresFilter,
                minPages: parseInt(minPages),
                maxPages: parseInt(maxPages),
                ratingFilter: parseInt(ratingFilter),
                yearMin: parseInt(yearMin),
                yearMax: parseInt(yearMax),
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
