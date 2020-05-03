const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

//make the ball start right in the middle by getting the canvas and splitting
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 20,
  speed: 4,
  dx: 4,
  dy: -4
}
// because the paddle withd is 80, we take 40 from its position to make it center
// dx is the only value we need to move it along since its only moving horizontally
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8, 
  dx: 0
}


//beginPath belongs to the context api, a way to begin drawing 
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0a0b0d';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0a0b0d';
  ctx.fill();
  ctx.closePath();
}

function draw(){
  drawBall();
  drawPaddle();
  drawScore()
}

//100 for the x axis, 30 for the y axis to position our score
function drawScore(){
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30 );
}

draw();