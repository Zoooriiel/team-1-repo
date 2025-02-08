async function post(formData = {}) {
    try {
        const response = await fetch (_ENDPOINT_POST, {
            method: "POST",
            body: formData
        });

    } catch(error) {
        console.log("Exception error gotten is: " + error.message);

    }
}
