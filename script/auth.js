// isAuthenticated() checks if a user is authenticated by verifying the existence and validity of a JSON Web Token (JWT) stored in local storage. It returns the token if it's valid, otherwise it returns undefined (not explicitly false, but the function will return undefined due to the early return).
function isAuthenticated(){

    const token = window.localStorage.getItem(_USERTOKEN);          // Retrieve usertoken from the browser's local storage and assigns it to the token variable.
    
    const expired = isTokenExpired(token);                          // Check the token's expiry 
    
    if(expired)                                                     // If expired, return (false)
        return;

    return token;                                                   // Else return token (usertoken)
}

// Function to check if the token has expired
function isTokenExpired(token) {                                    

    if (!token) return true;                                        // Return true if token passed in is undefined 

    const payload = JSON.parse(atob(token.split('.')[1]));          // Decode the JWT token (a base64-encoded JSON payload)

    const expirationTime = payload.exp;                             // Get the expiration time from the token payload

    const currentTime = Math.floor(Date.now() / 1000);              // Current time in seconds

    return expirationTime < currentTime;                            // Return true ONLY when currentTime is LESS THAN token's expirationTime
}

// decodeUser that takes a token as input. It splits the token into an array using the dot (.) as the separator. It then decodes the second part of the array using the atob function, which decodes a Base64-encoded string. The decoded string is parsed as JSON using JSON.parse. The function extracts the email, username, and role properties from the decoded token and returns them as an object.
function decodeUser(token){                                         
    
    // !! Extract authenticated user's email from the token
    const arrToken = token.split(".");                              
    const decodedToken = JSON.parse(window.atob(arrToken[1]));
    const email = decodedToken.sub;
    const roles = decodedToken.roles;
    return {email: email, roles: roles};
}

// ?? async / await
// ?? Async functions return results wrapped in a resolved Promise; for any errors, a 'rejected' Promise is returned 
// ?? In an async function, await pauses execution for the function until a Promise is resolved/rejected. 

// Funtion to login
async function login(login = {}){
    
    if(Object.entries(login).length === 0)                                               // Return if the object is empty
        return;

    // !! Try/catch block (exception handling) to send data to login enpoint
    try {

        const response = await fetch(_PUBLIC_ENDPOINT_LOGIN, {                                 // Perform an async POST request to process the form data
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(login)
        });
        
        if(response.ok){                                                                    // If response is ok

            const result = await response.json();
            const token = result.token;                                                   
            const user = decodeUser(token);                                                 // decode the token for the role 
            
            window.localStorage.setItem(_USERTOKEN, token);                                 // Store the string in localStorage with the key 'usertoken'
            
            console.log(user);

            const adminStatus = user.roles.some(role => role.authority === 'ADMIN');        // !! Find "ADMIN" authority from token's roles
            
            if(adminStatus)                                                                 // !! This example only look for "ADMIN" authority
                window.location = _ADMIN_URL;                                               // Redirect the user to adminpage
            else                                                                            // !! Other authority will be deemed as user
                window.location = _HOME_URL;                                               // Redirect the user to homepage

        }
        
        return;                                                                             // Else return false

    } catch (error) {
        /* console.log("Exception error gotten is: ", error.message); */
        return;
    }
    
}

// Function to logout
// logout() is used in navcontroller.js
function logout(){
    window.localStorage.removeItem(_USERTOKEN);                                             // Store the string in localStorage with the key 'token'
    window.location = _HOME_URL;                                                            // Redirect the user to homepage
}

// Function to sign up
async function signUp(formData = {}){

    if(Object.entries(formData).length == 0)
        return;

    try {

        let data = new FormData();
        data.append("userData", JSON.stringify(formData));
        
        const request = {
            method: "POST", 
            body: data
        }; 
        
        const response = await fetch(_PUBLIC_ENDPOINT_SIGNUP, request);

        if(response.ok){
            showToast({toastElement, toastBodyElement, bgColor: "success", msg: "Sign up successful. Redirecting to home."});

            window.location = _LOGIN_URL;
        }else{

            showToast({toastElement, toastBodyElement, bgColor: "danger", msg: "Something went wrong. Please try again."});
        }

    } catch (error) {
        showToast({toastElement, toastBodyElement, bgColor: "danger", msg: "Error signing up. Please try again later."});
    }

}
