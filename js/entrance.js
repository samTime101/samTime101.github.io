document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('entrance-splash');
    const textElement = document.getElementById('entrance-text');
    const container = document.querySelector('.dashboard-container');
    const sequence = ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'SA', 'SAM', 'SAMI', 'SAMIP'];
    let index = 0;

    function showNext() {
        if (index < sequence.length) {
            textElement.textContent = sequence[index];

            let delay = 300;

            if (sequence[index] === 'SAMIP') {
                delay = 1000;
            }

            index++;
            setTimeout(showNext, delay);
        } else {
            if (splash) {
                splash.style.opacity = '0';
                splash.style.pointerEvents = 'none';
            }

            const elementsToReveal = [
                '.dashboard-container',
                '#ascii-background',
                '#data-stream',
                '#mini-terminal',
                '#chaos-fragments',
                '#game-of-life-canvas'
            ];

            elementsToReveal.forEach(selector => {
                const el = document.querySelector(selector);
                if (el) el.classList.add('visible');
            });

            setTimeout(() => {
                if (splash) splash.remove();
            }, 1000);
        }
    }

    setTimeout(showNext, 800);
});
