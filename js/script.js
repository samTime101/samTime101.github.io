// Life Progress Logic
// September is month 8 (0-indexed)
const birthDate = new Date(2006, 8, 1, 0, 0, 0);
const lifespanYears = 80;
const totalLifespanMs = lifespanYears * 365.25 * 24 * 60 * 60 * 1000;

function updateLifeProgress() {
    const now = new Date();
    const ageMs = now - birthDate;
    
    // Ensure ageMs is positive
    if (ageMs < 0) return;

    const ageYears = ageMs / (365.25 * 24 * 60 * 60 * 1000);
    const progressPercent = (ageMs / totalLifespanMs) * 100;

    const percentEl = document.getElementById('life-percentage');
    const barEl = document.getElementById('life-bar');
    const ageEl = document.getElementById('life-age');

    if (percentEl) percentEl.textContent = `${progressPercent.toFixed(9)}%`;
    if (barEl) barEl.style.width = `${Math.min(100, progressPercent)}%`;
    if (ageEl) ageEl.textContent = `AGE: ${ageYears.toFixed(9)}`;
}

setInterval(updateLifeProgress, 50);
updateLifeProgress();

// Portal Animation Logic
document.addEventListener('DOMContentLoaded', () => {
    const archivesBtn = document.getElementById('archives-btn');
    const portalOverlay = document.getElementById('portal-overlay');

    if (archivesBtn && portalOverlay) {
        archivesBtn.addEventListener('click', () => {
            portalOverlay.classList.add('active');
            
            // Add a "glitchy" feel to the transition
            archivesBtn.style.pointerEvents = 'none';
            archivesBtn.textContent = 'REDIRECTING...';
            
            setTimeout(() => {
                window.location.href = 'pages/me.html';
            }, 1000);

        });
    }
});
