const uploadButton = document.getElementById("hidden-upload-btn");
const imgPreviewContainer = document.getElementById("image-upload");
const reader = new FileReader();

uploadButton.addEventListener("change", showImage);

function showImage() {
    const file = uploadButton.files[0];

    if (file) {
        reader.readAsDataURL(file);

        reader.addEventListener("load", () => {
            const imgPreview = document.createElement("img");
            imgPreview.className = "img-fluid";
            imgPreview.src = reader.result
            imgPreviewContainer.append(imgPreview);       
        });
    }    
};