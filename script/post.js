const postContainer = document.querySelector(".view-post-container");
const postImageContainer = document.querySelector(".post-image-container");
const postColumn = document.querySelector(".view-post-column");
const postDetailsContainer = document.getElementById("post-details-container");
const topicCategoryContainer = document.getElementById("topic-category-container");
const postSpinnerContainerName = "postSpinnerContainer";

const postSpinnerContainer = document.createElement("div");                                                         
postSpinnerContainer.setAttribute("id", postSpinnerContainerName); 
postSpinnerContainer.className = "text-center fw-light mx-auto w-25 pt-4";
postSpinnerContainer.innerText = " Loading..."

async function fetchPost(postID) {

    postColumn.prepend(postSpinnerContainer);

    const postSpinner = new Spinner();
    postSpinner.createSpinner(postSpinnerContainerName);
    postSpinner.displaySpinner(true);

    try {
        const postResponse = await fetch('http://localhost:8080/public/api/post');
        const postResult = await postResponse.json();

        function findPostByID (postID) {
            return postResult.find((post) => post.id === postID);
        };

        const post = findPostByID(postID);

        addPost(post);

        
    } catch(error) {
        const errorHeader = document.createElement("h3");
        errorHeader.className = "fs-2 text-center text-danger";
        errorHeader.innerText = "Error: " + error.message;
        postColumn.append(errorHeader);
    }

    postSpinner.displaySpinner(false);
    postColumn.removeChild(postSpinnerContainer);
}


async function addPost(post) {
    // adding in image
    const postPic = document.createElement("img")
    postPic.setAttribute("id", "post-pic")
    postPic.className = "img-fluid"
    const postPicUrl = _SITE_ENDPOINT + post.imageUrl
    postPic.src = postPicUrl;
    postPic.alt = "post image";
    postImageContainer.append(postPic);
    postPic.style.width = "100%"

    // adding in user profile pic
    const userPic = document.createElement("img");
    userPic.setAttribute("id", "post-user-pic");
    userPic.className = "rounded-circle me-2";
    const userPicUrl = post.user.userProfileImage
    let fullUserPicUrl = ""

    if (!userPicUrl) 
        fullUserPicUrl = "images/plantprofilepic.jpg";
    else
        fullUserPicUrl = _SITE_ENDPOINT + userPicUrl;

    userPic.src = fullUserPicUrl;
    userPic.alt = "profile picture";
    postDetailsContainer.append(userPic);
    userPic.style.width = "3rem";
    userPic.style.height = "3rem";

    // adding in username
    const username = document.createElement("span");
    username.className = "card-top-font-color-mobile";
    const strongUsername = document.createElement("strong");
    strongUsername.innerText = post.user.userName;
    postDetailsContainer.append(username)
    username.append(strongUsername);

    // adding in timestamp
    const postDateTime = document.createElement("span");
    postDateTime.className = "card-top-font-color-mobile ms-1";
    const resultDateTime = post.dateTimeCreation;
    const dateTimeArray = resultDateTime.split("T")
    const dateTimeArray2 = dateTimeArray[1].split(".")
    const date = dateTimeArray[0];
    const time = dateTimeArray2[0];
    postDateTime.innerText = `${date}  ${time}`;
    postDetailsContainer.append(postDateTime);

    // adding post topic
    const postTopic = document.createElement("span");
    postTopic.className = ("badge text-dark me-2 rounded-pill topic-category-color")
    const postTopicLink = document.createElement("a")
    postTopicLink.setAttribute("href", "#");
    postTopic.innerText = post.topic.name;
    topicCategoryContainer.append(postTopic);
    postTopic.append(postTopicLink);
    
    // adding post category
    const postCategory = document.createElement("span");
    postCategory.className = "badge text-dark rounded-pill plant-tag-color";
    const postCategoryLink = document.createElement("a");
    postCategoryLink.setAttribute("href", "#");
    postCategory.innerText = post.category.name;
    topicCategoryContainer.append(postCategory);
    postCategory.append(postCategoryLink);

    // adding post title
    const postTitle = document.getElementById("post-title");
    postTitle.innerText = post.title;

    // adding post desc
    const postDesc = document.getElementById("post-desc");
    postDesc.innerText = post.description;

    // targeting container for likes and comments counter
    const counterContainer = document.getElementById("counter-container");

    // creating likes counter
    const likesCounter = document.createElement("span");
    likesCounter.className = "me-3";
    const likesIcon = document.createElement("img")
    likesIcon.src = "icons/like_icon.svg";
    likesIcon.alt = "Like Icon";
    likesCounter.append(likesIcon);
    likesCounter.innerText = post.likes + " Likes";

    // creating comments counter
    const commentsCounter = document.createElement("span");
    const commentsIcon = document.createElement("img");
    commentsIcon.src = "icons/comment_icon.svg";
    commentsIcon.alt = "Comments Icon";
    commentsCounter.append(commentsIcon);
    commentsCounter.innerText = post.commentList.length + " Comments";

    counterContainer.append(likesCounter);
    counterContainer.append(commentsCounter);
}

const postQueryString = window.location.search;
const postUrlParams = new URLSearchParams(postQueryString);

// have to use parseInt as .get returns a string
let postPostID = parseInt(postUrlParams.get('post_id'));

document.addEventListener("DOMContentLoaded", async(event) => {
    event.preventDefault();
    
    fetchPost(postPostID)
    
})