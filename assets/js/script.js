document.addEventListener('DOMContentLoaded', function() {
    var teamCarousel = new bootstrap.Carousel(document.querySelector('#teamCarousel'), {
        interval: 5000,
        wrap: true,
        touch: true
    });

    const playBtn = document.getElementById('playBtn');
    const closeBtn = document.getElementById('closeBtn');
    const videoPopup = document.getElementById('videoPopup');
    const ytVideo = document.getElementById('ytVideo');

    if (playBtn && closeBtn && videoPopup) {
        playBtn.addEventListener('click', function() {
            videoPopup.style.display = 'block';
            ytVideo.src = 'https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&controls=1'; // Replace YOUR_VIDEO_ID with the actual video ID
        });

        closeBtn.addEventListener('click', function() {
            videoPopup.style.display = 'none';
            ytVideo.src = '';
        });

        videoPopup.addEventListener('click', function(e) {
            if (e.target === videoPopup) {
                closeBtn.click();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoPopup.style.display === 'block') {
                closeBtn.click();
            }
        });
    }

    const btnMonthly = document.getElementById('btn-monthly');
    const btnYearly = document.getElementById('btn-yearly');
    const priceBasic = document.getElementById('price-basic');
    const priceExtended = document.getElementById('price-extended');
    const priceProfessional = document.getElementById('price-professional');

    const prices = {
        monthly: {
            basic: 'Free',
            extended: '11,999',
            professional: '45,999'
        },
        yearly: {
            basic: 'Free',
            extended: '89,999',
            professional: '3,99,999'
        }
    };

    function updatePrices(period) {
        priceBasic.textContent = prices[period].basic;
        priceExtended.textContent = prices[period].extended;
        priceProfessional.textContent = prices[period].professional;
    }

    btnMonthly.addEventListener('click', function() {
        btnMonthly.classList.add('active');
        btnYearly.classList.remove('active');
        updatePrices('monthly');
    });

    btnYearly.addEventListener('click', function() {
        btnYearly.classList.add('active');
        btnMonthly.classList.remove('active');
        updatePrices('yearly');
    });

    // Pricing Section Enhancements
    const pricingCards = document.querySelectorAll('.card');
    const pricingContainer = document.querySelector('.row.pricing-cards');

    pricingCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the button
            if (e.target.classList.contains('btn-purchase')) {
                return;
            }

            // Remove clicked/unclicked classes from all cards
            document.querySelectorAll('.card').forEach(c => {
                if (c !== this) {
                    c.classList.remove('clicked');
                    c.classList.add('unclicked');
                }
            });

            // Toggle clicked class on current card
            if (this.classList.contains('clicked')) {
                // If clicking the same card again, reset all cards
                document.querySelectorAll('.card').forEach(c => {
                    c.classList.remove('clicked', 'unclicked');
                });
            } else {
                // Add clicked class to current card
                this.classList.remove('unclicked');
                this.classList.add('clicked');

                // Animate checkmarks with delay
                const checkmarks = this.querySelectorAll('.checkmark');
                checkmarks.forEach((checkmark, index) => {
                    checkmark.style.animationDelay = `${index * 0.1}s`;
                });
            }
        });
    });

    // Reset cards when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.card')) {
            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('clicked', 'unclicked');
            });
        }
    });

    // Smooth price counter animation
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Price toggle animation
    function updatePricesWithAnimation(period) {
        const prices = {
            monthly: {
                basic: 'Free',
                extended: '11,999',
                professional: '45,999'
            },
            yearly: {
                basic: 'Free',
                extended: '89,999',
                professional: '3,99,999'
            }
        };

        function animatePrice(element, newPrice) {
            element.classList.add('changing');
            
            setTimeout(() => {
                if (newPrice === 'Free') {
                    element.textContent = newPrice;
                    element.classList.add('free');
                } else {
                    element.textContent = newPrice;
                    element.classList.remove('free');
                }
                element.classList.remove('changing');
            }, 200);
        }

        // Update prices with animation
        const elements = {
            basic: document.getElementById('price-basic'),
            extended: document.getElementById('price-extended'),
            professional: document.getElementById('price-professional')
        };

        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                animatePrice(elements[key], prices[period][key]);
            }
        });
    }

    // Update click handlers
    btnMonthly.addEventListener('click', function() {
        btnMonthly.classList.add('active');
        btnYearly.classList.remove('active');
        updatePricesWithAnimation('monthly');
    });

    btnYearly.addEventListener('click', function() {
        btnYearly.classList.add('active');
        btnMonthly.classList.remove('active');
        updatePricesWithAnimation('yearly');
    });

    // Add card index for staggered animations
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });

    // Initialize featured card state on load
    const featuredCard = document.querySelector('.card.featured');
    if (featuredCard) {
        // Add animation class after a small delay for smooth entrance
        setTimeout(() => {
            featuredCard.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            featuredCard.classList.add('active');
            
            // Animate checkmarks
            const listItems = featuredCard.querySelectorAll('.list-unstyled li');
            listItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
            });
        }, 300);
    }

    // Counter Animation
    function animateCounter() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the faster

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    }

    // Trigger counter animation when section is in view
    const counterSection = document.querySelector('.counter-section');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateCounter();
                animated = true;
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counterSection);

    // Initialize the carousel with custom settings
    const testimonialCarousel = new bootstrap.Carousel(document.getElementById('testimonialCarousel'), {
        interval: 5000,
        wrap: true,
        keyboard: true,
        pause: 'hover',
        touch: true
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            testimonialCarousel.prev();
        }
        if (e.key === 'ArrowRight') {
            testimonialCarousel.next();
        }
    });

    // Add smooth transition effect
    const controls = document.querySelectorAll('.carousel-control-prev, .carousel-control-next');
    
    controls.forEach(control => {
        control.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        control.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        control.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Add fade effect to content
    document.querySelectorAll('.carousel-item').forEach(item => {
        item.addEventListener('transitionend', function() {
            if (this.classList.contains('active')) {
                this.querySelector('.testimonial-content').style.opacity = '1';
            } else {
                this.querySelector('.testimonial-content').style.opacity = '0';
            }
        });
    });

    // Accordion functionality
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    // Close all other accordion items when opening a new one
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isCollapsed = this.classList.contains('collapsed');
            
            // Close all other items
            accordionButtons.forEach(otherButton => {
                if (otherButton !== this) {
                    otherButton.classList.add('collapsed');
                    otherButton.setAttribute('aria-expanded', 'false');
                    const otherContent = document.querySelector(otherButton.dataset.bsTarget);
                    if (otherContent) {
                        otherContent.classList.remove('show');
                    }
                    const otherIcon = otherButton.querySelector('i');
                    if (otherIcon) {
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Toggle current item
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = isCollapsed ? 'rotate(90deg)' : 'rotate(0deg)';
            }
            
            // Smooth height transition
            const content = document.querySelector(this.dataset.bsTarget);
            if (content) {
                content.style.maxHeight = isCollapsed ? `${content.scrollHeight}px` : '0';
            }
        });
    });

    // Email icon hover effect
    const boundary = document.querySelector('.boundary');
    if (boundary) {
        boundary.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        boundary.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});


window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");

    if (window.scrollY > 60) {
        navbar.classList.add("navbar-change");
    } else {
        navbar.classList.remove("navbar-change");
    }
});

function toggleVisibility() {
    let toggler = document.querySelector(".toggler");
    if (window.scrollY < 100) {
        toggler.style.display = "none";
    } else {
        toggler.style.display = "block";
    }
}


document.addEventListener("DOMContentLoaded", toggleVisibility);

window.addEventListener("scroll", toggleVisibility);
