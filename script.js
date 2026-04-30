const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = toggleBtn.querySelector('i');
toggleBtn.addEventListener('click', () => {
    const isLight = body.classList.toggle('light-mode');
    icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    if (icon) icon.className = 'fas fa-sun';
}
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    dot.style.transform = `translate(${posX - 4}px, ${posY - 4}px)`;
    outline.animate({
        transform: `translate(${posX - 20}px, ${posY - 20}px)`
    }, { duration: 300, fill: "forwards" });
});
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
document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed('#test-typing', {
        strings: ['Web Designer', 'Frontend Developer', 'UI/UX Creator'],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        loop: true
    });
});
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.addEventListener("DOMContentLoaded", () => {
    const skillsSection = document.getElementById('skills');
    const skillPercents = document.querySelectorAll('.skill-percent');
    const progressBars = document.querySelectorAll('.progress-bar');
    function animateCount(element, target) {
        let current = 0;
        const duration = 2000; 
        const startTime = performance.now();
        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            current = Math.floor(easeOutProgress * target);
            element.textContent = `${current}%`;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = `${target}%`; 
            }
        }
        requestAnimationFrame(step);
    }
    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillPercents.forEach(percentSpan => {
                    const target = parseInt(percentSpan.getAttribute('data-target'));
                    animateCount(percentSpan, target);
                });
                progressBars.forEach(bar => {
                    const targetPercent = bar.getAttribute('aria-valuenow');
                    bar.style.width = `${targetPercent}%`;
                });
                observer.unobserve(entry.target);
            }
        });
    };
    const options = {
        root: null,
        threshold: 0.2 
    };
    const observer = new IntersectionObserver(animateSkills, options);
    observer.observe(skillsSection);
});
window.onload = () => {
    const preloader = document.getElementById('preloader');
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
AOS.init({
    duration: 800,
    once: true
});
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 200,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: false
});
sr.reveal('.reveal-header', {
    origin: 'top',
    distance: '30px'
});
sr.reveal('.reveal-card', {
    interval: 150,
    scale: 0.9,
    opacity: 0
});
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".info-section .col-lg-7 > *", {
        scrollTrigger: {
            trigger: ".info-section",
            start: "top 85%", 
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: -50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });
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
                    start: "top 95%", 
                },
                snap: { innerText: 1 },
                onUpdate: function () {
                    stat.innerHTML = Math.floor(this.targets()[0].innerText) + symbol;
                }
            }
        );
    });
    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const skillsSection = document.querySelector("#skills");
    const skillItems = document.querySelectorAll(".skill-item");
    const startAnimations = () => {
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add("animate");
                const bar = item.querySelector(".progress-bar");
                const percentText = item.querySelector(".skill-percent");
                const target = percentText.getAttribute("data-target");
                bar.style.width = target + "%";
                let current = 0;
                const interval = setInterval(() => {
                    if (current >= target) {
                        clearInterval(interval);
                    } else {
                        current++;
                        percentText.innerText = current + "%";
                    }
                }, 15);
            }, index * 200);
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
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Button active class
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const filterValue = button.getAttribute("data-filter");
            portfolioItems.forEach(item => {
                item.style.animation = 'none';
                item.style.opacity = '0';
                item.offsetHeight;
                setTimeout(() => {
                    if (filterValue === "all" || item.classList.contains(filterValue)) {
                        item.classList.remove("hide");
                        item.style.display = "block";
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
    document.querySelectorAll('.reveal-zoom').forEach((el) => {
        observer.observe(el);
    });
}); 
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const phoneNumber = "7017696376";
    const finalMessage = `*New Inquiry*%0A` +
        `*Name:* ${name}%0A` +
        `*Email:* ${email}%0A` +
        `*Subject:* ${subject}%0A` +
        `*Message:* ${message}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${finalMessage}`;
    window.open(whatsappUrl, '_blank');
});
const scrollBtn = document.getElementById("scrollToTop");
window.onscroll = function() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
});
