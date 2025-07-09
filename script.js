// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Dark mode toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const htmlElement = document.documentElement; // This is the <html> tag
const heroSection = document.getElementById('hero-section');
const particlesJsDiv = document.getElementById('particles-js');
const heroContentDiv = heroSection.querySelector('.hero-content'); // Get the hero content div
const navItems = document.querySelectorAll('.navbar-item'); // Get all nav items

// Function to initialize particles.js with specific colors
function initializeParticles(particleColor) {
    // Check if particles.js is already initialized
    if (window.pJSDom && window.pJSDom.length > 0) {
        // Destroy existing particles.js instance to prevent duplicates and ensure clean re-initialization
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = []; // Clear the pJSDom array
    }

    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": particleColor // Set particle color
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg", // Placeholder, not used for circle particles
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": particleColor, // Set line color
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}

// Function to set the theme and re-initialize particles
function setTheme(theme) {
    const particleColor = (theme === 'dark') ? "#ffffff" : "#000000";
    const heroContentTextColor = (theme === 'dark') ? '#ffffff' : '#212121'; // Text color for "Hi, I'm" and description

    htmlElement.classList.toggle('dark', theme === 'dark');
    sunIcon.classList.toggle('hidden', theme === 'dark');
    moonIcon.classList.toggle('hidden', theme !== 'dark');

    // Re-initialize particles with new colors (background image is handled by CSS)
    initializeParticles(particleColor);

    // Update the color of the hero-content div directly
    if (heroContentDiv) {
        heroContentDiv.style.color = heroContentTextColor;
    }

    localStorage.setItem('theme', theme); // Save preference
}

// Function to handle active navigation item
function updateActiveNavItem() {
    const currentScrollPos = window.scrollY + window.innerHeight / 2; // Check middle of viewport

    navItems.forEach(item => {
        const sectionId = item.getAttribute('data-section');
        const section = document.getElementById(sectionId);

        if (section) {
            if (currentScrollPos >= section.offsetTop && currentScrollPos < section.offsetTop + section.offsetHeight) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        }
    });
}


// Ensure DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Apply theme on initial load (after DOM is ready)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        if (htmlElement.classList.contains('dark')) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });

    // Intersection Observer for fade-in-up animation
    const fadeInUpElements = document.querySelectorAll('.fade-in-up-hidden');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger animation
                entry.target.classList.add('fade-in-up-visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each element
    fadeInUpElements.forEach(element => {
        observer.observe(element);
    });

    // Update active nav item on scroll and load
    window.addEventListener('scroll', updateActiveNavItem);
    updateActiveNavItem(); // Initial call to set active item on load
});