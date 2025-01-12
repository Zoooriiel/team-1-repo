const postContainer = document.querySelector(".view-post-container")

async function fetchPost(postID) {
    try {
        console.log("Post ID retrieved: " + postID);
        const response = await fetch('https://dummyjson.com/posts');
        const result = await response.json();

        function findPostByID (postID) {
            return result.posts.find((post) => post.id === postID);
        };

        const post = findPostByID(postID);

        addPost(post);

        
    } catch(error) {
        const errorHeader = document.createElement("h3");
        errorHeader.className = "fs-2 text-center text-danger";
        errorHeader.innerText = "There was an error. Try reloading.";
        postContainer.append(errorHeader);
    }
}

function addPost(post) {
    // adding in user profile pic
    const userPic = document.getElementById("post-user-pic");
    userPic.src = "https://via.placeholder.com/40";
    userPic.alt = "profile picture";

    // adding in username
    const username = document.getElementById("post-username");
    const strongUsername = document.createElement("strong");
    strongUsername.innerText = post.userId;
    username.append(strongUsername);

    // adding in timestamp
    const postDateTime = document.getElementById("post-datetime");
    postDateTime.innerText = "8 Hours Ago";

    // adding post topic
    const postTopic = document.getElementById("post-topic");
    postTopic.innerText = post.tags[0];
    
    // adding post category
    const postCategory = document.getElementById("post-category");
    postCategory.innerText = post.tags[1];

    // adding post title
    const postTitle = document.getElementById("post-title");
    postTitle.innerText = post.title;

    // adding post desc
    const postDesc = document.getElementById("post-desc");
    postDesc.innerText = post.body;

    // targeting container for likes and comments counter
    const counterContainer = document.getElementById("counter-container");

    // creating likes counter
    const likesCounter = document.createElement("span");
    likesCounter.className = "me-3";
    const likesIcon = document.createElement("img")
    likesIcon.src = "icons/like_icon.svg";
    likesIcon.alt = "Like Icon";
    likesCounter.append(likesIcon);
    likesCounter.innerText = post.reactions.likes + " Likes";

    // creating comments counter
    const commentsCounter = document.createElement("span");
    const commentsIcon = document.createElement("img");
    commentsIcon.src = "icons/comment_icon.svg";
    commentsIcon.alt = "Comments Icon";
    commentsCounter.append(commentsIcon);
    commentsCounter.innerText = post.views + " Comments";

    counterContainer.append(likesCounter);
    counterContainer.append(commentsCounter);


}

const postQueryString = window.location.search;
const postUrlParams = new URLSearchParams(postQueryString);

// have to use parseInt as .get returns a string
let postPostID = parseInt(postUrlParams.get('post_id'));


// dummy code to return post 1 if no param found
if (postPostID)
    fetchPost(postPostID)
else 
    fetchPost(1);