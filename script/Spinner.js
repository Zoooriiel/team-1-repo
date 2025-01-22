class Spinner {

    constructor() {
        this.element = null;
        this.spinner = null;
        this.spinnerText = null;
    }

    createSpinner(element) {
        this.element = document.getElementById(element);
        this.spinner = document.createElement("div");
        this.spinner.className = "spinner-border spinner-border-sm d-none"
        this.spinner.setAttribute("role", "status");
        this.element.prepend(this.spinner);
        
        this.spinnerText = document.createElement("span");
        this.spinnerText.innerText = ("Loading...");
        this.spinnerText.className = "sr-only";
        this.spinner.prepend(this.spinnerText);

        return;
    }

    displaySpinner(status = false){
        if(status)
            this.spinner.classList.remove("d-none");
        else
            this.spinner.classList.add("d-none");

        return;
    }
}