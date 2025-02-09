const byTopicSearchBtn = document.getElementById("byTopicSearchBtn");
const byCategorySearchBtn = document.getElementById("byCategorySearchBtn");
const byGenericSearch = document.getElementById("searchGeneric")

/*
 * Search by Topic 
 */

// Search by topic button
byTopicSearchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    return performSearch(event.target.id);
})

/*
 * Search by Category 
 */

// Search by category button
byCategorySearchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    return performSearch(event.target.id);
})

/* 
 * Search Generically
*/

// Search by pressing enter in generic search bar
byGenericSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    return performSearch(event.target.id);
})

// http://127.0.0.1:5500/plantposts.html?search=1&query=Bird%20Next%20Fern&category_id=1

function performSearch(inputTypeId = null){

    let searchType = "";
    let dropdownType = "";
    let typeOfId = "";
    let searchMethod = 1;
    let resultsPage = "";

    if(inputTypeId === "byCategorySearchBtn")
        resultsPage = "plantposts.html"
    if(inputTypeId === "byTopicSearchBtn")
        resultsPage = "topicposts.html"
    else
        resultsPage = "index.html"

    console.log("I will navigate to" + resultsPage);

    if(inputTypeId === "byTopicSearchBtn"){
        searchType = "searchInputTopic";
        dropdownType = "topicDropdown";
        typeOfId = "topic_id";
    }else if(inputTypeId === "byCategorySearchBtn"){
        searchType = "searchInputCategory";
        dropdownType = "categoryDropdown";
        typeOfId = "category_id";
    }else{
        searchType = "searchInputGeneric";
        searchMethod = 2;
    }

    const searchTerm = document.getElementById(searchType).value.trim();
    const dropDown = document.getElementById(dropdownType);
    const selectedDropdownId = dropDown ? dropDown.options[dropDown.selectedIndex].value : null;


    if(searchTerm){

        let fullURL = `${window.location.origin}/${resultsPage}`;

        const pageURL = new URL(fullURL);

        if(searchMethod === 1 && selectedDropdownId) {
            // specific Search refers to topic and category search
            window.location.href = `${pageURL}?search=${searchMethod}&query=${searchTerm}&${typeOfId}=${selectedDropdownId}`;
        }
        else {
            // otherwise it is a generic search 
            // TODO alert prints out the correct url but does not replace browser url
            console.log(`${pageURL}?search=${searchMethod}&query=${searchTerm}`);
            window.location.href = `${pageURL}?search=${searchMethod}&query=${searchTerm}`; 
        }
    }

    else{
        alert("Please enter a search term and select a topic!!");
    }
}

// Only when the page is loaded
document.addEventListener("DOMContentLoaded", (event) => {
    const topicList = document.getElementById("topicDropdown")
    const categoryList = document.getElementById("categoryDropdown")

    async function fetchCategories() {
    
        try {
            const response = await fetch(_PUBLIC_ENDPOINT_CATEGORY);
            const result = await response.json();
    
            for (let index = 0; index < result.length; index++) {
                categoryList.options[index + 1] = new Option(result[index].name, result[index].id);
            }
            
        } catch (error) {
            alert ("Error: " + error)
            
        }
    }
    
    async function fetchTopics() {
        
        try {
            const response = await fetch(_PUBLIC_ENDPOINT_TOPIC);
            const result = await response.json();
    
            for (let index = 0; index < result.length; index++) {
                topicList.options[index + 1] = new Option(result[index].name, result[index].id);
            }
    
        } catch (error) {
            alert ("Error: " + error)
            
        }
    }
    
    fetchCategories();
    fetchTopics();

});