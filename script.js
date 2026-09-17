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
        if (textSpan) textSpan.textContent = 'INSPECT PRODUCT';
        if (icon) icon.className = 'fa-solid fa-plus';
    } else {
        drawer.classList.add('active');
        btn.classList.add('active');
        if (textSpan) textSpan.textContent = 'CLOSE INSPECTION';
        if (icon) icon.className = 'fa-solid fa-minus';
    }
}

// Real-Time IST Clock
function updateIstClock() {
    const clockEl = document.getElementById('istClock');
    if (!clockEl) return;

    const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const istTimeStr = new Intl.DateTimeFormat('en-GB', options).format(new Date());
    clockEl.innerHTML = `<i class="fa-solid fa-clock"></i> ${istTimeStr} IST`;
}
setInterval(updateIstClock, 1000);
updateIstClock();

// Testing Playground Validation Simulator
function setTestPreset(val) {
    const input = document.getElementById('qaTestInput');
    if (input) {
        input.value = val;
        testInputValidation(val);
    }
}

function testInputValidation(rawVal) {
    const box = document.getElementById('qaResultBox');
    const icon = document.getElementById('qaResultIcon');
    const status = document.getElementById('qaResultStatus');
    const detail = document.getElementById('qaResultDetail');

    if (!box || !status || !detail) return;

    const val = rawVal.trim();

    // Reset classes
    box.className = 'qa-result-box';

    if (val === '') {
        box.classList.add('neutral');
        if (icon) icon.innerHTML = '<i class="fa-solid fa-keyboard"></i>';
        status.textContent = 'AWAITING TEST INPUT...';
        detail.textContent = 'Type an amount above or click a quick scenario button to test live edge-case validations.';
        return;
    }

    // Check non-numeric / string
    if (isNaN(val)) {
        box.classList.add('error');
        if (icon) icon.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
        status.textContent = 'TYPE VIOLATION DETECTED';
        detail.textContent = `Rejected string input "${val}". Validator enforces strict numeric type checking before processing payment payloads.`;
        return;
    }

    const num = parseFloat(val);

    // Negative fee check
    if (num < 0) {
        box.classList.add('error');
        if (icon) icon.innerHTML = '<i class="fa-solid fa-ban"></i>';
        status.textContent = 'BOUNDARY VIOLATION (NEGATIVE VALUE)';
        detail.textContent = `Rejected negative fee amount (₹${num}). Financial transactions cannot accept negative integers for inspection booking.`;
        return;
    }

    // Zero fee boundary alert
    if (num === 0) {
        box.classList.add('warning');
        if (icon) icon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
        status.textContent = 'BOUNDARY ALERT: ZERO FEE LIMIT';
        detail.textContent = `₹0 fee flagged! Standard operational policy requires a non-zero fee for technician dispatch unless promo code is applied.`;
        return;
    }

    // Exceeds upper boundary limit (> 50,000)
    if (num > 50000) {
        box.classList.add('warning');
        if (icon) icon.innerHTML = '<i class="fa-solid fa-shield-cat"></i>';
        status.textContent = 'BOUNDARY ALERT: EXCEEDS OPERATIONAL LIMIT';
        detail.textContent = `Inspection fee ₹${num.toLocaleString('en-IN')} exceeds standard single-transaction cap (₹50,000). High-value booking requires manual admin approval.`;
        return;
    }

    // Valid inspection fee (1 to 50000)
    box.classList.add('valid');
    if (icon) icon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    status.textContent = 'PASSED VALIDATION & SANITIZATION';
    detail.textContent = `Inspection fee ₹${num.toLocaleString('en-IN')} passes all boundary, type, and operational limits. Ready for 60s checkout dispatch payload.`;
}

