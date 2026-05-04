let gyroEnabled = false;
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

function initGyro() {
    if (gyroEnabled) return;
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation);
                    gyroEnabled = true;
                }
            })
            .catch(() => {});
    } else {
        window.addEventListener('deviceorientation', handleOrientation);
        gyroEnabled = true;
    }
}

function handleOrientation(event) {
    const x = event.gamma;
    const y = event.beta;
    targetX = (x / 45) * 20;
    targetY = ((y - 45) / 45) * 20;
}

function updatePhysics() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;
    const asciiItems = document.querySelectorAll('.ascii-item');
    asciiItems.forEach(item => {
        item.style.transform = `translate(${currentX}px, ${currentY}px)`;
    });
    const title = document.querySelector('.glitch-complex');
    if (title) {
        title.style.transform = `rotateX(${-currentY * 0.5}deg) rotateY(${currentX * 0.5}deg)`;
    }
    const chaosFrags = document.querySelectorAll('.chaos-fragment');
    chaosFrags.forEach(frag => {
        frag.style.transform += ` translate(${currentX * 0.5}px, ${currentY * 0.5}px)`;
    });
    requestAnimationFrame(updatePhysics);
}

function initGyroPhysics() {
    updatePhysics();
    document.body.addEventListener('click', initGyro, { once: true });
    document.body.addEventListener('touchstart', initGyro, { once: true });
    if (window.innerWidth >= 768) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            targetX = x * 20;
            targetY = y * 20;
        });
    }
}
