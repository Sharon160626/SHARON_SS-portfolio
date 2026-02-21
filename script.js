const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Mobile menu close on click
            const nav = document.querySelector('.nav-links');
            if (nav.classList.contains('nav-active')) {
                nav.click(); // Hacky way to close menu if clicking link inside it? Better to click burger.
                // Actually let's just remove the class
                nav.classList.remove('nav-active');
                document.querySelector('.burger').classList.remove('toggle');
                document.querySelectorAll('.nav-links li').forEach(link => {
                    link.style.animation = '';
                });
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Simple Intersection Observer for scroll animations (fade in elements)
const scrollAnimation = () => {
    const sections = document.querySelectorAll('section');

    const options = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        });
    }, options);

    sections.forEach(section => {
        // Init styles for animation
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 1s ease-out';

        observer.observe(section);
    });
}


// Initialize functions
navSlide();
smoothScroll();
// Delay animation init slightly to avoid immediate trigger on load sometimes
setTimeout(scrollAnimation, 100);

// Contact Form Submission Handling
let submitted = false;

function showConfirmation() {
    const modal = document.getElementById('confirmationModal');
    const form = document.getElementById('contactForm');

    // Show modal
    if (modal) {
        modal.style.display = 'flex';
    }

    // Reset form
    if (form) {
        form.reset();
    }

    // Reset flag
    submitted = false;
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('confirmationModal');
    const closeBtn = document.querySelector('.close-btn');
    const form = document.getElementById('contactForm');

    if (closeBtn && modal) {
        closeBtn.onclick = function () {
            modal.style.display = 'none';
        }
    }

    if (modal) {
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }

    if (form) {
        form.addEventListener('submit', () => {
            submitted = true;
        });
    }
});
