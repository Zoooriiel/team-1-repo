// implement a try/catch block (exception handling) to send our sign up data to an enpoint
async function signUp(signUp = {}){  
    try {
                    
        // perform a POST fetch request to process our sign up data
        const response = await fetch("/api/auth/signup'", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(signUpData)
        });

        // mock responses to work with
        // const response = mockSuccessResponse;

        if(response.ok){
            // showToast for successful submission of the sign up form
            showToast({toastElement, toastBodyElement, bgColor: "success", msg: "Sign up successful. Redirecting to home."});

            // Wait for 4 seconds
            const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
            await sleep(4000);

            // Redirect the user
            let url = "/index.html";
            window.location = url;

        }else{
            // showToast for UNsuccessful submission of the sign up form
            showToast({toastElement, toastBodyElement, bgColor: "danger", msg: "Something went wrong. Please try again."});
        }

    } catch (error) {
        /* console.log("Exception error gotten is: ", error.message); */
        // showToast for any other UNsuccessful submission of the sign up form (all other errors)
        showToast({toastElement, toastBodyElement, bgColor: "danger", msg: "Error signing up. Please try again later."});
    }
}