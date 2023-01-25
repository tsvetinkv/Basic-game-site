//board
let board;
let boardWidth = 700;
let boardHeight = 380;
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

let cactus1Width = 32;
let cactus2Width = 68;
let cactus3Width = 100;

let cactusHeight = 75;
let cactusX = 800;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;
//clouds
// let cloudArray = [];
// let cloudWidth = 50;
// let cloudHeight = 80;
// let cloudX = 500;
// let cloudY = 5;
// let cloudImg;

// let cloud = {
//   x: cloudX,
//   y: cloudY,
//   width: cloudWidth,
//   height: cloudHeight
// }

//physics
let velocityX = -7; //cactus moving left speed
let velocityY = 0;
let gravity = 0.50;

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

  requestAnimationFrame(update);
  setInterval(placeCactus, 1000); //1000 milliseconds = 1 second

  document.addEventListener("click", moveDino);

  cloudImg = new Image();
  cloudImg.src = "./img/cloud.png";

//   requestAnimationFrame(update);
 // setInterval(placeCloud, 1000);

  // cloudImg.onload = function () {
  //   context.drawImage(cloudImg, cloud.x, cloud.y, cloud.width, cloud.height);
  // }


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
//cloud
// context.drawImage(cloudImg, cloud.x, cloud.y, cloud.width, cloud.height);
// for (let i = 0; i < cloudArray.length; i++) {
//     let cloud = cloudArrayArray[i];
//     cloud.x += velocityX;
//     context.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
//   }
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
    velocityY = -13;
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
    height: cactusHeight
  }

  let placeCactusChance = Math.random(); //0 - 0.9999...

  if (placeCactusChance > .90) { //10% you get cactus3
    cactus.img = cactus3Img;
    cactus.width = cactus3Width;
    cactusArray.push(cactus);
  } else if (placeCactusChance > .70) { //30% you get cactus2
    cactus.img = cactus2Img;
    cactus.width = cactus2Width;
    cactusArray.push(cactus);
  } else if (placeCactusChance > .50) { //50% you get cactus1
    cactus.img = cactus1Img;
    cactus.width = cactus1Width;
    cactusArray.push(cactus);
  }

  if (cactusArray.length > 8) {
    cactusArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
  }
}
// function placeCloud(){

//     let cloud = {
//         img: cloudImg,
//         x: null,
//         y: cloudY,
//         width: cloudWidth,
//         height: cloudHeight
//       }

//       let placeCloud = Math.random() * 100;

     
//        cloud.x = placeCloud
//         cactusArray.push(cloud);
      
    
//       if (cloudArray.length > 10) {
//         cloudArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
//       }
// }
function detectCollision(a, b) {
  return a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
    a.x + a.width > b.x && //a's top right corner passes b's top left corner
    //   a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
    a.y + a.height > b.y; //a's bottom left corner passes b's top left corner
}