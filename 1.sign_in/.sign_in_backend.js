//(USE WHAT? NODE.JS EXPRESS OR SPRING BOOT???)
// Back-End (Server-Side) - Logic and Data Handling 

// create server

    //• API Endpoint:

        //◦ A route (URL path) on the server that handles the login request. This is often a POST route (e.g., /api/login or /auth/login).
    
    //• Request Handling:
        
        //◦ The server receives the request with the username/email and password.

        //◦ Extracts the username/email and password from the request body.

    //• User Authentication:

        //◦ Database Lookup: Queries the database to find a user record with the given username or email.

        //◦ Password Verification:

            //▪ Secure Password Storage: Passwords should NEVER be stored in plain text in the database. Use a strong one-way hashing algorithm with salting (e.g., bcrypt, scrypt, Argon2) to hash and store the password when the user creates their account.

            //▪ Retrieve the hashed password from the database.

           // ▪ Hash the password provided by the user with the same algorithm and salt.

            //▪ Compare the two hash results (not the plain text passwords). If they match, the password is correct.

        //◦ Error Handling: If the username/email or password does not match, the back-end should return an authentication error response to the client (e.g., with an HTTP status code of 401 Unauthorized and a helpful error message).

    //• Session Management:

        //◦ Upon successful authentication, create a user session. This can involve:

            //▪ Session ID: A unique session identifier that is stored as a cookie on the user's browser.

           // ▪ Token-based authentication: Generate a JSON Web Token (JWT) that contains user information and is signed by the server. This token is sent back to the client (often in a cookie or local storage) for future requests.

        //◦ Store session data in memory, a database, or a session store (like Redis) on the server.

    //• Response:

        //◦ Send a successful login response back to the client (e.g., HTTP status code 200 OK or 201 Created).

        //◦ Include session information (e.g., a session ID cookie, JWT token) in the response.

//Security: Always use HTTPS, hash passwords properly, and protect against common web vulnerabilities (e.g., SQL injection, cross-site scripting).