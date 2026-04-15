let bottomCanvas = document.querySelector('#bottom-canvas');
let bottomCtx = bottomCanvas.getContext('2d');

bottomCanvas.width = 600;
bottomCanvas.height = 100;

const footerWordObjects = [
    { text: "", x: 300, y: 80, dy: 0.8, direction: 1, isDate: true }
];

function animateBottom() {
    bottomCtx.clearRect(0, 0, bottomCanvas.width, bottomCanvas.height);

    bottomCtx.fillStyle = '#00ffcc';
    bottomCtx.font = '30px monospace';
    bottomCtx.textAlign = 'center';


    for (let word of footerWordObjects) {

        if (word.isDate) {
            const now = new Date();
            word.text = `© ${now.getFullYear()} samTime101`;
        }

        bottomCtx.fillText(word.text, word.x, word.y);
        word.y += word.dy * word.direction;
        if (word.y >= bottomCanvas.height || word.y <= 30) {
            word.direction *= -1;
        }
    }

    requestAnimationFrame(animateBottom);
}

animateBottom();