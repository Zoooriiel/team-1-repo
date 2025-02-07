/* the functions in this file is used in auth.js , loader.js , navcontroller.js , login.html

the auth.js file contains code related to user authentication

const.js: The auth.js file uses the constants defined in const.js, such as _USERTOKEN, to store and retrieve the user's authentication token.

NavController.js file likely uses the authentication functions defined in auth.js to control the navigation of the application based on the user's authentication status.

loader.js file may use the authentication functions defined in auth.js to load data only when the user is authenticated.

script/product-loader.js: The product-loader.js file may use the authentication functions defined in auth.js to load product data only when the user is authenticated.

Specifically, the isAuthenticated() function in auth.js is used to check if the user is authenticated before allowing them to access certain pages or data. This function uses the _USERTOKEN constant defined in const.js to retrieve the user's authentication token from local storage.
*/

// Function to authenticate the user via site's JWT token
// isAuthenticated() is used in loader.js and navcontroller.js
// isAuthenticated() checks if a user is authenticated by verifying the existence and validity of a JSON Web Token (JWT) stored in local storage. It returns the token if it's valid, otherwise it returns undefined (not explicitly false, but the function will return undefined due to the early return).
function isAuthenticated(){

    const token = window.localStorage.getItem(_USERTOKEN);          // Retrieve usertoken from the browser's local storage and assigns it to the token variable.
    
    const expired = isTokenExpired(token);                          // Check the token's expiry 
    
    if(expired)                                                     // If expired, return (false)
        return;

    return token;                                                   // Else return token (usertoken)
}

// Function to check if the token has expired
// isTokenExpired() is used in this file for isAuthenticated()
function isTokenExpired(token) {                                    

    if (!token) return true;                                        // Return true if token passed in is undefined 

    const payload = JSON.parse(atob(token.split('.')[1]));          // Decode the JWT token (a base64-encoded JSON payload)
    //This code snippet is parsing the payload of a JSON Web Token (JWT). The JWT is split into three parts by the period (.) delimiter. The second part is base64 encoded, which is then decoded using the atob() function. The decoded string is then parsed as JSON using JSON.parse(). The resulting object is assigned to the payload variable.

    const expirationTime = payload.exp;                             // Get the expiration time from the token payload

    const currentTime = Math.floor(Date.now() / 1000);              // Current time in seconds

    return expirationTime < currentTime;                            // Return true ONLY when currentTime is LESS THAN token's expirationTime
}

// function decodeUser takes a token as input, decodes it, and extracts the user's email, username, and role from it. The token is assumed to be a JSON Web Token (JWT) in a Base64-encoded format. The function returns an object with the extracted user information.
// decodeUser() is used in this file , loader.js and navcontroller.js
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
// login() used in login.html
/* This is a JavaScript function named login that simulates a login process. It takes a login object as an argument, which is expected to contain user credentials.

1. If login is empty, the function returns immediately.
2. It attempts to send a mock successful response (instead of a real API request) using Mock.getMockSuccess().
3. It waits for 2 seconds using a promise-based sleep function.
4. If the mock response is successful, it:
    -Retrieves a mock token using Mock.getToken(true).
    -Stores the token in local storage with the key _USERTOKEN.
    -Redirects the user to the homepage.
5. If any errors occur during this process, it logs the error message to the console and returns.

Note that this function is currently using mock data and is intended to be refactored to use real API endpoints and token retrieval in a production environment. */
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

// Function to register
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

        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));      // TODO: remove delay when endpoint is instated
        await sleep(2000);

        if(response.ok){
            window.location = _LOGIN_URL;
        }

    } catch (error) {
        console.log("Exception error gotten is:", error.message);
    }

}
