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

// Console Tab Switcher Logic (UGhar, Kanjo, Creatorlytics)
function switchConsoleTab(consoleId, btn) {
    if (btn) {
        document.querySelectorAll('.sandbox-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    const ugharPanel = document.getElementById('ugharConsolePanel');
    const kanjoPanel = document.getElementById('kanjoConsolePanel');
    const creatorlyticsPanel = document.getElementById('creatorlyticsConsolePanel');

    if (ugharPanel) ugharPanel.style.display = consoleId === 'ughar' ? 'flex' : 'none';
    if (kanjoPanel) kanjoPanel.style.display = consoleId === 'kanjo' ? 'flex' : 'none';
    if (creatorlyticsPanel) creatorlyticsPanel.style.display = consoleId === 'creatorlytics' ? 'flex' : 'none';
}

// UGhar Visual Console Interaction Logic
let currentConsoleServiceFee = '99';
let currentConsoleSector = 'Bistupur Hub';

function selectConsoleService(cardBtn, serviceName, fee) {
    if (!cardBtn) return;
    document.querySelectorAll('.visual-service-card').forEach(c => c.classList.remove('active'));
    cardBtn.classList.add('active');
    currentConsoleServiceFee = fee;
    
    const feeEl = document.getElementById('dispatchFeeText');
    if (feeEl) feeEl.textContent = `₹${fee}`;
}

function selectSector(pillBtn, sectorName) {
    if (!pillBtn) return;
    document.querySelectorAll('.sector-pill').forEach(p => p.classList.remove('active'));
    pillBtn.classList.add('active');
    currentConsoleSector = sectorName;
    
    const sectorEl = document.getElementById('selectedSectorName');
    if (sectorEl) sectorEl.textContent = sectorName;
}

function triggerUGharDispatch() {
    const pingWrap = document.getElementById('radarPingWrap');
    const techCard = document.getElementById('techAssignmentCard');
    const otpEl = document.getElementById('dispatchOtpCode');

    if (!pingWrap || !techCard) return;

    // Show animated radar pulse
    pingWrap.style.display = 'flex';
    techCard.style.display = 'none';

    setTimeout(() => {
        pingWrap.style.display = 'none';
        techCard.style.display = 'flex';
        if (otpEl) {
            otpEl.textContent = Math.floor(1000 + Math.random() * 9000);
        }
    }, 700);
}

// Kanjo Mood Filtering Logic
const animeMoodData = {
    chill: [
        { title: "Frieren: Beyond Journey's End", score: "98% INTENT MATCH", year: "2021 • 12 EPS", tag: "Deep, calm reflection on time, memory, and post-adventure nostalgia.", tags: ["Healing", "Atmospheric", "Peaceful"] },
        { title: "Bocchi the Rock!", score: "95% INTENT MATCH", year: "2022 • 12 EPS", tag: "Relatable introverted humor with cozy musical bonding energy.", tags: ["Cozy", "Music", "Comedy"] }
    ],
    thrill: [
        { title: "Attack on Titan", score: "99% INTENT MATCH", year: "2013-2023 • 89 EPS", tag: "High-stakes survival, intense plot twists, and adrenaline action.", tags: ["Action", "Survival", "High Stakes"] },
        { title: "Solo Leveling", score: "96% INTENT MATCH", year: "2024 • 12 EPS", tag: "Pure power-scaling progression and intense combat sequences.", tags: ["Action", "Overpowered", "Hype"] }
    ],
    mystery: [
        { title: "Steins;Gate", score: "99% INTENT MATCH", year: "2011 • 24 EPS", tag: "Mind-bending time travel thriller with tight cause-and-effect logic.", tags: ["Sci-Fi", "Time Travel", "Thriller"] },
        { title: "Monster", score: "97% INTENT MATCH", year: "2004 • 74 EPS", tag: "Dark psychological cat-and-mouse mystery set in post-Cold War Europe.", tags: ["Psychological", "Noir", "Suspense"] }
    ],
    emotional: [
        { title: "Your Lie in April", score: "98% INTENT MATCH", year: "2014 • 22 EPS", tag: "Bittersweet musical story about love, loss, and artistic healing.", tags: ["Romance", "Music", "Tearjerker"] },
        { title: "Violet Evergarden", score: "96% INTENT MATCH", year: "2018 • 13 EPS", tag: "Visually stunning journey of understanding human emotions through letters.", tags: ["Drama", "Beautiful", "Emotional"] }
    ]
};

function filterKanjoMood(pillBtn, moodKey) {
    if (!pillBtn) return;
    document.querySelectorAll('.mood-pill').forEach(p => p.classList.remove('active'));
    pillBtn.classList.add('active');

    const streamGrid = document.getElementById('kanjoStreamGrid');
    if (!streamGrid || !animeMoodData[moodKey]) return;

    const items = animeMoodData[moodKey];
    streamGrid.innerHTML = items.map(item => `
        <div class="kanjo-card-item">
            <div class="kanjo-card-top">
                <span class="match-score-badge">${item.score}</span>
                <span class="anime-year">${item.year}</span>
            </div>
            <h4 class="anime-card-title">${item.title}</h4>
            <p class="anime-card-tagline">${item.tag}</p>
            <div class="anime-tag-list">
                ${item.tags.map(t => `<span>${t}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// Creatorlytics CRM Stage Toggle Logic
let dealStage1Won = true;
let dealStage2Won = false;

function toggleDealStage(dealId) {
    if (dealId === 1) {
        dealStage1Won = !dealStage1Won;
        const badge = document.getElementById('dealStageBadge1');
        if (badge) {
            badge.className = dealStage1Won ? 'stage-pill stage-won' : 'stage-pill stage-pending';
            badge.textContent = dealStage1Won ? 'CLOSED & PAID' : 'IN NEGOTIATION';
        }
    } else if (dealId === 2) {
        dealStage2Won = !dealStage2Won;
        const badge = document.getElementById('dealStageBadge2');
        if (badge) {
            badge.className = dealStage2Won ? 'stage-pill stage-won' : 'stage-pill stage-pending';
            badge.textContent = dealStage2Won ? 'CLOSED & PAID' : 'IN NEGOTIATION';
        }
    }
    updateCrmTotals();
}

function updateCrmTotals() {
    let total = 0;
    if (dealStage1Won) total += 75000;
    if (dealStage2Won) total += 25000;
    if (!dealStage1Won && !dealStage2Won) total = 0;

    const totalEl = document.getElementById('crmTotalRevenue');
    const cutEl = document.getElementById('crmPlatformCut');
    const payoutEl = document.getElementById('crmNetPayout');

    const cut = Math.round(total * 0.10);
    const payout = total - cut;

    if (totalEl) totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
    if (cutEl) cutEl.textContent = `₹${cut.toLocaleString('en-IN')}`;
    if (payoutEl) payoutEl.textContent = `₹${payout.toLocaleString('en-IN')}`;
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

// Download High-Resolution Branded Executive QR Card PNG for Resume
function downloadQrCode() {
    showToast("Generating Executive QR Card PNG...");

    const portfolioUrl = "https://mangalcool222.github.io/portfolio/?ref=qr_resume";
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(portfolioUrl)}&color=050505&bgcolor=ccff00&margin=1`;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = 1000;
        canvas.width = size;
        canvas.height = size;

        // Dark Luxury Card Background (#090a0b)
        ctx.fillStyle = "#090a0b";
        ctx.fillRect(0, 0, size, size);

        // Outer Neon Volt Accent Border (#ccff00)
        ctx.strokeStyle = "#ccff00";
        ctx.lineWidth = 12;
        ctx.strokeRect(35, 35, size - 70, size - 70);

        // Header Title: MANGAL SOREN
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 48px 'Space Grotesk', -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("MANGAL SOREN", size / 2, 115);

        // Header Subtitle: PRODUCT & OPERATIONS
        ctx.fillStyle = "#ccff00";
        ctx.font = "bold 22px 'Space Grotesk', -apple-system, sans-serif";
        ctx.fillText("PRODUCT EXECUTION & OPERATIONS • DU MBA", size / 2, 160);

        // Draw QR Code Background Box (Volt)
        const qrSize = 540;
        const qrX = (size - qrSize) / 2;
        const qrY = 210;

        ctx.fillStyle = "#ccff00";
        ctx.fillRect(qrX - 16, qrY - 16, qrSize + 32, qrSize + 32);

        // Draw High-Res QR Code Image
        ctx.drawImage(img, qrX, qrY, qrSize, qrSize);

        // Center MS. Logo Badge Box
        const logoWidth = 110;
        const logoHeight = 60;
        const logoX = (size - logoWidth) / 2;
        const logoY = qrY + (qrSize - logoHeight) / 2;

        ctx.fillStyle = "#050505";
        ctx.fillRect(logoX, logoY, logoWidth, logoHeight);

        ctx.strokeStyle = "#ccff00";
        ctx.lineWidth = 5;
        ctx.strokeRect(logoX, logoY, logoWidth, logoHeight);

        ctx.fillStyle = "#ccff00";
        ctx.font = "bold 32px 'Space Grotesk', sans-serif";
        ctx.fillText("MS.", size / 2, logoY + 42);

        // Footer Instructions
        ctx.fillStyle = "#8e929a";
        ctx.font = "600 22px 'Space Grotesk', -apple-system, sans-serif";
        ctx.fillText("SCAN WITH ANY PHONE CAMERA TO CONNECT", size / 2, 850);

        ctx.fillStyle = "#ccff00";
        ctx.font = "bold 26px 'Space Grotesk', -apple-system, sans-serif";
        ctx.fillText("https://mangalcool222.github.io/portfolio/", size / 2, 895);

        // Convert canvas to blob & trigger direct download
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.download = 'Mangal_Soren_Executive_QR.png';
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showToast("✨ Executive QR Card Saved to Downloads!");
        }, 'image/png');
    };

    img.onerror = () => {
        // Fallback direct link if cross-origin image fails
        window.open(qrApiUrl, '_blank');
    };

    img.src = qrApiUrl;
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


