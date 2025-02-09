// Get token from localStorage
const token = localStorage.getItem('usertoken');
let userEmail = null;
let userId = null;

if (token) {
    // Get the payload
    const payload = JSON.parse(atob(token.split('.')[1]));
    userEmail = payload.sub;
}

// Get user profile by user ID
async function fetchUserProfile() {
    try {
        if (!userEmail) {
            throw new Error("User email not found.");
        }

        // Fetch user profile data
        const response = await fetch("http://localhost:8080/public/api/user/email?email=" + encodeURIComponent(userEmail));
        
        if (response.ok) {
            const userData = await response.json();
            updateProfile(userData);
            userId = userData.id;  
            fetchUserPosts(userId); 
        } else {
            throw new Error(`Failed to fetch profile: HTTP Status ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
}

// Update profile section
function updateProfile(userData) {

    const profilePhoto = userData.userProfileImage || 'placeholderimagelol.jpg';
    document.getElementById('profile-photo').src = profilePhoto;

    const profileName = userData.userName;
    document.getElementById('profile-name').innerText = profileName;

    const profileUsername = userData.username;
    document.getElementById('profile-username').innerText = profileUsername;

    const profileBio = userData.userBio || 'No bio';
    document.getElementById('profile-bio').innerText = profileBio;

    // TODO Need to create backend follower and following count
    const followersCount = userData.followersCount || 0;
    const followingCount = userData.followingCount || 0;
    document.getElementById('followers-count').innerHTML = `<strong>${followersCount}</strong> Followers`;
    document.getElementById('following-count').innerHTML = `<strong>${followingCount}</strong> Following`;

    const postsCount = userData.postList.length || 0;
    document.getElementById('posts-count').innerHTML = `<strong>${postsCount}</strong> Posts`;
}

// Fetch posts by user ID
async function fetchUserPosts(userId) {
    try {
        const response = await fetch(`http://localhost:8080/public/api/post/search/user/${userId}`);
        if (response.ok) {
            const postsData = await response.json();
            displayUserPosts(postsData);
        } else {
            throw new Error(`Failed to fetch posts: HTTP Status ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching user posts:', error);
    }
}

// Display user posts dynamically
function displayUserPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';  
    
    if (posts && posts.length > 0) {
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('col-md-4', 'mb-4');
            
            // TODO Replace placeholder image with ${post.imageUrl} after testing
            postElement.innerHTML = `
    <div class="card">
        <img src="images/plant_placeholder.jpg" class="card-img-top" alt="Post Image">
        
        <div class="card-body">
            <h5 class="card-title">${post.title}</h5>

            <div class="mt-2">
                <small class="text-muted">${new Date(post.dateTimeCreation).toLocaleString()}</small>
            </div>

            //TODO Need to make category and topic clickable in post
            <div>
                 <span class="badge rounded-pill plant-tag">${post.category ? post.category.name : 'Category'}</span>
                <span class="badge rounded-pill topic-category">${post.topic ? post.topic.name : 'Topic'}</span>
            </div>
            
            <p class="card-text">${post.description}</p>
            
            // TODO Show comments or?
            <div class="d-flex justify-content-between">
                <span><i class="far fa-heart"></i> ${post.likes || 0} Likes</span>
                <span><i class="far fa-comment"></i> ${post.commentList.length || 0} Comments</span>
            </div>

                    
        </div>
    </div>
`;
            
            postsContainer.appendChild(postElement);
        });
    } else {
        postsContainer.innerHTML = '<p>No posts to show.</p>';
    }
}



document.addEventListener('DOMContentLoaded', fetchUserProfile);
