class NavController {

    constructor(element){
        this.siteMenu = document.getElementById(element);
        this.navUL = document.createElement("ul");
        this.navLists = [
            {"title":_HOME_TITLE, "url": _HOME_URL, "icon": _HOME_ICON}, 
            {"title":_CREATEAPOST_TITLE, "url": _CREATEAPOST_URL, "icon": _CREATEAPOST_ICON}, 
            {"title":_PROFILE_TITLE, "url": _PROFILE_URL, "icon": _PROFILE_ICON}, 
            {"title":_EXPLORE_TITLE, "url": _EXPLORE_URL, "icon": _EXPLORE_ICON},
            {"title":_SAVED_TITLE, "url": _SAVED_URL, "icon": _SAVED_ICON},
            {"title":_LOGIN_TITLE,"url": _LOGIN_URL, "icon": _LOGIN_ICON},
            {"title":_LOGOUT_TITLE,"url": _LOGOUT_URL, "icon": _LOGOUT_ICON}
        ];
    }

    displayNav(){

        this.navUL.className = "navbar-nav";
        // TODO navUL class need to change afterwards
        this.siteMenu.appendChild(this.navUL);

        
         // TODO Login Logout page
        const token = isAuthenticated();                                                                        // Obtain the token of the authenticated user
        
        this.navLists.forEach((item) => {                                                                       // Populate the navUL, and done conditionally for Login or Logout
            const underLinedLink = "nav-link fw-bolder text-decoration-underline";                              // Used for links that require emphasis (join/log in, logout, useremail)
            
            switch (true) {
                case (item.title.toLowerCase() !== _LOGIN_TITLE && item.title.toLowerCase() !== _LOGOUT_TITLE):
                    this.displaynavList(item);                                                                  // Display menu items not used for authentication
                    break;
                case (!token && item.title.toLowerCase() === _LOGIN_TITLE):
                    this.displaynavList(item, underLinedLink);                                                  // Display the link to login for UNauthenticated users
                    break;
                case (token && item.title.toLowerCase() === _LOGOUT_TITLE):             
                    this.displaynavList(item, underLinedLink)                                                   // Display the link to logout for authenticated users
                    break;
                default:                                                                                        // For anything else, include statements to create additional links
                    break;
            }

            if(item === _HOME_TITLE){
                
            }

        });
        
        if(token){
            const user = decodeUser(token);
            const userItem = {"title": user.email, "url": _PROFILE_URL};
            this.displayNavProfile(userItem);
        }
        

        return;
    }
        
    displaynavList(item, underLinedLink = null){

        const navList = document.createElement("li");                                                           // Append menu item as list item
        this.navUL.appendChild(navList);               // Append navList (li) to the navUL(ul)
        navList.className = "nav-item text-nowrap"; 

        const navLink = document.createElement("a");        
        navList.appendChild(navLink);                   // append link to list item


        if(item.icon){
            const navIcon = document.createElement("i");        // <i></i>
            navIcon.className = item.icon;
            navLink.appendChild(navIcon);

            const textNode = document.createTextNode(` ${item.title.charAt(0).toUpperCase() + item.title.slice(1)}`); // Add a space and the text
            navLink.appendChild(textNode);     
        }

      
        if(underLinedLink !== null)                                                                             // Change the navLinks's class if parameter underLinedLink is NOT equals to null 
            navLink.className = underLinedLink;
        else
            navLink.className = "nav-link";

        
        if(item.title === _LOGOUT_TITLE){                                                                       // If title is 'logout', 
            navLink.href = "#";                                                                                 // Apply a placeholder anchor (#)
            navLink.addEventListener("click", (event) => {                                                      // add eventListener                                                                    
                logout();                                                                                       // call function logout()                                                                        
            })
        }else{
            navLink.href = item.url;                                                                            // Otherwise, apply item URL
        }
    }

    displayNavProfile(item){

        const navList = document.createElement("li");                                                           // Append menu item as list item
        this.navUL.appendChild(navList);               
        navList.className = "nav-item text-nowrap"; 
        
        const navLink = document.createElement("a");                                                            // Append link to menu item
        navList.appendChild(navLink);  
        navLink.className = "nav-link";
        navLink.setAttribute("data-bs-toggle", "tooltip");
        navLink.setAttribute("data-bs-title", item.title);
        
        const iconElement = document.createElement('i');                                                        // Set the ICON and the link
        iconElement.className = "fs-3 fa fa-user-circle px-3";
        navLink.appendChild(iconElement);
        navLink.href = item.url;

        const tooltipProifleLink = navLink;                                                                     // Set a new instance of the tooltip for the profile
        const tooltipProfile =  new bootstrap.Tooltip(tooltipProifleLink);
    }
}