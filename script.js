// 1. Theme Toggle (Dark/Light)
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = toggleBtn.querySelector('i');

toggleBtn.addEventListener('click', () => {
    // Agar body mein 'light-mode' class hai, to use remove karo (dark banao)
    // Varna add karo (light banao)
    const isLight = body.classList.toggle('light-mode');

    // Icon badalne ke liye
    icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';

    // LocalStorage mein save karein
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Check local storage for theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    if (icon) icon.className = 'fas fa-sun';
}

// 2. Custom Cursor Effects
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.transform = `translate(${posX - 4}px, ${posY - 4}px)`;

    // Smooth outline follow with delay
    outline.animate({
        transform: `translate(${posX - 20}px, ${posY - 20}px)`
    }, { duration: 300, fill: "forwards" });
});

// Hover Effects for Cursor on links/buttons/cards
document.querySelectorAll('a, button, .btn, .stat-box').forEach(el => {
    el.addEventListener('mouseenter', () => {
        outline.style.transform += ' scale(2)';
        outline.style.borderColor = 'var(--accent)';
        dot.style.background = 'transparent';
    });
    el.addEventListener('mouseleave', () => {
        outline.style.transform = outline.style.transform.replace(' scale(2)', '');
        outline.style.borderColor = 'var(--cursor)';
        dot.style.background = 'var(--accent)';
    });
});

// 3. Typed.js for Dynamic Title Text
document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed('#test-typing', {
        strings: ['Web Designer', 'Frontend Developer', 'UI/UX Creator'],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        loop: true
    });
});

// 4. Scroll Reveal (Animation on Scroll)
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing after revealing once
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


document.addEventListener("DOMContentLoaded", () => {
    const skillsSection = document.getElementById('skills');
    const skillPercents = document.querySelectorAll('.skill-percent');
    const progressBars = document.querySelectorAll('.progress-bar');

    // Function to animate the numerical count
    function animateCount(element, target) {
        let current = 0;
        const duration = 2000; // ms, matches CSS transition
        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1); // Clamp to [0, 1]

            // Ease-out function for the count animation
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            current = Math.floor(easeOutProgress * target);

            element.textContent = `${current}%`;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = `${target}%`; // Ensure final number is exact
            }
        }
        requestAnimationFrame(step);
    }

    // Function to trigger animations when visible
    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate numbers
                skillPercents.forEach(percentSpan => {
                    const target = parseInt(percentSpan.getAttribute('data-target'));
                    animateCount(percentSpan, target);
                });

                // Animate progress bars
                progressBars.forEach(bar => {
                    const targetPercent = bar.getAttribute('aria-valuenow');
                    bar.style.width = `${targetPercent}%`;
                });

                // Stop observing after animating once
                observer.unobserve(entry.target);
            }
        });
    };

    // Intersection Observer Options
    const options = {
        root: null, // use viewport
        threshold: 0.2 // Trigger when 20% of section is visible
    };

    // Create the observer
    const observer = new IntersectionObserver(animateSkills, options);

    // Observe the skills section
    observer.observe(skillsSection);
});

window.onload = () => {
    const preloader = document.getElementById('preloader');

    // Content dikhane ke liye taiyar karein
    gsap.set(".hero-content, .blob-wrapper", { visibility: "visible" });

    const tl = gsap.timeline();

    tl.to(preloader, { opacity: 0, duration: 0.5, onComplete: () => preloader.remove() })
        .from(".navbar", { y: -50, opacity: 0, duration: 0.8 })
        .from(".hero-content > *", {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out"
        }, "-=0.5")
        .from(".blob-wrapper", {
            scale: 0.5,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)"
        }, "-=0.8");
};

// qualification-section js 
AOS.init({
    duration: 800,
    once: true
});


// service js 
// Configuration
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 200,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: false // Animation sirf ek baar hogi (Professional approach)
});

// Animate Header
sr.reveal('.reveal-header', {
    origin: 'top',
    distance: '30px'
});

// Animate Cards with Sequence (Stagger)
sr.reveal('.reveal-card', {
    interval: 150, // Har card 150ms ke gap par aayega
    scale: 0.9,    // Halka sa zoom-in effect
    opacity: 0
});


