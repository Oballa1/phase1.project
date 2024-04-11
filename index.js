document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const favoritesDropdown = document.getElementById('favorites');

    // Function to search for books by title
    function searchBooks() {
        // Get the title entered by the user
        const title = searchInput.value.trim();
        if (title === '') {
            // Display an alert if the user didn't enter a title
            alert('Please enter a book title.');
            return;
        }

        // Send a GET request to the Open Library API to search for books by title
        fetch(`https://openlibrary.org/search.json?title=${title}`)
            .then(response => response.json()) // Parse the JSON response
            .then(data => {
                // Display the search results
                displaySearchResults(data.docs);
            })
            .catch(error => console.error('Error fetching search results:', error)); // Handle errors
    }

    // Function to display search results
    function displaySearchResults(books) {
        searchResults.innerHTML = ''; // Clear previous search results
        books.forEach(book => {
            // Construct HTML for each book in the search results
            const coverId = book.cover_i ? book.cover_i : ''; // Check if cover ID is available
            const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : 'https://via.placeholder.com/150'; // Generate cover URL or fallback to a placeholder image

            const bookInfo = `
                <div class="book">
                    <img src="${coverUrl}" alt="Book Cover">
                    <div>
                        <h3>${book.title}</h3>
                        <p>Author: ${book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
                        <button onclick="addToFavorites('${book.title}')">Add to Favorites</button>
                    </div>
                </div>
            `;
            searchResults.innerHTML += bookInfo; // Append the book info to the search results container
        });
    }

    // Function to add a book to favorites
    window.addToFavorites = function(title) {
        const option = document.createElement('option'); // Create a new option element
        option.textContent = title; // Set the text content of the option to the book title
        favoritesDropdown.appendChild(option); // Append the option to the favorites dropdown
    };

    // Event listener for the search button
    searchButton.addEventListener('click', searchBooks); // Call the searchBooks function when the search button is clicked
});
