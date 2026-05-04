const chaosContainer = document.getElementById('chaos-fragments');
const chaosMessages = [
    "ERROR_0x99", "VOID_LINK", "SHADOW_DATA", "HE_IS_HERE",
    "RUN_COMMAND: KILL", "NULL_PTR", "OVERFLOW", "FRAGMENTED",
    "010101", "??!??!??", "STAY_AWAY"
];

function spawnChaosFragment() {
    if (!chaosContainer) return;
    const frag = document.createElement('div');
    frag.className = 'chaos-fragment';
    frag.textContent = chaosMessages[Math.floor(Math.random() * chaosMessages.length)];
    frag.style.left = `${Math.random() * 90}%`;
    frag.style.top = `${Math.random() * 90}%`;
    frag.style.transform = `rotate(${Math.random() * 360}deg)`;
    chaosContainer.appendChild(frag);
    setTimeout(() => {
        frag.style.left = `${Math.random() * 90}%`;
        frag.style.top = `${Math.random() * 90}%`;
    }, 100);
    setTimeout(() => frag.remove(), 5000);
}

function initChaosFragments() {
    setInterval(() => {
        if (window.innerWidth < 768) return;
        if (Math.random() > 0.9) spawnChaosFragment();
    }, 1000);
}
