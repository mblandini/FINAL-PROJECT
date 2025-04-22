document.addEventListener("DOMContentLoaded", function() {
    // Get the current page's path
    const currentPage = window.location.pathname;

    // If NOT on index.html or the root ("/"), add the button
    if (!(currentPage === "/" || currentPage.endsWith("homepage.html"))) {
        const button = document.createElement("button");
        button.id = "backButton";
        button.textContent = "BACK";
        button.onclick = function() {
            window.history.back();
        };

        document.body.insertBefore(button, document.body.firstChild); // Adds button at the top
    }
});