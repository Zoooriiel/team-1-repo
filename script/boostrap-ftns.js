// this function used contact.html and login.html
// this file is to provide custom Bootstrap form validation functionality to the application.
// bootstrap-ftns.js is used to enable Bootstrap form validation for HTML forms on the page. The file contains a script that selects forms with the class needs-validation and adds event listeners to them to check for validity on submission.

// bootstrap form validation (anonymous function)
// This code snippet enables Bootstrap form validation for all HTML forms with the class needs-validation. When a form is submitted, it checks if the form is valid. If not, it prevents the default submission behavior and stops the event propagation. Regardless of validity, it adds the was-validated class to the form, which applies Bootstrap's validation styles.
(() => {            // Anonymous function (() => { ... })(); This is an immediately invoked function expression (IIFE). It defines a function that is executed immediately after it's defined.
    'use strict'    //This line enables strict mode for the code inside the IIFE. Strict mode helps catch common coding mistakes and prevents certain actions from being taken.

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {     //This line converts the forms NodeList to an array and loops over each form using the forEach method.
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault(); // If it's not correct, stop the form from being sent If the form isn't filled out correctly, the code prevents it from being sent
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false)
    });
})();

// Toast functionality for validation or form submission
//This JavaScript function, showToast, displays a Bootstrap 5 toast notification with a customizable background color and message. It takes four parameters: toastElement, toastBodyElement, bgColor, and msg, and uses them to set the toast's appearance and content before showing it.
// this function used contact.html and login.html
function showToast({toastElement, toastBodyElement, bgColor, msg}){

    // Run BootStrap5's toast to show the activity is complete.
    const toastEl = toastElement;
    const toastBody = toastBodyElement;
    toastEl.classList.remove("bg-success");                 // The function removes any existing Bootstrap background color classes from the toastElement
    toastEl.classList.remove("bg-danger");                  // The function removes any existing Bootstrap background color classes from the toastElement
    toastEl.classList.add(`bg-${bgColor}`);     //The function adds a new Bootstrap background color class to the toastElement based on the bgColor parameter
    toastEl.classList.add("text-white");        //The function adds a "text-white" class to the toastElement to set the text color to white
    toastBody.textContent = msg;                //The function sets the text content of the toastBodyElement to the msg parameter
    const toast = new bootstrap.Toast(toastEl); //The function creates a new Bootstrap Toast instance, passing the toastElement as an argument
    toast.show();   //The function shows the toast using the show() method
    
}