document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero h2, .hero h2 em, .hero p, .hero .cta-btn');
        heroElements.forEach(el => {
            if (el.classList.contains('hero-animated')) return;
            el.classList.add('hero-animated');
        });
    }, 100);
});