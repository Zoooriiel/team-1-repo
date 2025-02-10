const byGenericSearch = document.getElementById("searchGeneric")

function performGenericSearch() {
    
    const searchTerm = document.getElementById("searchInputGeneric").value.trim();

    if(searchTerm) {
        let fullURL = `${window.location.origin}/search.html`;

        const pageURL = new URL(fullURL);

        window.location.href = `${pageURL}?search=2&query=${searchTerm}`; 

    } else {
        alert("Please enter a search term.")
    }
}

byGenericSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    return performGenericSearch(event.target.id);
})