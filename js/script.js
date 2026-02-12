'use strict';

/**
 * RoofingPros Website - main script
 * Handles mobile navigation, smooth scrolling, and form validation
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            
            // Animate hamburger to X (simplified)
            menuToggle.classList.toggle('toggle-active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
            }
        });
    });


    // --- Smooth Scrolling for Navigation Links ---
    // Only applies to internal hash links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80; // Account for sticky header
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    // --- Quote Form Handling & Validation ---
    const leadForm = document.getElementById('lead-form');

    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple validation check
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service-type').value;

            if (!name || !email || !phone || !service) {
                alert('Please fill out all required fields.');
                return;
            }

            // Basic email regex
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // UI Feedback: Button state change
            const submitBtn = leadForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Simulate API Call (Since this is a static site)
            setTimeout(() => {
                alert(`Thank you, ${name}! Your request for ${service} has been received. A RoofingPros specialist will contact you shortly.`);
                
                // Reset form
                leadForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }, 1500);
        });
    }


    // --- Intersection Observer for Fade-in Animations ---
    const observerOptions = {
        threshold: 0.1
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply basic animation styles to cards and section headers
    const animateElements = document.querySelectorAll('.service-card, .testimonial-item, .section-header');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        revealOnScroll.observe(el);
    });


    // --- Sticky Header Effect ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.padding = '15px 0';
            header.style.backgroundColor = '#ffffff';
        }
    });

});