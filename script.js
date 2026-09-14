// Interactive Project Case Study Accordion Toggle
function toggleProjectDetails(btn) {
    const card = btn.closest('.app-card') || btn.closest('.project-card') || btn.closest('.xp-card');
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
        if (textSpan) textSpan.textContent = 'Hide Case Study';
    }
}

// Tab View Filtering Logic
function filterView(viewCategory, btn) {
    // Update active button state
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const sections = document.querySelectorAll('.view-section');

    if (viewCategory === 'all') {
        sections.forEach(sec => {
            sec.classList.remove('hidden-view');
        });
    } else {
        sections.forEach(sec => {
            if (sec.classList.contains(`view-${viewCategory}`)) {
                sec.classList.remove('hidden-view');
            } else {
                sec.classList.add('hidden-view');
            }
        });
    }
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

console.log("%c Designed & Built for Executive Impact by Mangal Soren ", "background: #00f3ff; color: black; padding: 8px 12px; border-radius: 4px; font-weight: bold;");
