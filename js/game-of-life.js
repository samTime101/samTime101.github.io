const canvas = document.getElementById('game-of-life-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let cellSize = 10;
let cols, rows;
let grid;

function setupGrid() {
    cols = Math.floor(window.innerWidth / cellSize);
    rows = Math.floor(window.innerHeight / cellSize);
    grid = new Array(cols).fill(null).map(() => new Array(rows).fill(0));
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.random() > 0.9 ? 1 : 0;
        }
    }
}

function drawGrid() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#ff3e3e';
    ctx.fillStyle = accentColor;
    ctx.globalAlpha = 0.05; // Very subtle

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j] === 1) {
                if (Math.random() > 0.99) {
                    ctx.font = '10px monospace';
                    ctx.fillText(Math.random() > 0.5 ? '0' : '1', i * cellSize, j * cellSize);
                } else {
                    ctx.fillRect(i * cellSize, j * cellSize, cellSize - 1, cellSize - 1);
                }
            }
        }
    }
}

function nextGeneration() {
    let next = grid.map(col => [...col]);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let neighbors = countNeighbors(grid, i, j);
            let state = grid[i][j];

            if (state === 0 && neighbors === 3) {
                next[i][j] = 1;
            } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            }
            if (Math.random() > 0.9999) {
                next[i][j] = 1;
            }
        }
    }
    grid = next;
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function updateGoL() {
    nextGeneration();
    drawGrid();
    requestAnimationFrame(updateGoL);
}

function initGameOfLife() {
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setupGrid();
    });

    setupGrid();
    updateGoL();
}

window.initGameOfLife = initGameOfLife;
