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
function decodeUser(token){                                         
    
    // !! Extract authenticated user's email from the token
    const arrToken = token.split(".");                              
    const decodedToken = JSON.parse(window.atob(arrToken[1]));
    const email = decodedToken.email;
    const username = decodedToken.username;
    const role = decodedToken.role;
    return {email: email, username: username, role: role};

}

// !! DONE: async / await
// !! DONE functions return results wrapped in a resolved Promise; for any errors, a 'rejected' Promise is returned 
// !! DONE: In an async function, await pauses execution for the function until a Promise is resolved/rejected. 

// Funtion to login
async function login(loginData = {}){
    
    if(Object.entries(loginData).length === 0)                                               // Return if the object is empty
        return;

    
    try {                                                                                   // !! Try/catch block (exception handling) to send data to login enpoint
        const response = await fetch(_ENDPOINT_SIGNIN, {                                     // !! DONE: API call for Authentication
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginData)
        });
      
        if(response.ok){                                                                    // If response status == 200 (ok)
            const result = await response.json();
            const token = result.token;                                                   
            const user = decodeUser(token);                                                 // decode the token for the role 
            
            window.localStorage.setItem(_USERTOKEN, token);                                 // Store the string in localStorage with the key 'usertoken'
            
            const adminStatus = user.roles.some(role => role.authority === 'ADMIN');        // !! Find "ADMIN" authority from token's roles
            
            if(adminStatus)                                                                 // !! This example only look for "ADMIN" authority
                window.location = _ADMIN_URL;                                               // Redirect the user to adminpage
            else                                                                            // !! Other authority will be deemed as user
                window.location = _HOME_URL;                                               // Redirect the user to homepage
        }
        
        return;                                                                             // Else return false

    } catch (error) {
        console.log("Exception error gotten is: ", error.message);
        return;
    }
    
}

// Function to logout
// logout() is used in navcontroller.js
function logout(){
    window.localStorage.removeItem(_USERTOKEN);                                             // Store the string in localStorage with the key 'token'
    window.location = _HOME_URL;                                                            // Redirect the user to homepage
}

// funtion to sign up
async function signUp(signUpData ={}){
    if(Object.entries(signUpData).length == 0)
        return;
    // we are sending name, email, password spring boot help us take care of CSRF cros-site reference forgery
    try{
        const response = await fetch(_ENDPOINT_SIGNUP, {
            method: "POST",
            headers:{"Content-type":"application/json"},
            body: JSON.stringify(signUpData)
        })
        if(response.ok){
            window.location=_LOGIN_URL
        }
    } catch (error){
        console.log("Exception error gotten is:", error.message)

    }
}