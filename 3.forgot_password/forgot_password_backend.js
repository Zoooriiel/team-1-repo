// use which framework???

// • Express Setup: Creates an Express server for handling API requests.
// • NodeMailer: Sets up Nodemailer for sending emails (configure with your email details in .env).
// • Environment Variables: Loads configurations like email credentials from .env.
// • POST Route /api/forgot-password:
//     ◦ Receives the user's email from the request body.
//     ◦ Validates the email.
//     ◦ Creates a unique reset token and stores it temporarly.
//     ◦ Generates a reset link containing the token.
//     ◦ Sends an email to the user with the reset link.
//     ◦ Sends a success or error response back to the front-end.
// • GET Route /api/verify-token:
// • Verifies if the token is valid.
// • POST Route /api/reset-password:
//     ◦ Resets the user's password.