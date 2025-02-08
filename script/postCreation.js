document.getElementById("create-post-form").addEventListener("submit", async (event) => {
    // prevent default behaviour of submit button in html
    event.preventDefault();
    // using isAuthenticated from auth.js to retrieve token from localstorage
    const token = isAuthenticated();
    // using decodeUser from auth.js to extract email and roles from token
    const userToken = decodeUser(token);
    const userEmail = userToken.email;

    // using backend api endpoint to search for user via email
    // TODO add to const later
    const response = await fetch("http://localhost:8080/public/api/user/email?email=" + userEmail);
    const user = await response.json();

    const userId = user.id;

    const topic = document.getElementById("topic-dropdown").value;
    const category = document.getElementById("category-dropdown").value;
    const title = document.getElementById("post-title-input");
    const description = document.getElementById("description-input");
    const image = document.getElementById("hidden-upload-btn");

    const postData = {
        title: title.value,
        description: description.value,
        categoryId: Number(category),
        topicId: Number(topic),
        userId: userId 
    };

    const formData = new FormData();
    formData.append("postData", JSON.stringify(postData));

    if (image.files.length > 0) {
        formData.append("image", image.files[0]);
    }

    const postSuccess = await post(formData);
    if(postSuccess.ok) {
        const savedPost = await postSuccess.json();
        // TODO add to const later
        window.location = "viewpost.html?post_id=" + savedPost.id;
    } 
})