const topicList = document.getElementById("topic-dropdown");
const categoryList = document.getElementById("category-dropdown");

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
