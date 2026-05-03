const birthDate = new Date(2006, 8, 1, 0, 0, 0);
const lifespanYears = 80;
const totalLifespanMs = lifespanYears * 365.25 * 24 * 60 * 60 * 1000;

function updateLifeProgress() {
    const now = new Date();
    const ageMs = now - birthDate;
    
    if (ageMs < 0) return;

    const ageYears = ageMs / (365.25 * 24 * 60 * 60 * 1000);
    const progressPercent = (ageMs / totalLifespanMs) * 100;

    const percentEl = document.getElementById('life-percentage');
    const ageEl = document.getElementById('life-age');
    const decayBitsContainer = document.getElementById('decay-bits');

    if (percentEl) percentEl.textContent = `${progressPercent.toFixed(9)}%`;
    if (ageEl) ageEl.textContent = `TEMPORAL_LOC: ${ageYears.toFixed(9)}`;

    if (decayBitsContainer && decayBitsContainer.children.length === 0) {
        for (let i = 0; i < 50; i++) {
            const bit = document.createElement('div');
            bit.className = 'decay-bit';
            decayBitsContainer.appendChild(bit);
        }
    }

    if (decayBitsContainer) {
        const bits = decayBitsContainer.children;
        const bitsToActivate = Math.floor((progressPercent / 100) * bits.length);
        for (let i = 0; i < bits.length; i++) {
            if (i < bitsToActivate) {
                bits[i].classList.add('active');
                bits[i].style.opacity = Math.random() > 0.1 ? '1' : '0.3';
            } else {
                bits[i].classList.remove('active');
            }
        }
    }
}

setInterval(updateLifeProgress, 50);
updateLifeProgress();

document.addEventListener('DOMContentLoaded', () => {
    const asciiBg = document.getElementById('ascii-background');
    if (asciiBg && typeof ascii !== 'undefined') {
        for (let i = 0; i < 20; i++) {
            const div = document.createElement('div');
            div.className = 'ascii-item';
            div.textContent = ascii;
            div.style.left = `${Math.random() * 100}%`;
            div.style.top = `${Math.random() * 100}%`;
            div.style.animationDelay = `${Math.random() * -60}s`;
            asciiBg.appendChild(div);
        }
    }

    const dataStream = document.getElementById('data-stream');
    const fragments = [
        "RE_SYNCHRONIZING...", "NULL_POINTER_EXCEPTION", "VOID_DATA_LINK", 
        "FRAGMENT_ID: 0x8823", "MEMORY_LEAK_WARNING", "SHADOW_PROC_ACTIVE",
        "01010111 01001000 01011001", "SYSTEM_COMPROMISED", "HE_WATCHES",
        "ACCESS_DENIED", "OVERRIDE_SUCCESS", "ROOT_SHELL_OPENED"
    ];

    function spawnFragment() {
        if (!dataStream) return;
        const fragment = document.createElement('div');
        fragment.className = 'data-fragment';
        fragment.textContent = fragments[Math.floor(Math.random() * fragments.length)];
        fragment.style.left = `${Math.random() * 100}vw`;
        fragment.style.animationDuration = `${5 + Math.random() * 10}s`;
        dataStream.appendChild(fragment);

        setTimeout(() => fragment.remove(), 15000);
    }

    setInterval(spawnFragment, 2000);

    function triggerGlitch() {
        const body = document.body;
        const glitchType = Math.floor(Math.random() * 3);
        
        if (glitchType === 0) {
            body.style.transform = `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`;
            setTimeout(() => body.style.transform = '', 100);
        } else if (glitchType === 1) {
            body.style.filter = 'invert(1) hue-rotate(180deg)';
            setTimeout(() => body.style.filter = '', 50);
        }
    }

    setInterval(() => {
        if (Math.random() > 0.95) triggerGlitch();
    }, 500);

    const glitchChars = "¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ";
    function corruptText() {
        const elements = document.querySelectorAll('p, span, h3, .val');
        const target = elements[Math.floor(Math.random() * elements.length)];
        if (!target || target.children.length > 0) return;

        const originalText = target.textContent;
        const textArray = originalText.split('');
        const glitchIndex = Math.floor(Math.random() * textArray.length);
        textArray[glitchIndex] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        
        target.textContent = textArray.join('');
        setTimeout(() => target.textContent = originalText, 100 + Math.random() * 200);
    }

    setInterval(() => {
        if (Math.random() > 0.7) corruptText();
    }, 1000);

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

    setInterval(() => {
        if (Math.random() > 0.9) spawnChaosFragment();
    }, 1000);

    // 6. Mini Terminal Log Stream
    const miniTerminal = document.getElementById('mini-terminal');
    const logPool = [
        "[SYS] TRACE 0xAF9B", "[MEM] LEAK_DETECTED", "[VOID] SIGNAL_LOST", 
        "[USER] ACCESS_REVOKED", "[KERN] STACK_OVERFLOW", "[NET] PKT_SNIFF_ON",
        "[SHD] PROC_HIDE_04", "[CRIT] DATA_CORRUPT", "[WARN] HE_WATCHES"
    ];

    function updateMiniTerminal() {
        if (!miniTerminal) return;
        const line = document.createElement('div');
        line.className = 'terminal-line';
        const timestamp = new Date().toLocaleTimeString().split(' ')[0];
        const content = logPool[Math.floor(Math.random() * logPool.length)];
        line.textContent = `[${timestamp}] ${content}`;
        miniTerminal.appendChild(line);

        if (miniTerminal.children.length > 20) {
            miniTerminal.removeChild(miniTerminal.firstChild);
        }
    }
    setInterval(updateMiniTerminal, 800);

    // 7. Cursor Glitch Trail
    const trailChars = "01#$%&@?!";
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.8) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.textContent = trailChars[Math.floor(Math.random() * trailChars.length)];
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 500);
        }
    });

    // 8. Screen Strobe Flash
    function triggerStrobe() {
        document.body.classList.add('strobe-flash');
        setTimeout(() => {
            document.body.classList.remove('strobe-flash');
        }, 100);
    }

    setInterval(() => {
        if (Math.random() > 0.99) triggerStrobe();
    }, 5000);

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
