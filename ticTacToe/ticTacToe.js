const tds = document.querySelectorAll("td"); // all columns in the table
const resetButton = document.getElementById("reset"); // reset button
const oneVsOne = document.getElementById("1vs1"); // 1vs1 button
const againstComputer = document.getElementById("computer"); // Against computer button
const result = document.querySelector("#result"); // message when the game ends
let isX = true;
let gameEnded = false;
let isComputerGame = false;
const X = "X";
const O = "O";

const BOARD = [null, null, null, null, null, null, null, null, null];

let currentBoard = BOARD.slice();

function placeXorO(player, position) {
  tds[position].innerHTML = player;
  currentBoard[position] = player;
}

function makeComputerMove() {
  const bestMove = minimax(currentBoard, X).index;
  placeXorO(X, bestMove); // Place "X" for the computer
  isX = false; // Set isX to false to indicate it's the player's turn (O)
  
  if (checkIfWinner(currentBoard, X)) {
    onGameEnd(`Winner is ${X}`);
  } else if (isDraw()) {
    onGameEnd("Draw!");
  }
}

tds.forEach((td, index) => td.addEventListener("click", () => onTurn(index)));

oneVsOne.addEventListener("click", () => {
  isComputerGame = false;
  reset();
});

againstComputer.addEventListener("click", () => {
  isComputerGame = true;
  reset();
  makeComputerMove();
});

resetButton.addEventListener("click", reset);

function onTurn(index) {
  if (gameEnded || currentBoard[index]) {
    return;
  }

  if (isX) {
    placeXorO(X, index);
    if (checkIfWinner(currentBoard, X)) {
      onGameEnd(`Winner is ${X}`);
    } else if (isDraw()) {
      onGameEnd("Draw!");
    }
  } else {
    placeXorO(O, index);
    if (checkIfWinner(currentBoard, O)) {
      onGameEnd(`Winner is ${O}`);
    } else if (isDraw()) {
      onGameEnd("Draw!");
    }
  }

  isX = !isX; // Toggle the value of isX for the next turn
  if (isComputerGame && !gameEnded) {
    makeComputerMove();
  }
}

function checkIfWinner(board, player) {
  const winningCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      board[a] === player &&
      board[b] === player &&
      board[c] === player
    ) {
      return true;
    }
  }

  return false;
}

function reset() {
  currentBoard = BOARD.slice();
  isX = true;
  gameEnded = false;
  tds.forEach((td) => (td.innerHTML = ""));
  result.innerHTML = "";
}

function emptyIndices(board) {
  const indices = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      indices.push(i);
    }
  }
  return indices;
}

function isDraw() {
  return !currentBoard.includes(null);
}

function onGameEnd(message) {
  result.innerHTML = message;
  gameEnded = true;
}

function minimax(board, player) {
  const availableMoves = emptyIndices(board);

  if (checkIfWinner(board, X)) {
    return { score: -1 };
  } else if (checkIfWinner(board, O)) {
    return { score: 1 };
  } else if (availableMoves.length === 0) {
    return { score: 0 };
  }

  const moves = [];

  for (let i = 0; i < availableMoves.length; i++) {
    const move = {};
    move.index = availableMoves[i];

    board[availableMoves[i]] = player;

    if (player === X) {
      const result = minimax(board, O);
      move.score = result.score;
    } else {
      const result = minimax(board, X);
      move.score = result.score;
    }

    board[availableMoves[i]] = null;

    moves.push(move);
  }

  let bestMove;
  if (player === X) {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}
