let spinner = null;

// EventListener to instantiate the navController
document.addEventListener("DOMContentLoaded", async (event) => {
    
    // Instantiate an instance of the siteMenu
    const navController = new NavController("navbarNav");
    navController.displayNav();

    // Instantiate a spinner, currently used in login.html
    spinner = new Spinner();

    // const profilePageExists = window.location.pathname.includes(_PROFILE_URL);     // If _PROFILE_URL exists
    
    const token = isAuthenticated();                                                  // Redirect the user to index.html if token does not exist
    const atLoginPageExists = window.location.pathname.includes(_LOGIN_URL);          // If _PROFILE_URL exists
    const atSignUpPageExists = window.location.pathname.includes(_SIGNUP_URL);
    const atViewPostPageExists = window.location.pathname.includes("viewpost.html");

    if(!token && !atLoginPageExists && !atSignUpPageExists)                                                  
        window.location = _LOGIN_URL;

    if (atViewPostPageExists  && !window.location.search.includes("post_id")) {
        window.location = "index.html";
    }
    
    const userToken = decodeUser(token);
    const userEmail = userToken.email;

    const profileLink = document.getElementById("profile-link");

    // TODO remove when done
    profileLink.setAttribute("href", userEmail);

    // section used for createpost.html
    const response = await fetch("http://localhost:8080/public/api/user/email?email=" + userEmail);
    const user = await response.json();

    const userName = user.userName;

    const postUsername = document.getElementById("post-username");
    const strongPostUsername = document.createElement("strong");
    strongPostUsername.innerText = userName;
    postUsername.append(strongPostUsername);

});
