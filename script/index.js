function listHomePosts(posts) {
    try{
        const postContainerWrapper = document.querySelector(
        ".post-container-wrapper"
        );
    
        posts.forEach((post) => {

            /* if (!post || !post.user || !post.dateTimeCreation || !post.title || !post.description) {
                console.error("Invalid post data:", post);
                return;
            } */

            const indexUserPicUrl = post.user.userProfileImage;
            let fullIndexUserPicUrl = "";
        
                if(!indexUserPicUrl) 
                fullIndexUserPicUrl = "images/plantprofilepic.jpg"
                else
                fullIndexUserPicUrl = _SITE_ENDPOINT + indexUserPicUrl;
        
            const indexPostUrl = _VIEWPOST_URL + "?post_id=" + post.id;
                
            const postElement = document.createElement("div");
            postElement.classList.add(
                "post-container",
                "shadow",
                "mb-4",
                "card-body-color",
                "col-md-8",
                "mx-auto",
                "border",
                "d-flex",
                "justify-content-center",
                "align-items-center"
            );
        
            postElement.innerHTML = `
            <div class="flex-grow-1 d-flex flex-column align-content-center w-100 mx-auto px-2">
                <div class="d-flex justify-content-between align-items-center pt-1">
                    <div>
                        <span class="me-1">
                        <img src="${
                            fullIndexUserPicUrl
                        }" alt="User logo" class="rounded-circle" style="height:3rem;width:3rem">
                        </span>
                        <span class="username fw-bold">${post.user.userName}</span>
                        <span class="text-muted fs-10 ms-2">${new Date(
                        post.dateTimeCreation
                        ).toLocaleString()}</span>
                    </div>

                    <div class="settings-menu">
                        <span class="dots fs-5">⋮</span>
                    </div>

                    </div>

                    <div class="mb-1">
                        <a href=${indexPostUrl}><span class="fs-5 fw-bold">${post.title}</span></a>
                    </div>

                    <div class="mb-2">
                        <span class="text-muted">${post.description}</span>
                    </div>

                    <div class="d-flex">
                        <div class="d-flex mb-1">
                            <span class="badge text-dark me-2 rounded-pill category-color">${
                                post.category.name
                            }</span>
                        </div>

                        <div class="d-flex mb-1">
                            <span class="badge text-dark me-2 rounded-pill topic-category-color">${
                                post.topic.name
                            }</span>
                        </div>
                    </div>

                    <div class="post-thumbnail-container">
                        <a href=${indexPostUrl}>
                            <img src="${
                                _SITE_ENDPOINT + post.imageUrl
                            }" alt="Post image" class="py-2 w-100 object-fit post-thumbnail">
                        </a>
                    </div>

                    <div class="d-flex justify-content-start pb-1">
                        <span class="me-3"><img src="icons/like_icon.svg" class="me-1" alt="Like Icon"> ${
                            post.likes
                        } Like</span>
                        <span><img src="icons/comment_icon.svg" class="me-1" alt="Comments">${post.commentList.length} Comments</span>
                    </div>
                </div>
            </div>
            `;
        
    
        postContainerWrapper.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error rendering posts:", error);
    }  
}

document.addEventListener("DOMContentLoaded", async () => {

    try {
        const apiUrl = 'http://localhost:8080/public/api/post/desc';
        const response = await fetch(apiUrl, { method: "GET" });

        if (!response.ok) {
            throw new Error(`Failed to fetch posts: HTTP Status ${response.status}`);
        }

        const posts = await response.json();
        listHomePosts(posts);

    } catch (error) {
    console.error("Error fetching posts:", error);
    }
});


  
