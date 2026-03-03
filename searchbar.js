document.addEventListener("DOMContentLoaded", function() {

    const searchInput = document.getElementById("searchbarinput");

    const words = [
        "Vietnam tours",
        "Europe packages",
        "Honeymoon trips",
        "Beach vacations"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        searchInput.placeholder = "Search for " + currentWord.substring(0, charIndex);

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }

    typeEffect();
});