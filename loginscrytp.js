document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');

    // Toggle password visibility
    togglePassword.addEventListener('click', function () {
        // Toggle the type attribute
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle the eye / eye-slash icon
        this.classList.toggle('bx-show');
        this.classList.toggle('bx-hide');
    });

    // Simple submission logic with subtle animation
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value;
        const password = passwordInput.value;
        const btn = document.querySelector('.btn-login');

        // Simple validation visualization
        if(!email || !password) {
            loginForm.classList.add('error-shake');
            setTimeout(() => {
                loginForm.classList.remove('error-shake');
            }, 500);
            return;
        }

        // Button loading state transition
        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> <span>Authenticating...</span>`;
        btn.style.opacity = '0.9';
        btn.style.pointerEvents = 'none';

        // Fake network request delay to show loading animation
        setTimeout(() => {
            btn.innerHTML = `<i class='bx bx-check'></i> <span>Success!</span>`;
            btn.style.background = 'linear-gradient(135deg, #11998e, #38ef7d)';
            btn.style.boxShadow = '0 8px 15px rgba(56, 239, 125, 0.3)';
            
            // Success handler (just reset for demo purposes)
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style = '';
                alert('Welcome aboard! Demo login successful.');
                loginForm.reset();
                // To actually login, you might do:
                // window.location.href = '/dashboard.html';
            }, 1000);
        }, 1500);
    });
});
