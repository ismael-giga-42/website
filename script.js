// GIGA-42 Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 70; // Height of fixed navbar
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const company = formData.get('company');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.mission-card, .esg-card, .project-card, .news-card, .company-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Smooth scrolling for hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn[href^="#"]');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 70;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Statistics counter animation
    const stats = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/\D/g, ''));
            const suffix = stat.textContent.replace(/\d/g, '');
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + suffix;
            }, 30);
        });
    }
    
    // Trigger stats animation when mission section is visible
    const missionSection = document.querySelector('.mission');
    if (missionSection) {
        const missionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateStats();
                }
            });
        }, { threshold: 0.5 });
        
        missionObserver.observe(missionSection);
    }
});

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98) !important;
        box-shadow: 0 2px 30px rgba(0, 0, 0, 0.15) !important;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .mission-card,
    .esg-card,
    .project-card,
    .news-card,
    .company-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .mission-card.animate-in,
    .esg-card.animate-in,
    .project-card.animate-in,
    .news-card.animate-in,
    .company-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.querySelector('input[name="name"]').value,
            email: document.querySelector('input[name="email"]').value,
            company: document.querySelector('input[name="company"]').value || '',
            message: document.querySelector('textarea[name="message"]').value,
            url: window.location.href,
            webhookUrl: 'https://n8n.edbmotte.com/webhook/14760557-5bcd-4cfe-8cdc-5d107bae4062',
            executionMode: 'production'
        };
        
        try {
            const response = await fetch('https://n8n.edbmotte.com/webhook/14760557-5bcd-4cfe-8cdc-5d107bae4062', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const messageDiv = document.getElementById('formMessage');
            
            if (response.ok) {
                messageDiv.textContent = 'Thank you! Your message has been sent successfully.';
                messageDiv.style.backgroundColor = '#d4edda';
                messageDiv.style.color = '#155724';
                messageDiv.style.borderLeft = '4px solid #28a745';
                messageDiv.style.display = 'block';
                contactForm.reset();
            } else {
                messageDiv.textContent = 'There was an error sending your message. Please try again.';
                messageDiv.style.backgroundColor = '#f8d7da';
                messageDiv.style.color = '#721c24';
                messageDiv.style.borderLeft = '4px solid #f5c6cb';
                messageDiv.style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
            const messageDiv = document.getElementById('formMessage');
            messageDiv.textContent = 'There was an error sending your message. Please try again.';
            messageDiv.style.backgroundColor = '#f8d7da';
            messageDiv.style.color = '#721c24';
            messageDiv.style.borderLeft = '4px solid #f5c6cb';
            messageDiv.style.display = 'block';
        }
    });
}