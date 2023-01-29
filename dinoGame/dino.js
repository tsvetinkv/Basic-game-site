//board
let board;
let boardWidth = 520;
let boardHeight = 370;
let context;

//dino
let dinoWidth = 88;
let dinoHeight = 104;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
  x: dinoX,
  y: dinoY,
  width: dinoWidth,
  height: dinoHeight
}

//cactus
let cactusArray = [];

let cactus1Width = 42;
let cactus2Width = 65;
let cactus3Width = 95;
let bigCactus1width = 49;
let bigCactus2width = 95;
let bigCactus3width = 128;

let cactusHeight = 98;
let bigCactusHeight = 120;
let cactusX = 600;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;
let bigCactus1Img;
let bigCactus2Img;
let bigCactus3Img;


//physics
let velocityX = -6; //cactus moving left speed
let velocityY = 0;
let gravity = 0.48;

let gameOver = false;
let score = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;

  context = board.getContext("2d"); //used for drawing on the board

  dinoImg = new Image();
  dinoImg.src = "./img/dino.png";
  dinoImg.onload = function () {
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
  }

  cactus1Img = new Image();
  cactus1Img.src = "./img/cactus1.png";

  cactus2Img = new Image();
  cactus2Img.src = "./img/cactus2.png";

  cactus3Img = new Image();
  cactus3Img.src = "./img/cactus3.png";

  bigCactus1Img = new Image();
  bigCactus1Img.src = "./img/big-cactus1.png";

  bigCactus2Img = new Image();
  bigCactus2Img.src = "./img/big-cactus2.png";

  bigCactus3Img = new Image();
  bigCactus3Img.src = "./img/big-cactus3.png"


  requestAnimationFrame(update);
  setInterval(placeCactus, 1000); //1000 milliseconds = 1 second

  document.addEventListener("click", moveDino);
  document.addEventListener("keydown", (ev) => ev.key === ' ' && moveDino());


}

function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, board.width, board.height);

  //dino
  velocityY += gravity;
  dino.y = Math.min(dino.y + velocityY, dinoY); //apply gravity to current dino.y, making sure it doesn't exceed the ground
  context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

  //cactus
  for (let i = 0; i < cactusArray.length; i++) {
    let cactus = cactusArray[i];
    cactus.x += velocityX;
    context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

    if (detectCollision(dino, cactus)) {
      gameOver = true;
      dinoImg.src = "./img/dino-dead.png";
      dinoImg.onload = function () {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
      }
    }
  }

  //score
  context.fillStyle = "black";
  context.font = "20px courier";
  score++;
  context.fillText(score, 5, 20);
}

function moveDino() {
  if (gameOver) {
    return;
  }

  if (dino.y == dinoY) {
    //jump
    velocityY = -14;
  }
  // else if (e.code == "ArrowDown" && dino.y == dinoY) {
  //     //duck
  // }

}

function placeCactus() {
  if (gameOver) {
    return;
  }

  //place cactus
  let cactus = {
    img: null,
    x: cactusX,
    y: cactusY,
    width: null,
    height: null
  }

  let placeCactusChance = Math.random(); //0 - 0.9999...

  if(placeCactusChance > 0.85){ //15%
    cactus.img = bigCactus3Img;
    cactus.width = bigCactus3width;
    cactus.height = bigCactusHeight;
    cactusArray.push(cactus);
  }else if (placeCactusChance > 0.80) { //20% 
    cactus.img = bigCactus2Img;
    cactus.width = bigCactus2width;
    cactus.height = bigCactusHeight;
    cactusArray.push(cactus);
  } else if (placeCactusChance > 0.75) { //25% 
    cactus.img = bigCactus1Img;
    cactus.width = bigCactus1width;
    cactus.height = bigCactusHeight;
    cactusArray.push(cactus);
  } else if (placeCactusChance > 0.70) { //30% 
    cactus.img = cactus3Img;
    cactus.width = cactus3Width;
    cactus.height = cactusHeight;
    cactusArray.push(cactus);
  }else if(placeCactusChance > 0.60){//40%
    cactus.img = cactus2Img;
    cactus.width = cactus2Width;
    cactus.height = cactusHeight;
    cactusArray.push(cactus);
  }else if(placeCactusChance > 0.40){//60%
    cactus.img = cactus1Img;
    cactus.width = cactus1Width;
    cactus.height = cactusHeight;
    cactusArray.push(cactus);
  }

  if (cactusArray.length > 7) {
    cactusArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
  }
}

function detectCollision(a, b) {
  return a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
    a.x + a.width > b.x && //a's top right corner passes b's top left corner
    a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
    a.y + a.height > b.y; //a's bottom left corner passes b's top left corner
}