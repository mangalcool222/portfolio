// Case Study Accordion Toggle
function toggleCaseStudy(btn) {
    const card = btn.closest('.card-minimal') || btn.closest('.xp-item-minimal');
    if (!card) return;
    const drawer = card.querySelector('.case-study-drawer');
    if (!drawer) return;

    const isActive = drawer.classList.contains('active');
    const textSpan = btn.querySelector('span');
    const icon = btn.querySelector('i');

    if (isActive) {
        drawer.classList.remove('active');
        btn.classList.remove('active');
        if (textSpan) textSpan.textContent = 'EXPLORE CASE STUDY';
        if (icon) icon.className = 'fa-solid fa-plus';
    } else {
        drawer.classList.add('active');
        btn.classList.add('active');
        if (textSpan) textSpan.textContent = 'CLOSE CASE STUDY';
        if (icon) icon.className = 'fa-solid fa-minus';
    }
}

// Tab Filter Logic
function filterView(viewCategory, btn) {
    if (btn) {
        document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    const sections = document.querySelectorAll('.view-section');

    if (viewCategory === 'all') {
        sections.forEach(sec => sec.classList.remove('hidden-view'));
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

// Smooth scroll
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

console.log("%c MANGAL SOREN — EXECUTIVE PORTFOLIO ", "background: #ccff00; color: black; padding: 10px; font-weight: bold; border-radius: 4px;");
