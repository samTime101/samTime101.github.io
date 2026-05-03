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
        if (!dataStream || window.innerWidth < 768) return;
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
            const offset = window.innerWidth < 768 ? 1 : 2.5;
            body.style.transform = `translate(${Math.random() * (offset * 2) - offset}px, ${Math.random() * (offset * 2) - offset}px)`;
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
        if (window.innerWidth < 768) return; // Disable chaos on mobile
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
    setInterval(updateMiniTerminal, 800);

    const trailChars = "01#$%&@?!";
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

    function triggerStrobe() {
        if (window.innerWidth < 768) return;
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

    // --- Gyroscope Schizo Physics ---
    let gyroEnabled = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    function initGyro() {
        if (gyroEnabled) return;

        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            // iOS 13+ requires permission
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                        gyroEnabled = true;
                    }
                })
                .catch(console.error);
        } else {
            // Android and others
            window.addEventListener('deviceorientation', handleOrientation);
            gyroEnabled = true;
        }
    }

    function handleOrientation(event) {
        // beta: tilt front/back (-180 to 180), gamma: tilt left/right (-90 to 90)
        const x = event.gamma; // left/right
        const y = event.beta;  // front/back

        // Normalize values for subtle effect
        targetX = (x / 45) * 20; // max 20px drift
        targetY = ((y - 45) / 45) * 20; // assuming 45deg is neutral holding position
    }

    function updatePhysics() {
        // Smooth interpolation (lerp)
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        // Apply to ASCII background
        const asciiItems = document.querySelectorAll('.ascii-item');
        asciiItems.forEach(item => {
            item.style.transform = `translate(${currentX}px, ${currentY}px)`;
        });

        // Apply subtle skew to the main title
        const title = document.querySelector('.glitch-complex');
        if (title) {
            title.style.transform = `rotateX(${-currentY * 0.5}deg) rotateY(${currentX * 0.5}deg)`;
        }

        // Move chaos fragments if they exist
        const chaosFrags = document.querySelectorAll('.chaos-fragment');
        chaosFrags.forEach(frag => {
            frag.style.transform += ` translate(${currentX * 0.5}px, ${currentY * 0.5}px)`;
        });

        requestAnimationFrame(updatePhysics);
    }

    // Start physics loop
    updatePhysics();

    // Trigger permission on first click anywhere
    document.body.addEventListener('click', initGyro, { once: true });
    document.body.addEventListener('touchstart', initGyro, { once: true });

    // --- PC Mouse-based Simulated Gyro ---
    if (window.innerWidth >= 768) {
        window.addEventListener('mousemove', (e) => {
            // Calculate mouse position relative to center of screen (-1 to 1)
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;

            // Map to same target range as mobile gyro (approx 20px)
            targetX = x * 20;
            targetY = y * 20;
        });
    }
    });
