async function fetchComments() {

    try {
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
}



function addComment(comment) {

    const commentsCointainer = document.querySelector(".comments-container");

    // comment card
    const commentCard = document.createElement("div");
    commentCard.className = "comment card mb-2";
    commentsCointainer.append(commentCard);

    // comment info
    const commentInfo = document.createElement("div");
    commentInfo.className = "comment-info d-flex align-items-center pt-1 ps-1";
    commentCard.append(commentInfo);

    // profile pic
    const profilePic = document.createElement("img");
    profilePic.className = "rounded-circle me-2";
    profilePic.src = "https://via.placeholder.com/40";
    profilePic.alt = "User profile picture";
    commentInfo.append(profilePic);

    // username
    const username = document.createElement("span");
    username.className = "card-top-font-color-mobile";
    const strongUsername = document.createElement("strong");
    strongUsername.innerText = comment.user.username;
    commentInfo.append(username);
    username.append(strongUsername);

    // timestamp
    const timestamp = document.createElement("span");
    timestamp.className = "card-top-font-color-mobile ms-1";
    commentInfo.append(timestamp);

    // comments body
    const commentBody = document.createElement("div");
    commentBody.className = "card-body";
    commentBody.innerText = comment.body;
    commentCard.append(commentBody);


}

fetchComments();