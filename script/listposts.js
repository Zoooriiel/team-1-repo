function listPosts(posts, typeOfPost, query="") {
  const postContainerWrapper = document.querySelector(
    ".post-container-wrapper"
  );

  posts.forEach((post) => {

    const postElement = document.createElement("div");
    postElement.classList.add(
      "post-container",
      "shadow",
      "mb-4",
      "card-body-color",
      "col-md-10",
      "mx-auto",
      "border"
    );

    const elementTagQuery = document.getElementById("tagQuery");
    const elementTagType = document.getElementById("tagType");

    
    if(typeOfPost==="category"){

        // the search is for category aka plant
        elementTagType.textContent = post.category.name;

        // if no query, hide the tag along the title
        if(!query){
          elementTagQuery.style.display = "none";
        }else{
          const categoryStr = query.length >= 50 ? String(query).substring(0,50) + "..." : query;
          elementTagQuery.textContent = categoryStr;
        }


        postElement.innerHTML = `
          <div class="d-flex">
            <div class="post-thumbnail-container">
              <img src="${
                post.imageUrl
              }" alt="Post image" class="post-thumbnail">
            </div>

            <div class="flex-grow-1 d-flex flex-column align-content-center ps-4">
              <div class="d-flex justify-content-between align-items-center mb-1 pt-3">
                <div>
                  <span class="me-1">
                    <img src="path_to_user_image/${
                      post.user.id
                    }" alt="User logo" class="rounded-circle">
                  </span>
                  <span class="username fw-bold">${post.user.userName}</span>
                  <span class="text-muted fs-6 ms-2">${new Date(
                    post.dateTimeCreation
                  ).toLocaleString()}</span>
                </div>

                <div class="settings-menu">
                  <span class="dots">⋮</span>
                </div>

              </div>

              <div class="mb-1">
                <span class="fs-5 fw-bold">${post.title}</span>
              </div>

              <div class="mb-3">
                <span class="text-muted">${post.description}</span>
              </div>

              <div class="d-flex mb-3">
                <span class="badge text-dark me-2 rounded-pill category-color">${
                  post.category.name
                }</span>
              </div>
              
              <div class="d-flex justify-content-start pb-3">
                <span class="me-3"><img src="icons/like_icon.svg" alt="Like Icon"> ${
                  post.likes
                } Like</span>
                <span><img src="icons/comment_icon.svg" alt="Comments"> 0 Comments</span>
              </div>
            </div>
          </div>
        `;
    } else if (typeOfPost==="topic"){
        
        // the search is for topic
        elementTagType.textContent = post.topic.name;

        // if no query, hide the tag along the title
        if(!query){
          elementTagQuery.style.display = "none";
        }else{
          const topicStr = query.length >= 50 ? String(query).substring(0,50) + "..." : query;
          elementTagQuery.textContent = topicStr;
        }

        postElement.innerHTML = `
          <div class="d-flex">
            <div class="post-thumbnail-container">
              <img src="${
                post.imageUrl
              }" alt="Post image" class="post-thumbnail">
            </div>

            <div class="flex-grow-1 d-flex flex-column align-content-center ps-4">
              <div class="d-flex justify-content-between align-items-center mb-1 pt-3">
                <div>
                  <span class="me-1">
                    <img src="path_to_user_image/${
                      post.user.id
                    }" alt="User logo" class="rounded-circle">
                  </span>
                  <span class="username fw-bold">${post.user.userName}</span>
                  <span class="text-muted fs-6 ms-2">${new Date(
                    post.dateTimeCreation
                  ).toLocaleString()}</span>
                </div>

                <div class="settings-menu">
                  <span class="dots">⋮</span>
                </div>

              </div>

              <div class="mb-1">
                <span class="fs-5 fw-bold">${post.title}</span>
              </div>

              <div class="mb-3">
                <span class="text-muted">${post.description}</span>
              </div>

              <div class="d-flex mb-3">
                <span class="badge text-dark me-2 rounded-pill topic-category-color">${
                  post.topic.name
                }</span>
              </div>
              
              <div class="d-flex justify-content-start pb-3">
                <span class="me-3"><img src="icons/like_icon.svg" alt="Like Icon"> ${
                  post.likes
                } Like</span>
                <span><img src="icons/comment_icon.svg" alt="Comments"> 0 Comments</span>
              </div>
            </div>
          </div>
        `;
    } else {
      
      postElement.innerHTML = `
        <div class="d-flex">
          <div class="post-thumbnail-container">
            <img src="${
              post.imageUrl
            }" alt="Post image" class="post-thumbnail">
          </div>

          <div class="flex-grow-1 d-flex flex-column align-content-center ps-4">
            <div class="d-flex justify-content-between align-items-center mb-1 pt-3">
              <div>
                <span class="me-1">
                  <img src="path_to_user_image/${
                    post.user.id
                  }" alt="User logo" class="rounded-circle">
                </span>
                <span class="username fw-bold">${post.user.userName}</span>
                <span class="text-muted fs-6 ms-2">${new Date(
                  post.dateTimeCreation
                ).toLocaleString()}</span>
              </div>

              <div class="settings-menu">
                <span class="dots">⋮</span>
              </div>

            </div>

            <div class="mb-1">
              <span class="fs-5 fw-bold">${post.title}</span>
            </div>

            <div class="mb-3">
              <span class="text-muted">${post.description}</span>
            </div>
            
            <div class="d-flex justify-content-start pb-3">
              <span class="me-3"><img src="icons/like_icon.svg" alt="Like Icon"> ${
                post.likes
              } Like</span>
              <span><img src="icons/comment_icon.svg" alt="Comments"> 0 Comments</span>
            </div>
          </div>
        </div>
      `;
    }

    postContainerWrapper.appendChild(postElement);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const postQueryString = window.location.search;
  const postUrlParams = new URLSearchParams(postQueryString);

  let categoryId = postUrlParams.get("category_id");
  let topicId = postUrlParams.get("topic_id");
  let query = postUrlParams.get("query");
  
  try {
    let apiUrl = "";
    let typeOfPost = "";
    
    if (categoryId) {

        if(!query)
          apiUrl = `http://localhost:8080/public/api/post/search/category/${parseInt(categoryId)}`;
        else
          apiUrl = `http://localhost:8080/public/api/post/search/category/${parseInt(categoryId)}/term?query=${encodeURIComponent(query)}`;
        
        typeOfPost = "category";

      } else if (topicId) {
        
        if(!query)
          apiUrl = `http://localhost:8080/public/api/post/search/topic/${parseInt(topicId)}`;
        else
          apiUrl = `http://localhost:8080/public/api/post/search/topic/${parseInt(topicId)}/term?query=${encodeURIComponent(query)}`;
        
        typeOfPost = "topic";
        
      } else if (!categoryId && !topicId){
        apiUrl = `http://localhost:8080/public/api/post/search/term?query=${encodeURIComponent(query)}`

      } else {
        return; 
      }
  
      const response = await fetch(apiUrl, { method: "GET" });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: HTTP Status ${response.status}`);
      }
  
      const posts = await response.json();
      listPosts(posts, typeOfPost, query);
  
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  });