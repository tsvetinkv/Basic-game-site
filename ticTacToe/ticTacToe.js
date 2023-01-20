const tds = document.querySelectorAll("td"); // all column in the table
const resetButton = document.getElementById("reset"); // reset button
const oneVsOne = document.getElementById("1vs1"); // 1vs1 button
const againstComputer = document.getElementById("computer"); // Against computer button
const result = document.querySelector("#result");
let isX = true;
let gameEnded = false;
let isComputerGame = false;
const X = "X",
  O = "O";

const BOARD = [null, null, null, null, null, null, null, null, null];

let currentBoard = BOARD.slice();

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
    const botMove = minimax(currentBoard.slice(), X).index;
    placeXorO(O, botMove);
    if (checkIfWinner(currentBoard, O)) {
      onGameEnd(`Winner is ${O}`);
    }
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
  currentBoard = BOARD.slice();
  isX = true;
  gameEnded = false;
  tds.forEach((td) => (td.innerHTML = ""));
  result.innerHTML = "";
}

function emptyIndexies(board) {
  const freeSpaces = [];
  board.forEach((td, index) => {
    if (td === null) {
      freeSpaces.push(index);
    }
  });

  return freeSpaces;
}
// function emptyIndexies(b)
// {
//   console.log(b.filter(t => t != "O" && t!='X'));
//   return b.filter(t => t != "O" && t!='X');
// }
// function computerTurn() {
//   let freeSpaces = [];
//   currentBoard.forEach((td, index) => {
//     if (td === null) {
//       freeSpaces.push(index);
//     }
//   });

//   const randomMove = freeSpaces[Math.floor(Math.random() * freeSpaces.length)];
//   placeXorO(O, randomMove);

//   const isWinner = checkIfWinner(currentBoard, O);
//   if (isWinner) {
//     onGameEnd(`Winner is ${O}`);
//   }
// }
function minimax(newBoard, player) {
  var availSpots = emptyIndexies(newBoard);

  if (checkIfWinner(newBoard, X)) {
    return { score: -10 };
  } else if (checkIfWinner(newBoard, O)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = availSpots[i];
    newBoard[availSpots[i]] = player;

    if (player == O) {
      var result = minimax(newBoard, X);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, O);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  var bestMove;
  if (player === O) {
    var bestScore = -Infinity;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = Infinity;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}
/*                                                                            */

function placeXorO(player, position) {
  tds[position].innerHTML = player;
  currentBoard[position] = player;
}

function isDraw() {
  let draw = true;
  currentBoard.forEach((td /*, index*/) => {
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
