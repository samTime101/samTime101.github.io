const miniTerminal = document.getElementById('mini-terminal');
const logPool = [
    "[SYS] TRACE 0xAF9B", "[MEM] LEAK_DETECTED", "[VOID] SIGNAL_LOST",
    "[USER] ACCESS_REVOKED", "[KERN] STACK_OVERFLOW", "[NET] PKT_SNIFF_ON",
    "[SHD] PROC_HIDE_04", "[CRIT] DATA_CORRUPT", "[WARN] HE_WATCHES"
];
const trailChars = "01#$%&@?!";

function updateMiniTerminal() {
    if (!miniTerminal || window.innerWidth < 768) return;
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

function initMiniTerminal() {
    setInterval(updateMiniTerminal, 800);
}

function initCursorTrail() {
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;
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
}
