const commentsSpinnerContainerName = "commentsSpinnerContainer";
const commentsContainerName = ".comments-container";
const commentsContainer = document.querySelector(commentsContainerName);

const commentsSpinnerContainer = document.createElement("div");                                                         
commentsSpinnerContainer.setAttribute("id", commentsSpinnerContainerName);                                                     
commentsSpinnerContainer.className = "text-center fw-light mx-auto w-25 pt-4";                               
commentsSpinnerContainer.innerText = " Loading...";    

async function fetchComments(postID = null) {
    
    commentsContainer.prepend(commentsSpinnerContainer);

    const commentsSpinner = new Spinner();
    commentsSpinner.createSpinner(commentsSpinnerContainerName);
    commentsSpinner.displaySpinner(true);
    
    try {
        const response = await fetch (`http://localhost:8080/public/api/comment/post/${postID}`)
        if (!response.ok) {
            commentsSpinner.displaySpinner(false);
            commentsContainer.removeChild(commentsSpinnerContainer);
            return;
        }
        const commentsList = await response.json();

        for (let index = 0; index < commentsList.length; index++) {
            addComment(commentsList[index]);
        }
        
    } catch(error) {
        const errorHeader = document.createElement("h3");
        errorHeader.className = "fs-2 text-center text-danger";
        errorHeader.innerText = "There was an error. Try reloading."
        commentsContainer.append(errorHeader);
    }

    commentsSpinner.displaySpinner(false);
    commentsContainer.removeChild(commentsSpinnerContainer);
}


function addComment(comment) {

    // comment card
    const commentCard = document.createElement("div");
    commentCard.className = "comment card mb-2";
    commentsContainer.append(commentCard);

    // comment info
    const commentInfo = document.createElement("div");
    commentInfo.className = "comment-info d-flex align-items-center pt-1 ps-1";
    commentCard.append(commentInfo);

    // profile pic
    const commentUserPic = document.createElement("img");
    commentUserPic.className = "rounded-circle me-2";
    const commentUserPicUrl = comment.user.userProfileImage;
    let fullCommentUserPicUrl = ""

    if (!commentUserPicUrl) 
        fullCommentUserPicUrl = "images/plantprofilepic.jpg";
    else
        fullCommentUserPicUrl = _SITE_ENDPOINT + commentUserPicUrl;

    commentUserPic.src = fullCommentUserPicUrl;
    commentUserPic.alt = "User profile picture";
    commentInfo.append(commentUserPic);
    commentUserPic.style.height = "2rem"
    commentUserPic.style.width = "2rem"

    // username
    const username = document.createElement("span");
    username.className = "card-top-font-color-mobile";
    const strongUsername = document.createElement("strong");
    strongUsername.innerText = comment.user.userName;
    commentInfo.append(username);
    username.append(strongUsername);

    // timestamp
    const timestamp = document.createElement("span");
    timestamp.className = "card-top-font-color-mobile ms-1";
    timestamp.innerText = new Date(comment.dateTimeUpdate).toLocaleString()
    commentInfo.append(timestamp);

    // comments body
    const commentBody = document.createElement("div");
    commentBody.className = "card-body";
    commentBody.innerText = comment.commentBody;
    commentCard.append(commentBody);


}

const commentsQueryString = window.location.search;
const commentsUrlParams = new URLSearchParams(commentsQueryString);

let commentsPostID = parseInt(commentsUrlParams.get('post_id'));

document.addEventListener("DOMContentLoaded", (event) => {                                                     
    event.preventDefault();
    if(commentsPostID) 
        fetchComments(commentsPostID);
    else
        return;                                                                                    
});