// Subtle 3D Card Tilt & Glare Effect (Max 6 degrees rotation)
function initSubtleCardTilt() {
    const cards = document.querySelectorAll('.card-minimal, .process-card, .playground-box, .research-box');
    
    cards.forEach(card => {
        // Create glare element if not existing
        if (!card.querySelector('.card-glare')) {
            const glare = document.createElement('div');
            glare.className = 'card-glare';
            card.appendChild(glare);
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt angle capped at 6 degrees
            const rotateX = ((centerY - y) / centerY) * 6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
            
            const glare = card.querySelector('.card-glare');
            if (glare) {
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.12), transparent 60%)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            card.style.transition = 'transform 0.4s ease, border-color 0.3s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
}

// Staggered Scroll Reveal Observer
function initScrollReveal() {
    const revealTargets = document.querySelectorAll('.card-minimal, .process-card, .research-box, .xp-item-minimal, .playground-box, .qa-philosophy-box');
    
    revealTargets.forEach(el => el.classList.add('fade-in-up'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealTargets.forEach(el => observer.observe(el));
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

// Mobile Dock Navigation Active Sync
function setDockActive(btn) {
    if (!btn) return;
    document.querySelectorAll('.mobile-bottom-dock .dock-item').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
}

// QR Modal Controls
function openQrModal(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('qrModal');
    if (!modal) return;
    modal.classList.add('active');
    renderQrCode();
}

function closeQrModal(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('qrModal');
    if (!modal) return;
    modal.classList.remove('active');
}

// Generate Custom Minimal High-Contrast QR Code (SVG format)
function renderQrCode() {
    const container = document.getElementById('qrCodeContainer');
    if (!container) return;
    
    if (container.children.length > 0) return;

    const portfolioUrl = "https://mangalcool222.github.io/portfolio/?ref=qr_resume";
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(portfolioUrl)}&color=050505&bgcolor=ccff00&margin=1`;

    container.innerHTML = `
        <div class="qr-canvas-wrap">
            <img src="${qrApiUrl}" alt="Mangal Soren Portfolio QR Code" class="qr-img-styled" />
            <div class="qr-center-logo">MS.</div>
        </div>
    `;
}

// Download QR Image for Resume
function downloadQrCode() {
    const portfolioUrl = "https://mangalcool222.github.io/portfolio/?ref=qr_resume";
    const qrDownloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(portfolioUrl)}&color=050505&bgcolor=ccff00&margin=2`;

    const a = document.createElement('a');
    a.href = qrDownloadUrl;
    a.download = 'Mangal_Soren_Portfolio_QR.png';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    showToast("QR Code Download Started!");
}

// Copy Portfolio URL
function copyPortfolioUrl() {
    const url = "https://mangalcool222.github.io/portfolio/?ref=qr_resume";
    navigator.clipboard.writeText(url).then(() => {
        showToast("Link Copied to Clipboard!");
    }).catch(() => {
        showToast("Copied: " + url);
    });
}

// Download vCard (.vcf) for 1-Tap Mobile Phone Contacts Sync
function downloadVCard() {
    const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:Mangal Soren
N:Soren;Mangal;;;
TITLE:Product Execution & Operations Lead
ORG:UGhar & Creatorlytics
EMAIL;TYPE=INTERNET,HOME:mangalsoren2025@dbe-du.org
TEL;TYPE=CELL,VOICE:+919771783048
URL:https://mangalcool222.github.io/portfolio/
URL;TYPE=LinkedIn:https://www.linkedin.com/in/mangal-soren-1312ba31a/
NOTE:MBA Candidate Department of Business Economics University of Delhi. Building UGhar, Kanjo, Creatorlytics & CreatiGen.
END:VCARD`;

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Mangal_Soren.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showToast("Contact vCard Downloaded! Tap to Save.");
}

// Custom Toast Notification
function showToast(message) {
    let toast = document.getElementById('portfolioToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'portfolioToast';
        toast.className = 'portfolio-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// DOM Init
window.addEventListener('DOMContentLoaded', () => {
    initSubtleCardTilt();
    initScrollReveal();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('ref') === 'qr_resume' || urlParams.get('ref') === 'qr') {
        setTimeout(() => {
            showToast("👋 Welcome via QR Code Scan! Explore Mobile App UI.");
        }, 600);
    }
});

console.log("%c MANGAL SOREN — EXECUTIVE PORTFOLIO ", "background: #ccff00; color: black; padding: 10px; font-weight: bold; border-radius: 4px;");


