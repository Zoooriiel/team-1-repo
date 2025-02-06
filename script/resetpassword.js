// implement a try/catch block (exception handling) to send our message data to an enpoint
async function resetPwd(resetPwd = {}){  
    try {
                    
        // perform a POST fetch request to process our form data
        const response = await fetch("/api/reset-password", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(resetPwdData)
        });

        // mock responses to work with
        // const response = mockSuccessResponse;

        if(response.ok){
            // showToast for successful submission of the contact form
            showToast({toastElement, toastBodyElement, bgColor: "success", msg: "Password reset. Redirecting to home."});

            // Wait for 4 seconds
            const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
            await sleep(4000);

            // Redirect the user
            var url = "/index.html";
            window.location = url;

        }else{
            // showToast for UNsuccessful submission of the contact form
            showToast({toastElement, toastBodyElement, bgColor: "danger", msg: "Something went wrong. Please try again."});
        }

    } catch (error) {
        /* console.log("Exception error gotten is: ", error.message); */
        // showToast for any other UNsuccessful submission of the contact form (all other errors)
        showToast({toastElement, toastBodyElement, bgColor: "danger", msg: "Error resetting password. Please try again later."});
    }
}    