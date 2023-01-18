const tds = document.querySelectorAll("td"); // all column in the table
const resetButton = document.getElementById("reset"); // reset button
const oneVsOne = document.getElementById("1vs1"); // 1vs1 button
const againstComputer = document.getElementById("computer"); // Against computer button
const result = document.querySelector("#result");
let isX = true;
let gameEnded = false;
let isComputerGame = false;
const X = "X";
const O = "O";

const EMPTY_BOARD = [null, null, null, null, null, null, null, null, null];

let currentBoard = EMPTY_BOARD.slice();

tds.forEach((td, index) => td.addEventListener("click", () => onTurn(index)));
oneVsOne.addEventListener("click", () => {
  isComputerGame = false;
  reset();
});
againstComputer.addEventListener("click", (e) => {
  reset();
  isComputerGame = true;
});
resetButton.addEventListener("click", reset);

function onTurn(index) {
  if (gameEnded) {
    return;
  }
  const currentPlayer = isX ? X : O;
  placeXorO(currentPlayer, index);

  const isWinner = checkIfWinner(currentBoard, currentPlayer);

  if (isWinner) {
    onGameEnd(`Winner is ${currentPlayer}`);
  } else if (isDraw()) {
    onGameEnd("Draw!");
  } else if (isComputerGame) {
    computerTurn();
  } else {
    isX = !isX;
  }
}
function checkIfWinner(board, player) {
  if (
    (board[0] === player && board[1] === player && board[2] === player) ||
    (board[0] === player && board[3] === player && board[6] === player) ||
    (board[0] === player && board[4] === player && board[8] === player) ||
    (board[1] === player && board[4] === player && board[7] === player) ||
    (board[2] === player && board[5] === player && board[8] === player) ||
    (board[3] === player && board[4] === player && board[5] === player) ||
    (board[6] === player && board[7] === player && board[8] === player) ||
    (board[2] === player && board[4] === player && board[6] === player)
  )
    return true;
  return false;
}

function reset() {
  currentBoard = EMPTY_BOARD.slice();
  isX = true;
  gameEnded = false;
  tds.forEach((td) => (td.innerHTML = ""));
  result.innerHTML = "";
}

function computerTurn() {
  let freeSpaces = [];
  currentBoard.forEach((td, index) => {
    if (td === null) {
      freeSpaces.push(index);
    }
  });

  const randomMove = freeSpaces[Math.floor(Math.random() * freeSpaces.length)];
  placeXorO(O, randomMove);

  const isWinner = checkIfWinner(currentBoard, O);
  if (isWinner) {
    onGameEnd(`Winner is ${O}`);
  }
}

function placeXorO(player, position) {
  tds[position].innerHTML = player;
  currentBoard[position] = player;
}

function isDraw() {
  let draw = true;
  currentBoard.forEach((td, index) => {
    if (td === null) {
      draw = false;
    }
  });
  return draw;
}

function onGameEnd(message) {
  result.innerHTML = message;
  gameEnded = true;
}

