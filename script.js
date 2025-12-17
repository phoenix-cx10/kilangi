
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            if (entry.target.classList.contains('testimonial-card')) {
                const stars = entry.target.querySelectorAll('.star');
                stars.forEach((star, index) => {
                    setTimeout(() => {
                        star.style.opacity = '1';
                        star.style.transform = 'scale(1)';
                    }, index * 100 + 100);
                });
            }
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    console.log('Kilangi Jewellery - E-commerce Website Loaded');
    
    const animatedElements = document.querySelectorAll(
        '.feature, .section-heading, .pill, .product-card, .scroll-card, .collection-card, .trust-item, .testimonial-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    const pills = document.querySelectorAll('.pill');
    pills.forEach(pill => {
        pill.addEventListener('click', function() {
            pills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
        });
    });

    document.querySelectorAll('.swatch').forEach(swatch => {
        swatch.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelectorAll('.swatch').forEach(s => {
                s.style.border = '2px solid transparent';
            });
            this.style.border = '2px solid var(--primary-teal)';
        });
    });

    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight * 0.5) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') !== '#') {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });

    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        searchBar.addEventListener('focus', function() {
            if (window.innerWidth > 768) {
                this.style.width = '300px';
            }
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            this.style.borderColor = 'var(--primary-teal)';
        });
        
        searchBar.addEventListener('blur', function() {
            if (window.innerWidth > 768) {
                this.style.width = '100%';
            }
            this.style.boxShadow = '';
            this.style.borderColor = 'var(--border-light)';
        });
    }





    const horizontalScrolls = document.querySelectorAll('.horizontal-scroll');
    horizontalScrolls.forEach(scroll => {
        let isDown = false;
        let startX;
        let scrollLeft;

        scroll.addEventListener('mousedown', (e) => {
            isDown = true;
            scroll.classList.add('active');
            startX = e.pageX - scroll.offsetLeft;
            scrollLeft = scroll.scrollLeft;
        });

        scroll.addEventListener('mouseleave', () => {
            isDown = false;
            scroll.classList.remove('active');
        });

        scroll.addEventListener('mouseup', () => {
            isDown = false;
            scroll.classList.remove('active');
        });

        scroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scroll.offsetLeft;
            const walk = (x - startX) * 2;
            scroll.scrollLeft = scrollLeft - walk;
        });

        scroll.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - scroll.offsetLeft;
            scrollLeft = scroll.scrollLeft;
        });

        scroll.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - scroll.offsetLeft;
            const walk = (x - startX) * 2;
            scroll.scrollLeft = scrollLeft - walk;
        });
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (searchBar && window.innerWidth <= 768) {
                searchBar.style.width = '100%';
            }
        }, 250);
    });
});