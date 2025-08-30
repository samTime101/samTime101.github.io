let topCanvas = document.querySelector('#top-canvas');
let topCtx = topCanvas.getContext('2d');

topCanvas.width = 600;  
topCanvas.height = 100; 

const words = ["WELCOME", "I", "AM", "SAMIP"];
const wordObjects = [
    { text: "WELCOME", x: 100, y: 50, dy: 1, direction: 1 },
    { text: "I",       x: 250, y: 50, dy: 2, direction: 1 },
    { text: "AM",      x: 400, y: 50, dy: 1.5, direction: 1 },
    { text: "SAMIP",   x: 550, y: 50, dy: 2.5, direction: 1 }
];


function animateTop() {
    topCtx.clearRect(0, 0, topCanvas.width, topCanvas.height);
    topCtx.fillStyle = '#00ffcc';
    topCtx.font = '30px monospace';
    topCtx.textAlign = 'center';
    
    for (let word of wordObjects) {
        topCtx.fillText(word.text, word.x, word.y);
        word.y += word.dy * word.direction;
        if (word.y >= topCanvas.height || word.y <= 30) {
            word.direction *= -1;
        }
    }

    requestAnimationFrame(animateTop);
}

animateTop();
