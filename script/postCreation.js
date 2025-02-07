document.getElementById("create-post-form").addEventListener("submit", async (event) => {

    event.preventDefault();
    const token = isAuthenticated();
    const userToken = decodeUser(token);
    const userEmail = userToken.email;

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
        userId: userId                                         // TODO change after auth completed
    };

    const formData = new FormData();
    formData.append("postData", JSON.stringify(postData));

    if (image.files.length > 0) {
        formData.append("image", image.files[0]);
    }

    const postSuccess = await post(formData);
    console.log(formData);
})