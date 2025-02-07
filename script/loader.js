let spinner = null;

// EventListener to instantiate the navController
document.addEventListener("DOMContentLoaded", (event) => {
    
    // Instantiate an instance of the siteMenu
    const navController = new NavController("navbarNav");
    navController.displayNav();

    // Instantiate a spinner, currently used in login.html
    spinner = new Spinner();

    const profilePageExists = window.location.pathname.includes(_PROFILE_URL);     // If _PROFILE_URL exists
    
    if(profilePageExists){                                                         // If _PROFILE_URL exists, profilePageExists = true
        const token = isAuthenticated();                                           // Redirect the user to index.html if token does not exist

        if(!token)                                                                 // Otherwise, set up and display authenticated user in the profile page
            window.location = _HOME_URL;

        const user = decodeUser(token);
        const profileEmail = document.getElementById("txtEmail");
        const profileUsername = document.getElementById("txtUsername");
        const profileRole = document.getElementById("txtUserrole");
        profileUsername.classList.add("fw-bold");
        profileEmail.innerText = user.email;
        profileUsername.innerText = user.username;
        
        if(user.role === "ADMIN")
            profileRole.innerText = user.role.charAt(0).toUpperCase() 
                                    + user.role.slice(1).toLowerCase();
    }

    // End here

});
