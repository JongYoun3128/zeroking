// =============================================
// ZERO KING - JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // =============================================
    // Navbar Scroll Effect
    // =============================================
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // =============================================
    // Mobile Menu Toggle
    // =============================================
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // =============================================
    // Smooth Scroll for Navigation Links
    // =============================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // =============================================
    // Scroll Animation - Intersection Observer
    // =============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                // Optional: unobserve after animation
                // animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.section-content, .section-image, .core-feature, .support-card, .contact-content'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        animateOnScroll.observe(el);
    });

    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animate-on-scroll.animate-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .core-feature.animate-on-scroll,
        .support-card.animate-on-scroll {
            transition-delay: calc(var(--index, 0) * 0.1s);
        }
    `;
    document.head.appendChild(style);

    // Add staggered animation delay to grid items
    document.querySelectorAll('.core-feature').forEach((el, index) => {
        el.style.setProperty('--index', index);
    });
    
    document.querySelectorAll('.support-card').forEach((el, index) => {
        el.style.setProperty('--index', index);
    });

    // =============================================
    // Counter Animation for Numbers
    // =============================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // =============================================
    // Parallax Effect for Hero Section
    // =============================================
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', function() {
        if (hero && heroContent) {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / heroHeight);
            }
        }
    });

    // =============================================
    // Active Navigation Link Highlight
    // =============================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);

    // Add active link style
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .nav-menu a.active {
            color: var(--primary);
        }
        .nav-menu a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(activeStyle);

    // =============================================
    // Dice Animation on Core Model Section
    // =============================================
    const diceElements = document.querySelectorAll('.dice');
    
    diceElements.forEach(dice => {
        dice.addEventListener('mouseenter', function() {
            this.style.transform = 'rotateY(180deg) scale(1.1)';
            this.style.transition = 'transform 0.5s ease';
        });
        
        dice.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0) scale(1)';
        });
    });

    // =============================================
    // Block Hover Animation
    // =============================================
    const blocks = document.querySelectorAll('.block');
    
    blocks.forEach((block, index) => {
        block.style.animationDelay = `${index * 0.1}s`;
    });

    // =============================================
    // Form Validation (if contact form exists)
    // =============================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form handling logic here
            alert('문의가 접수되었습니다. 감사합니다!');
        });
    }

    // =============================================
    // Lazy Loading Images
    // =============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    // =============================================
    // Preloader (Optional)
    // =============================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger hero animations after load
        setTimeout(() => {
            document.querySelector('.hero-content')?.classList.add('animate-visible');
        }, 300);
    });

    // =============================================
    // Console Welcome Message
    // =============================================
    console.log('%c ZERO KING ', 'background: #C91E1E; color: white; font-size: 24px; font-weight: bold; padding: 10px 20px;');
    console.log('%c 무인 스토어 프랜차이즈 ', 'color: #555; font-size: 14px;');
});

