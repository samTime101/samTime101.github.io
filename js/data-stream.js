const dataStream = document.getElementById('data-stream');
const fragments = [
    "RE_SYNCHRONIZING...", "NULL_POINTER_EXCEPTION", "VOID_DATA_LINK",
    "FRAGMENT_ID: 0x8823", "MEMORY_LEAK_WARNING", "SHADOW_PROC_ACTIVE",
    "01010111 01001000 01011001", "SYSTEM_COMPROMISED", "HE_WATCHES",
    "ACCESS_DENIED", "OVERRIDE_SUCCESS", "ROOT_SHELL_OPENED"
];

function spawnDataFragment() {
    if (!dataStream || window.innerWidth < 768) return;
    const fragment = document.createElement('div');
    fragment.className = 'data-fragment';
    fragment.textContent = fragments[Math.floor(Math.random() * fragments.length)];
    fragment.style.left = `${Math.random() * 100}vw`;
    fragment.style.animationDuration = `${5 + Math.random() * 10}s`;
    dataStream.appendChild(fragment);
    setTimeout(() => fragment.remove(), 15000);
}

function initDataStream() {
    setInterval(spawnDataFragment, 2000);
}
