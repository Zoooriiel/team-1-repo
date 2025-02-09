async function createComment(formData = {}) {
    try {
        const postId = parseInt(postUrlParams.get('post_id'));

        // TODO add to const when done
        const response = await fetch(`http://localhost:8080/public/api/comment/add/post/${postId}`, {
            method: "POST",
            body: formData
        });
        if (response.ok)
            return response;        
        
    } catch (error) {
        console.log("Exception error gotten is: " + error.message);
    }
}