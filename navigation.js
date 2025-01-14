document.querySelectorAll(".navigationButton").forEach(button => {
    button.addEventListener("click", (event) => {
        const buttonText = event.target.textContent.trim();

        // Navigate based on button text
        if (buttonText === "Home") {
            window.location.href = "index.html";
        } else if (buttonText === "Product") {
            window.location.href = "Product-Page.html";
        } else if (buttonText === "Checkout") {
            window.location.href = "Checkout-Page.html";
        } else if (buttonText === "Contact") { 
            window.location.href = "Contact-Page.html";
        }
    });
});
