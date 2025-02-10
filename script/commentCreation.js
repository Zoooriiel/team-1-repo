document.getElementById("create-comment-form").addEventListener("submit", async (event) => {
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

    const commentInput = document.getElementById("comment-input").value;

    const commentData = {
        userId: userId,
        commentBody: commentInput
    };

    const formData = new FormData();
    formData.append("commentData", JSON.stringify(commentData));
    const commentSuccess = await createComment(formData);
    
    document.getElementById("comment-input").value = "";
    location.reload();
})
