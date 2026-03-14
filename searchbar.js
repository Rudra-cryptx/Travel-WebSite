document.addEventListener("DOMContentLoaded", function() {

    const searchInput = document.getElementById("searchbarinput");
    const customPlaceholder = document.getElementById("custom-placeholder");
    const typedText = document.getElementById("typed-text");

    const words = [
        "Vietnam tours",
        "Europe packages",
        "Honeymoon trips",
        "Beach vacations"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Hide placeholder when input has text
    if (searchInput && customPlaceholder) {
        searchInput.addEventListener("input", function() {
            if (searchInput.value.length > 0) {
                customPlaceholder.style.display = "none";
            } else {
                customPlaceholder.style.display = "flex";
            }
        });
    }

    function typeEffect() {
        if (!typedText) return; // Guard clause if elements are missing
        
        const currentWord = words[wordIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typedText.textContent = currentWord.substring(0, charIndex);

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