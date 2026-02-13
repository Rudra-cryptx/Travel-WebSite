const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeBtn = document.getElementById("closeBtn");

loginBtn.addEventListener("click", () => {
    loginModal.style.display = "flex";
    document.body.classList.add("blur_effect");
});

closeBtn.addEventListener("click", () => {
    loginModal.style.display = "none";
    document.body.classList.remove("blur_effect");
});

// Close when clicking outside
window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = "none";
        document.body.classList.remove("blur_effect");
    }
});
