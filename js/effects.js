const glitchChars = "¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ";

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

function triggerStrobe() {
    if (window.innerWidth < 768) return;
    document.body.classList.add('strobe-flash');
    setTimeout(() => document.body.classList.remove('strobe-flash'), 100);
}

function initGlitchEffects() {
    setInterval(() => {
        if (Math.random() > 0.95) triggerGlitch();
    }, 500);
    setInterval(() => {
        if (Math.random() > 0.7) corruptText();
    }, 1000);
    setInterval(() => {
        if (Math.random() > 0.99) triggerStrobe();
    }, 5000);
}
