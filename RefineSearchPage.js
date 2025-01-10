const byTopicSearchBtn = document.getElementById("byTopicSearchBtn");
const byCategorySearchBtn = document.getElementById("byCategorySearchBtn");
// Topic dropdown menu
const dropdownTopicItems = document.querySelectorAll(".dropdown-menuTopic .dropdown-itemTopic");
const dropdownCategoryItems = document.querySelectorAll(".dropdown-menuCategory .dropdown-itemCategory");


searchInputTopic.value

/*
 * Search by Topic 
 */

// Search by topic button
byTopicSearchBtn.addEventListener("click", () => {

    const topicSearchTerm = document.getElementById("searchInputTopic").value.trim();
    const selectedTopic = document.querySelector(".dropdown-menuTopic .active");
    const selectedDropdownName = selectedTopic ? selectedTopic.textContent.trim() : null;

    if(topicSearchTerm && selectedDropdownName){
        const pageURL = new URL(window.location.origin);
        const searchURL = `${pageURL}?search=1query=${(topicSearchTerm)}&topic=${(selectedDropdownName)}`;

        window.location.href = searchURL;
    }else{
        alert("Please enter a search term and select a topic!!");
    }
})

// Topic Dropdown
dropdownTopicItems.forEach(item => {
    item.addEventListener("click", () => {
        dropdownTopicItems.forEach(item => item.classList.remove("active"));
        item.classList.add("active");

        const dropdownButton = document.getElementById("dropdownMenuButtonTopic");
        dropdownButton.textContent = item.textContent;
    });
});


/*
 * Search by category
 */

// Search by category button
byCategorySearchBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const categorySearchTerm = document.getElementById("searchInputCategory").value.trim();
    const selectedCategory = document.querySelector(".dropdown-menuCategory .active");
    const selectedDropdownName = selectedCategory ? selectedCategory.textContent.trim() : null;

    if(categorySearchTerm && selectedDropdownName){
        const pageURL = new URL(window.location.origin);
        const searchURL = `${pageURL}?search=1query=${(categorySearchTerm)}&topic=${(selectedDropdownName)}`;

        window.location.href = searchURL;
    }else{
        alert("Please enter a search term and select a category!!");
    }

})

// Category dropdown
dropdownCategoryItems.forEach(item => {
    item.addEventListener("click", () => {
        dropdownCategoryItems.forEach(item => item.classList.remove("active"));
        item.classList.add("active");

        const dropdownButton = document.getElementById("dropdownMenuButtonCategory");
        dropdownButton.textContent = item.textContent;
    });
});