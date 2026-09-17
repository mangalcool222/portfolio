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
    
    // Check if already rendered
    if (container.children.length > 0) return;

    const portfolioUrl = "https://mangalcool222.github.io/portfolio/?ref=qr_resume";
    
    // Lightweight Quick QR SVG Generator
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

// Check for QR scanner welcome parameter
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('ref') === 'qr_resume' || urlParams.get('ref') === 'qr') {
        setTimeout(() => {
            showToast("👋 Welcome via QR Code Scan! Explore Mobile App UI.");
        }, 600);
    }
});

console.log("%c MANGAL SOREN — EXECUTIVE PORTFOLIO ", "background: #ccff00; color: black; padding: 10px; font-weight: bold; border-radius: 4px;");

