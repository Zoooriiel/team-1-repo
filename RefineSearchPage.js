const byTopicSearchBtn = document.getElementById("byTopicSearchBtn");
const byCategorySearchBtn = document.getElementById("byCategorySearchBtn");

/*
 * Search by Topic 
 */

// Search by topic button
byTopicSearchBtn.addEventListener("click", (event) => {
    return performSearch(event.target.id);
})

/*
 * Search by Category 
 */

// Search by category button
byCategorySearchBtn.addEventListener("click", (event) => {
    return performSearch(event.target.id);
})

function performSearch(inputTypeId = null){

    let searchType = "";
    let dropdownType = "";
    let typeOfId = "";
    let searchMethod = 1;
    let resultsPage = "index.html";

    if(inputTypeId === "byTopicSearchBtn"){
        searchType = "searchInputTopic";
        dropdownType = "topicDropdown";
        typeOfId = "topic_id";
    }else if(inputTypeId === "byCategorySearchBtn"){
        searchType = "searchInputCategory";
        dropdownType = "categoryDropdown";
        typeOfId = "category_id";
    }else{
        // TODO Generic Search implementation
        searchMethod = 2;
    }

    const searchTerm = document.getElementById(searchType).value.trim();
    const dropDown = document.getElementById(dropdownType);
    const selectedDropdownId = dropDown ? dropDown.options[dropDown.selectedIndex].value : null;

    if(searchTerm && selectedDropdownId){

        let fullURL = `${window.location.origin}/${resultsPage}`;

        const pageURL = new URL(fullURL);

        if(searchMethod === 1)
            // specific Search refers to topic and category search
            window.location.href = `${pageURL}?search=${searchMethod}&query=${(searchTerm)}&${typeOfId}=${(selectedDropdownId)}`;
        else
            // otherwise it is a generic search 
            window.location.href = `${pageURL}?search=${searchMethod}&query=${(searchTerm)}`;

    }else{
        alert("Please enter a search term and select a topic!!");
    }
}

// Only when the page is loaded
document.addEventListener("DOMContentLoaded", (event) => {

    // Topic dropdown menu
    const dropDownTopicItems = [
        {id: 1, name: "Tips"},
        {id: 2, name: "Plant Exchange"},
        {id: 3, name: "Giveaway"},
    ];

    // Category dropdown menu
    const dropDownCatogeryItems = [
        {id: 1, name: "Tips"},
        {id: 2, name: "Plant Exchange"},
        {id: 3, name: "Giveaway"},
    ];
  
    // Topic Dropdown
    dropDownTopicItems.forEach(item => {
       // TODO add the option(s) textContent and value
       // target: topicDropdown
    });

    // Category dropdown
    dropDownCatogeryItems.forEach(item => {
        // TODO add the option(s) textContent and value
        // target: categoryDropdown
    });

});