// AUTHOR SAMIP REGMI
// REPO:https://github.com/samTime101/Random-Tetris-Rain
const leftCanvas = document.getElementById('left-canvas');
const ctxLeft = leftCanvas.getContext('2d');

const COLS =  10
const ROWS  = 10
const SCREENWIDTH  = leftCanvas.width
const SCREENHEIGHT  = leftCanvas.height
const CELLWIDTH  = SCREENWIDTH / COLS
const CELLHEIGHT  = SCREENHEIGHT / ROWS
const FPS =  60


  
  let mat = [];
  let buffer = []
  let score = 0;

  for (let i = 0; i < ROWS; i++) {
  mat[i] = [];
  buffer[i] = [];
    for (let j = 0; j < COLS; j++) {
      mat[i][j] = 0;
      buffer[i][j] = 0;
      }
  }

  setInterval(function loop(){


  let rowR = Math.floor(Math.random() * ROWS);
  let colR = Math.floor(Math.random() * COLS);
  mat[rowR][colR] = 1;
  
  for (let i = ROWS - 2; i >= 0; i--) {
    for (let j = 0; j < COLS; j++) {
      if (mat[i][j] == 1 && mat[i + 1][j] == 0) {
      //original value to 0
        buffer[i][j] = 0;
      //moving pixel down
        buffer[i+1][j] = 1; 
      }
    }
  }

  let rowSum = 0;
  for (let j = 0; j < ROWS; j++) {
    rowSum += mat[ROWS - 1][j];
  }

  if (rowSum == COLS) {
    for (let j = 0; j < COLS; j++) {
      buffer[ROWS - 1][j] = 0;
      score++;
    }
  }

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      mat[i][j] = buffer[i][j];
    }
  }

  ctxLeft.clearRect(0, 0, SCREENWIDTH, SCREENHEIGHT); 
  ctxLeft.font = "40px Special Elite";
  ctxLeft.fillStyle = "#ff3e3e"; 
  ctxLeft.fillText(`Score:${score/10}`, SCREENWIDTH/6, SCREENHEIGHT/2);

  const colors = ["#ff3e3e", "#00f2ff", "#ff00ff"];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (mat[row][col] != 0) {
        ctxLeft.beginPath();
        ctxLeft.fillStyle =  colors[Math.floor(Math.random() * colors.length)];
        ctxLeft.rect(col * CELLWIDTH, row * CELLHEIGHT, CELLWIDTH, CELLHEIGHT);
        // ctxLeft.stroke();
        ctxLeft.fill(); 
        

      }
    }
  }

  }, 1000 / FPS)
