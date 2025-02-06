document.getElementById("create-post-form").addEventListener("submit", async (event) => {

    event.preventDefault();

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
        userId: 1                                         // TODO change after auth completed
    }

    const formData = new FormData();
    formData.append("postData", JSON.stringify(postData));

    if (image.files.length > 0) {
        formData.append("image", image.files[0]);
    }

    const postSuccess = await post(formData);
    console.log(formData);
})