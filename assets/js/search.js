document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Clear previous results
    document.getElementById('searchResults').innerHTML = '';

    // Get the search query
    let query = document.getElementById('searchInput').value.toLowerCase();

    // Select all anchor tags (<a>) in the page
    let content = document.querySelectorAll('a');

    let resultsFound = false;

    // Loop through the content to find matches
    content.forEach(function(item) {
        if (item.textContent.toLowerCase().includes(query)) {
            // Highlight the matched text and show it in the searchResults area
            let result = `<p><strong>Search Results:</strong> ${item.outerHTML}</p>`;
            document.getElementById('searchResults').insertAdjacentHTML('beforeend', result);
            resultsFound = true;
        }
    });

    // If no results are found
    if (!resultsFound) {
        document.getElementById('searchResults').innerHTML = '<p>No results found.</p>';
    }

    // Show the search results
    let searchResults = document.getElementById('searchResults');
    searchResults.style.display = 'block';
});

// Hide search results when clicking outside
document.addEventListener('click', function(event) {
    let searchResults = document.getElementById('searchResults');
    let searchForm = document.getElementById('searchForm');
    
    if (!searchResults.contains(event.target) && !searchForm.contains(event.target)) {
        searchResults.style.display = 'none';
    }
});

// Prevent click inside searchResults from hiding the results
document.getElementById('searchResults').addEventListener('click', function(event) {
    event.stopPropagation();
});

document.getElementById('cancelSearch').addEventListener('click', function() {
    // Clear the search input
    document.getElementById('searchInput').value = '';

    // Hide search results
    document.getElementById('searchResults').innerHTML = '';
    document.getElementById('searchResults').style.display = 'none';
});