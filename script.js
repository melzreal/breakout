const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const brickRowsCount = 9;
const brickColumnsCount = 5;

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

const bricksInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
}

const bricks = [];

//we create an array for each row of bricks
//then we create an array of the columns with the bricks inside
for(let i =0; i < brickRowsCount; i++){
  bricks[i] = [];
  for(let j = 0; j < brickColumnsCount; j++){
    const x = i * (bricksInfo.w + bricksInfo.padding) + bricksInfo.offsetX;
    const y = j * (bricksInfo.h + bricksInfo.padding) + bricksInfo.offsetY;
    bricks[i][j] = { x, y, ...bricksInfo }
  }
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

function drawBricks(){
  bricks.forEach( col => {
    col.forEach( brick => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#0a0b0d' : 'transparent';
      ctx.fill();
      ctx.closePath();
    })
  })
}


//100 for the x axis, 30 for the y axis to position our score
function drawScore(){
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30 );
}

//everytime we redraw, we change the paddle values
function modePaddle(){
  paddle.x += paddle.dx;

  //detect the wall 
  if(paddle.x + paddle.w > canvas.width){
    paddle.x = canvas.width - paddle.w; 
  }

  if(paddle.x < 0){
    paddle.x = 0;
  }
}

function draw(){
  ctx.clearRect( 0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}


function update(){
  modePaddle();
  draw();
  requestAnimationFrame(update)
}

update();

function keyDown(e){
  if(e.key === 'Right' || e.key === 'ArrowRight'){
    paddle.dx = paddle.speed;
  } else if(e.key === 'Left' || e.key === 'ArrowLeft'){
    paddle.dx = -paddle.speed;
  }
}

function keyUp(e){
  if(e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft'){
    paddle.dx = 0;
  } 

}
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);