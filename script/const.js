// need to import into Team 1 cuz linked to auth.js
//the consts in this file is used int const used in auth.js , loader.js and navcontroller.js */

/* const used in navcontroller.js  */
// site pages' titles
const _HOME_TITLE = "home";             
const _ABOUT_TITLE = "about";
const _PRODUCTS_TITLE = "in-stock";
const _CONTACT_TITLE = "contact";
const _LOGIN_TITLE = "join/log in";
const _LOGOUT_TITLE = "logout";
const _PROFILE_TITLE = "user profile";

/* const used in auth.js , loader.js and navcontroller.js */
// correspononding site pages' links
const _HOME_URL = "index.html";             
const _ABOUT_URL = "#";
const _PRODUCTS_URL = "products.html";
const _CONTACT_URL = "contact.html";
const _SIGNUP_URL = "signup.html";
const _SIGNIN_URL = "signin.html";
const _LOGOUT_URL = "logout.html";
const _PROFILE_URL = "profile.html";

/* token name used in auth.js   */
// token name
const _USERTOKEN = "usertoken";

// endponts
const _ENDPOINT_SIGNUP = "http://localhost:5500/auth/api/signup";
const _ENDPOINT_SIGNIN = "http://localhost:5500/auth/api/signin";