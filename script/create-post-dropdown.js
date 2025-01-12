function topicOptions() {
    // TODO add in similar try catch from comments
    return new Array("Showcase", "Help", "Q&A", "Tips", "Exchange", "Giveaway");
};

function categoryOptions() {
    // TODO add in similar try catch from comments
    return new Array("Succulents", "Leafy plants", "Creepers", "Moss");
};

const topicArr = topicOptions();
const categoryArr = categoryOptions();

const topicList = document.getElementById("topic-dropdown");
const plantList = document.getElementById("category-dropdown");

for (let index = 0; index < topicArr.length; index++) {
    topicList.options[index + 1] = new Option(topicArr[index], index + 1);
}

for (let index = 0; index < categoryArr.length; index++) {
    plantList.options[index + 1] = new Option(categoryArr[index], index + 1);
}

/* async function fetchComments(postID = null) {

    try {
        console.log("ID retrieved " + postID);
        // TODO fetch from fetchcomments(post_id)
        // TODO api call for comments here (springboot)
        // const response = await fetch (`http://localhost:8080/fetchcomments/${postID}`)
        const response = await fetch('https://dummyjson.com/comments');
        const result = await response.json();

        const commentsList = result.comments;

        for (let index = 0; index < commentsList.length; index++) {
            addComment(commentsList[index]);
        }

    } catch(error) {
        const errorHeader = document.createElement("h3");
        errorHeader.className = "fs-2 text-center text-danger";
        errorHeader.innerText = "There was an error. Try reloading."
        commentsCointainers.append(errorHeader);
    }
} */
