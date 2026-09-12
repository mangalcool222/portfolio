// DOM Elements
const sections = document.querySelectorAll('.fade-in-up');
const nav = document.querySelector('nav');

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Dynamic Navbar Transparency
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(5, 5, 5, 0.9)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
    }
});

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Interactive Project Case Study Accordion Toggle
function toggleProjectDetails(btn) {
    const card = btn.closest('.project-card') || btn.closest('.xp-card');
    if (!card) return;
    const collapsible = card.querySelector('.project-details-collapsible');
    if (!collapsible) return;

    const isActive = collapsible.classList.contains('active');
    if (isActive) {
        collapsible.classList.remove('active');
        btn.classList.remove('active');
        const textSpan = btn.querySelector('.btn-text');
        if (textSpan) textSpan.textContent = 'View Full Case Study';
    } else {
        collapsible.classList.add('active');
        btn.classList.add('active');
        const textSpan = btn.querySelector('.btn-text');
        if (textSpan) textSpan.textContent = 'Hide Details';
    }
}

console.log("%c Designed & Built by Mangal Soren ", "background: #bd00ff; color: white; padding: 10px; border-radius: 5px; font-weight: bold;");
