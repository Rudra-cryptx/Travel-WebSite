document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});

// --- Ultimate Touches ---



// 2. Magnetic Buttons
const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
    });
});

// 3. Smooth Page Transitions
const links = document.querySelectorAll('a[href]');
links.forEach(link => {
    link.addEventListener('click', (e) => {
        const target = link.getAttribute('href');
        if (target && target.includes('.html') && !target.startsWith('#')) {
            e.preventDefault();
            document.body.style.animation = 'fadeInPage 0.5s ease-in reverse';
            setTimeout(() => {
                window.location.href = target;
            }, 450);
        }
    });
});

// 4. Parallax Scrolling Hero
const heroGrid = document.querySelector('.hero-image-grid');
if (heroGrid) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        // Move opposite to scroll for parallax, divided by 3 to dampen speed
        heroGrid.style.transform = `translateY(${scrollPosition * 0.15}px)`;
    });
}
