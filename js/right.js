let rightCanvas = document.getElementById('right-canvas');
let ctxRight = rightCanvas.getContext('2d');

class Box {
    constructor(x, y, width = 20, height = 20, dx = 2, dy = 2, color = null) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
        this.color = color || `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
    }

    update(canvas) {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x <= 0 || this.x + this.width >= canvas.width) this.dx *= -1;
        if (this.y <= 0 || this.y + this.height >= canvas.height) this.dy *= -1;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let boxes = [];
for (let i = 0; i < 5; i++) {
    boxes.push(new Box(
        Math.random() * (rightCanvas.width - 20),
        Math.random() * (rightCanvas.height - 20),
        20, 20,
        Math.random() * 4 - 2, 
        Math.random() * 4 - 2  
    ));
}

function animateRight() {
    ctxRight.clearRect(0, 0, rightCanvas.width, rightCanvas.height);

    for (let box of boxes) {
        box.update(rightCanvas);
        box.draw(ctxRight);
    }

}
setInterval(animateRight,1000/60)