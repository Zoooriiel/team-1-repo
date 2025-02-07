async function addComment(formData = {}, postId) {
    try {
        const response = await fetch(`${_ENDPOINT_CREATE_COMMENT}${postId}`, {
            method: POST,
            body: formData
        })
        
        
    } catch (error) {
        console.log("Exception error gotten is: " + error.message);
    }
    
}