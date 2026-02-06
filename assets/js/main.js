// ===================================
// Navinya Foundation - Main JavaScript
// ===================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {

    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ===================================
    // Hero Carousel
    // ===================================
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance carousel
    let carouselTimer = setInterval(nextSlide, slideInterval);

    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function () {
            currentSlide = index;
            showSlide(currentSlide);
            // Reset timer
            clearInterval(carouselTimer);
            carouselTimer = setInterval(nextSlide, slideInterval);
        });
    });

    // ===================================
    // Impact Counter Animation
    // ===================================
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(function () {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    // Intersection Observer for counter animation
    const impactNumbers = document.querySelectorAll('.impact-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.textContent === '0') {
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    impactNumbers.forEach(number => {
        observer.observe(number);
    });

    // ===================================
    // Scroll Animations (Fade In)
    // ===================================
    const fadeElements = document.querySelectorAll('.card, .section-header');

    const fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // ===================================
    // Smooth Scrolling for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===================================
    // Navbar Scroll Effect
    // ===================================
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }

        lastScroll = currentScroll;
    });

    // ===================================
    // Form Validation (Newsletter)
    // ===================================
    const newsletterForm = document.querySelector('form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            // Basic email validation
            if (email && email.includes('@')) {
                alert('Thank you for subscribing! You will receive our newsletter soon.');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // ===================================
    // Lazy Loading Images
    // ===================================
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // ===================================
    // Back to Top Button (Optional)
    // ===================================
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-green);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 999;
    `;

    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTopButton.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)';
    });

    backToTopButton.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    });

    // ===================================
    // Console Message
    // ===================================
    console.log('%cNavinya Foundation', 'color: #2C5F2D; font-size: 24px; font-weight: bold;');
    console.log('%cCreating New Beginnings 🌱', 'color: #FF6B35; font-size: 16px;');
    console.log('Website developed with ❤️ for social impact');

});
