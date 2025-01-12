/*
<div id="testSpinner" class="spinner-border spinner-border-sm d-none" role="status">
</div>
*/

class Spinner{

    constructor(){
        this.element = null;
        this.spinner = null;
    }

    //Creates a new spinner element and appends it to a specified HTML element.
    createSpinner(element){
        this.element = document.getElementById(element);    //Retrieves an HTML element using its ID.
        this.spinner = document.createElement("div");
        this.spinner.className = "spinner-border spinner-border-sm d-none"; //Sets the CSS class names for the spinner element.
        this.spinner.setAttribute("role", "status");    // Sets the role attribute of the spinner element to "status".
        this.element.prepend(this.spinner); //Appends the spinner element to the beginning of the specified HTML element

        return;
    }

    //function to display or hide spinner
    displaySpinner(status=false){
        if(status)
            this.spinner.classList.remove("d-none");  //If the status is true, removes the d-none CSS class from the spinner element, making it visible
        else
            this.spinner.classList.add("d-none");   //If the status is false, adds the d-none CSS class to the spinner element, making it invisible.

        return;
    }
}