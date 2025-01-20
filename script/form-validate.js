/* form validation functions for contact.html n login.html */

// Function to validate email using regex 
// function is used in contact.html n login.html
function isEmail(value){
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(value);
}

// Function to validate empty values
// function is used in contact.html n login.html
function isEmpty(value){
    let regex = new RegExp(/^(?=\s*$)/g);
    return (!value || regex.test(value));
}


// Function to validate username
function isValidUsername(value){
    // Regex to check if the username is valid
    // - The username must be between 3 and 15 characters long
    // - Only letters, numbers and underscores are allowed
    const userNameRegex = /^[a-zA-Z0-9_]{3,15}$/;
    return userNameRegex.test(value);
}

// Function to validate password
function isValidPassword(value){
    const userPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // The regex checks that the password:
    // - has at least 8 characters
    // - has at least 1 lowercase letter
    // - has at least 1 uppercase letter
    // - has at least 1 number
    // - has at least 1 special character
    return userPasswordRegex.test(value);
}

// Function only allows specific characters (as described in the regex)
function isValidMsg(value){
    const msgRegex = /^[a-zA-Z0-9\s.,!?'"-]*$/;     // reject special characters that may allow code injections scripts / sql injections
    return msgRegex.test(value);
}

