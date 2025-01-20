// implement a try/catch block (exception handling) to send our orgotPwd data to an enpoint
async function forgotPwd(forgotPwd = {}){  
    try {
                    
        // perform a POST fetch request to process our orgotPwd data
        const response = await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(forgotPwdData)
        });

        // mock responses to work with
        // const response = mockSuccessResponse;

        if(response.ok){
            // showToast for successful submission of the forgot password
            showToast({toastElement, toastBodyElement, bgColor: "success", msg: "Reset link sent. Redirecting to home."});

            // Wait for 4 seconds
            const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
            await sleep(4000);

            // Redirect the user
            let url = "/index.html";
            window.location = url;

        }else{
            // showToast for UNsuccessful submission of the forgot password
            showToast({toastElement, toastBodyElement, bgColor: "danger", msg: "Something went wrong. Please try again."});
        }

    } catch (error) {
        /* console.log("Exception error gotten is: ", error.message); */
        // showToast for any other UNsuccessful submission of the forgot password form (all other errors)
        showToast({toastElement, toastBodyElement, bgColor: "danger", msg: "Error. Please try again later."});
    }
}