// info section js 
document.addEventListener("DOMContentLoaded", function () {
    // Register Plugin
    gsap.registerPlugin(ScrollTrigger);

    // 1. Text Animation (Left Side)
    gsap.from(".info-section .col-lg-7 > *", {
        scrollTrigger: {
            trigger: ".info-section",
            start: "top 85%", // Thoda late start taaki smooth dikhe
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: -50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });

    // 2. Stat Boxes Animation
    gsap.from(".stat-box", {
        scrollTrigger: {
            trigger: ".col-lg-5",
            start: "top 85%",
        },
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        clearProps: "all"
    });

    // 3. Number Counter Fix
    const stats = document.querySelectorAll('.stat-box h3');

    stats.forEach(stat => {
        const fullText = stat.innerText.trim();
        const numberOnly = parseInt(fullText.replace(/[^\d]/g, '')) || 0;
        const symbol = fullText.replace(/[0-9]/g, '');

        gsap.fromTo(stat,
            { innerText: 0 },
            {
                innerText: numberOnly,
                duration: 2,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: stat,
                    start: "top 95%", // Jab box almost pura dikh jaye tab counting shuru ho
                },
                snap: { innerText: 1 },
                onUpdate: function () {
                    stat.innerHTML = Math.floor(this.targets()[0].innerText) + symbol;
                }
            }
        );
    });

    // CRITICAL: Page reload ke baad positions refresh karne ke liye
    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });
});


// skills js 
document.addEventListener("DOMContentLoaded", function () {
    const skillsSection = document.querySelector("#skills");
    const skillItems = document.querySelectorAll(".skill-item");

    const startAnimations = () => {
        skillItems.forEach((item, index) => {
            // One-by-one delay (0.2s, 0.4s, 0.6s...)
            setTimeout(() => {
                item.classList.add("animate");

                // Progress bar animation trigger
                const bar = item.querySelector(".progress-bar");
                const percentText = item.querySelector(".skill-percent");
                const target = percentText.getAttribute("data-target");

                bar.style.width = target + "%";

                // Count-up for numbers
                let current = 0;
                const interval = setInterval(() => {
                    if (current >= target) {
                        clearInterval(interval);
                    } else {
                        current++;
                        percentText.innerText = current + "%";
                    }
                }, 15);
            }, index * 200); // 200ms ka gap har skill ke beech mein
        });
    };

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startAnimations();
            observer.unobserve(skillsSection);
        }
    }, { threshold: 0.2 });

    observer.observe(skillsSection);
});


// portfolio js 
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    // Page Load par animation trigger ho chuki hai CSS ki wajah se

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Button active class
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            portfolioItems.forEach(item => {
                // Pehle animation reset karein
                item.style.animation = 'none';
                item.style.opacity = '0';

                // Force reflow (browser ko batane ke liye ki animation reset hui hai)
                item.offsetHeight;

                setTimeout(() => {
                    if (filterValue === "all" || item.classList.contains(filterValue)) {
                        item.classList.remove("hide");
                        item.style.display = "block";
                        // Re-trigger zoomIn animation
                        item.style.animation = "zoomIn 0.5s ease forwards";
                    } else {
                        item.classList.add("hide");
                        item.style.display = "none";
                    }
                }, 10);
            });
        });
    });
});


// contact js 
document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Sabhi elements jinme humne class lagayi hai unhe observe karein
    document.querySelectorAll('.reveal-zoom').forEach((el) => {
        observer.observe(el);
    });
});


// mail js 
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Page reload hone se rokne ke liye

    // 1. Saara data variables mein store karna
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // 2. WhatsApp Number (Country code ke sath, bina '+' sign ke)
    const phoneNumber = "7017696376";

    // 3. Message format taiyar karna
    // \n ka use line break ke liye kiya gaya hai
    const finalMessage = `*New Inquiry*%0A` +
        `*Name:* ${name}%0A` +
        `*Email:* ${email}%0A` +
        `*Subject:* ${subject}%0A` +
        `*Message:* ${message}`;

    // 4. WhatsApp API URL create karna
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${finalMessage}`;

    // 5. New tab mein WhatsApp open karna
    window.open(whatsappUrl, '_blank');
});

// scroll to top js 
const scrollBtn = document.getElementById("scrollToTop");

// Jab user 100px scroll kare tab button dikhao
window.onscroll = function() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

// Click karne par upar le jane ke liye
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // Smooth scrolling effect
  });
});
