// ============================================
// MOBILE MENU TOGGLE
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ============================================
// SMOOTH SCROLL OFFSET FOR FIXED NAVBAR
// ============================================

const scrollToSection = (event) => {
    const href = event.currentTarget.getAttribute('href');
    if (href.startsWith('#')) {
        event.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = element.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
};

// Apply to all navigation links
navLinks.forEach(link => {
    link.addEventListener('click', scrollToSection);
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(2, 6, 23, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.1)';
    } else {
        navbar.style.background = 'rgba(2, 6, 23, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and steps
const cardsAndSteps = document.querySelectorAll(
    '.service-card, .portfolio-card, .process-step, .feature-item'
);

cardsAndSteps.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.animationDelay = `${index * 0.1}s`;
    observer.observe(element);
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        // Get form values
        const name = inputs[0].value;
        const email = inputs[1].value;
        const message = inputs[2].value;

        // Validate form
        if (!name.trim() || !email.trim() || !message.trim()) {
            alert('Please fill in all fields');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Show success message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = '✓ Message Sent!';
        submitButton.style.background = 'linear-gradient(135deg, #10B981, #34D399)';

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
        }, 3000);

        // Here you would typically send the data to a server
        console.log('Form submitted:', { name, email, message });
    });
}

// ============================================
// SMOOTH ANIMATIONS ON PAGE LOAD
// ============================================

window.addEventListener('load', () => {
    // Animate hero content if not already done
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

// ============================================
// ACTIVE NAV LINK INDICATOR
// ============================================

const updateActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#3B82F6';
        } else {
            link.style.color = '';
        }
    });
};

window.addEventListener('scroll', updateActiveNav);

// ============================================
// PARALLAX EFFECT ON HERO
// ============================================

const heroGradient = document.querySelector('.hero-gradient');

if (heroGradient) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            heroGradient.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
}

// ============================================
// ADD RIPPLE EFFECT TO BUTTONS
// ============================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// PRELOAD ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to body
    document.body.style.animation = 'fadeIn 0.5s ease';
});

// ============================================
// UTILITY: Debounce function for scroll events
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// LAZY LOAD IMAGES (if any are added)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// CUSTOM SCROLLBAR
// ============================================

// Create animation for scrollbar effect
const createScrollIndicator = () => {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.id = 'scroll-indicator';
    scrollIndicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, #3B82F6, #7C3AED);
        z-index: 999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollIndicator.style.width = scrolled + '%';
    });
};

createScrollIndicator();

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Use requestAnimationFrame for smooth animations
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveNav();
            ticking = false;
        });
        ticking = true;
    }
});
