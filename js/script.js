document.addEventListener('DOMContentLoaded', () => {
    if (typeof initDataStream === 'function') initDataStream();
    if (typeof initGlitchEffects === 'function') initGlitchEffects();
    if (typeof initChaosFragments === 'function') initChaosFragments();
    if (typeof initMiniTerminal === 'function') initMiniTerminal();
    if (typeof initCursorTrail === 'function') initCursorTrail();
    if (typeof initGyroPhysics === 'function') initGyroPhysics();
    const archivesBtn = document.getElementById('archives-btn');
    const portalOverlay = document.getElementById('portal-overlay');
    if (archivesBtn && portalOverlay) {
        archivesBtn.addEventListener('click', () => {
            portalOverlay.classList.add('active');
            archivesBtn.style.pointerEvents = 'none';
            archivesBtn.textContent = 'REDIRECTING...';
            setTimeout(() => {
                window.location.href = 'pages/me.html';
            }, 1000);
        });
    }
});

