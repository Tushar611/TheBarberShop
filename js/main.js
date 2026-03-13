document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon (optional, could change to 'X')
            if (navLinks.classList.contains('active')) {
                hamburger.innerHTML = '&#10005;'; // X icon
            } else {
                hamburger.innerHTML = '&#9776;'; // Hamburger icon
            }
        });
    }

    // Scroll Animations (IntersectionObserver)
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once faded in
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Booking Modal / Form Logic
    // If we are on book.html, check for URL parameters to auto-fill the service
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    const serviceSelect = document.getElementById('b_service');
    
    if (serviceParam && serviceSelect) {
        // Try to find the matching option
        for (let i = 0; i < serviceSelect.options.length; i++) {
            if (serviceSelect.options[i].value.toLowerCase().includes(serviceParam.toLowerCase()) || 
                serviceParam.toLowerCase().includes(serviceSelect.options[i].value.toLowerCase())) {
                serviceSelect.selectedIndex = i;
                break;
            }
        }
    }

    // Handle WhatsApp Booking Form Submission
    const bookingForm = document.getElementById('whatsappBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect Data
            const name = document.getElementById('b_name').value;
            const phone = document.getElementById('b_phone').value;
            const service = document.getElementById('b_service').value;
            const date = document.getElementById('b_date').value;
            const time = document.getElementById('b_time').value;
            
            // Format WhatsApp Message
            const message = `Hello, I would like to book an appointment.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${service}\n*Date:* ${date}\n*Time:* ${time}\n\nPlease confirm if this slot is available. Thank you!`;
            
            // WhatsApp Number
            const waNumber = '918709298368';
            
            // Redirect
            const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
        });
    }

    // Handle standard generic contact forms
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm && !contactForm.id.includes('whatsapp')) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent! We will get back to you shortly.');
            contactForm.reset();
        });
    }
});
