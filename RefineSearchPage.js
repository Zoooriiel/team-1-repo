const byTopicSearchBtn = document.getElementById("byTopicSearchBtn");
const byCategorySearchBtn = document.getElementById("byCategorySearchBtn");
const byGenericSearch = document.getElementById("searchGeneric")

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

/* 
 * Search Generically
*/

// Search by pressing enter in generic search bar
byGenericSearch.addEventListener("submit", (event) => {
    return performSearch(event.target.id);
})



function performSearch(inputTypeId = null){

    let searchType = "";
    let dropdownType = "";
    let typeOfId = "";
    let searchMethod = 1;
    let resultsPage = "SearchByTags.html";

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
        searchType = "searchInputGeneric";
        searchMethod = 2;
    }

    const searchTerm = document.getElementById(searchType).value.trim();
    const dropDown = document.getElementById(dropdownType);
    const selectedDropdownId = dropDown ? dropDown.options[dropDown.selectedIndex].value : null;

    /* if(searchTerm && selectedDropdownId){

        let fullURL = `${window.location.origin}/${resultsPage}`;

        const pageURL = new URL(fullURL);

        if(searchMethod === 1)
            // specific Search refers to topic and category search
            window.location.href = `${pageURL}?search=${searchMethod}&query=${(searchTerm)}&${typeOfId}=${(selectedDropdownId)}`;
        else
            // otherwise it is a generic search 
            window.location.href = `${pageURL}?search=${searchMethod}&query=${(searchTerm)}`;

    } */

    if(searchTerm){

        let fullURL = `${window.location.origin}/${resultsPage}`;

        const pageURL = new URL(fullURL);

        if(searchMethod === 1 && selectedDropdownId) {
            // specific Search refers to topic and category search
            window.location.href = `${pageURL}?search=${searchMethod}&query=${(searchTerm)}&${typeOfId}=${(selectedDropdownId)}`;
        }
        else {
            // otherwise it is a generic search 
            // TODO alert prints out the correct url but does not replace browser url
            window.location.href = `${pageURL}?search=${searchMethod}&query=${(searchTerm)}`; 
            
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

    // Topic dropdown menu
    const dropDownTopicItems = [
        {id: 1, name: "Showcase"},
        {id: 2, name: "Help"},
        {id: 3, name: "Q&A"},
        {id: 4, name: "Tips"},
        {id: 5, name: "Exchange"},
        {id: 6, name: "Giveaway"}
    ];

    // Category dropdown menu
    const dropDownCategoryItems = [
        {id: 1, name: "Succulents"},
        {id: 2, name: "Leafy Plants"},
        {id: 3, name: "Creepers"},
        {id: 4, name: "Moss"}
    ];
  
    // Topic Dropdown
    dropDownTopicItems.forEach(item => {
       // target: topicDropdown
       for (let index = 0; index < dropDownTopicItems.length; index++) {
            topicList.options[index + 1] = new Option(dropDownTopicItems[index].name, dropDownTopicItems[index].id);
       };
    });

    // Category dropdown
    dropDownCategoryItems.forEach(item => {
        // target: categoryDropdown
        for (let index = 0; index < dropDownCategoryItems.length; index++) {
            categoryList.options[index + 1] = new Option(dropDownCategoryItems[index].name, dropDownTopicItems[index].id);
        }
    });

});