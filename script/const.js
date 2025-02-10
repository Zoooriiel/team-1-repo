// need to import into Team 1 cuz linked to auth.js
//the consts in this file is used int const used in auth.js , loader.js and navcontroller.js */

/* const used in navcontroller.js  */
// site pages' titles
const _HOME_TITLE = "home";             
const _CREATEAPOST_TITLE = "create a post";
const _PROFILE_TITLE = "user profile";
const _EXPLORE_TITLE = "explore";
const _SAVED_TITLE = "saved";
const _LOGIN_TITLE = "join/log in";
const _SIGNUP_TITLE = "sign up"
const _LOGOUT_TITLE = "logout";

// corresponding site pages' links
const _HOME_URL = "index.html";             
const _CREATEAPOST_URL = "createpost.html";
const _PROFILE_URL = "profile.html";
const _EXPLORE_URL = "refinesearchpage.html";
const _SAVED_URL = "saved.html";
const _LOGIN_URL = "signin.html";
const _LOGOUT_URL = "logout.html";
const _SIGNUP_URL = "signup.html"


// site pages' icon (FONT AWESOME CLASS)
const _HOME_ICON = "fa fa-home text";           
const _CREATEAPOST_ICON = "fa fa-leaf";
const _PROFILE_ICON = "fa fa-user";
const _EXPLORE_ICON = "fa fa-search";
const _SAVED_ICON = "fa fa-bookmark";
const _LOGIN_ICON = "fa fa-sign-in-alt";
const _LOGOUT_ICON = "fa fa-sign-out-alt";

/* token name used in auth.js   */
// token name
const _USERTOKEN = "usertoken";

/* const used in auth.js   */
// endponts
const _ENDPOINT_POST = 'http://localhost:8080/public/api/post'        // TODO change back after auth complete
const _PUBLIC_ENDPOINT_TOPIC = 'http://localhost:8080/public/api/topic'
const _PUBLIC_ENDPOINT_CATEGORY = 'http://localhost:8080/public/api/category'
const _PUBLIC_ENDPOINT_SIGNUP = 'http://localhost:8080/public/api/user/signup';
const _PUBLIC_ENDPOINT_LOGIN = "http://localhost:8080/public/api/user/signin";
const _ENDPOINT_CREATE_COMMENT = "http://localhost:8080/public/api/comment/post/"
const _SITE_ENDPOINT = "http://localhost:8080/"