
const tds = document.querySelectorAll("td"); // all column in the table
const resetButton = document.getElementById("reset"); // reset button
const oneVsOne = document.getElementById("1vs1"); // 1vs1 button
const againstComputer = document.getElementById("computer"); // Against computer button
const result = document.querySelector("#result"); //message when the game ends
let isX = true;
let gameEnded = false;
let isComputerGame = false;
const X = "X",
  O = "O";


const BOARD = [null, null, null, null, null, null, null, null, null];

let currentBoard = BOARD.slice();

/**
 * Adds event listeners to the buttons that allow the user to play against the computer.           
 * @returns None           
 */

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


/* This function is called when a player clicks on a cell. It checks if the game has ended, if it has
it returns. If the game has not ended it checks if the current player is X or O and places the
player in the cell. It then checks if the current player is a winner. */
function onTurn(index) {
  if (gameEnded || currentBoard[index]) {
    return;
  }
  /* A ternary operator. It is a shorthand way of writing an if/else statement. */
  const currentPlayer = isX ? X : O;
  placeXorO(currentPlayer, index);

  const isWinner = checkIfWinner(currentBoard, currentPlayer);

  /**
   * Checks if the game is over.           
   * @returns None           
   */

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
/**
 * Checks if the given board is a winning board for the given player.       
 * @param {string[]} board - the board to check for a winner.       
 * @param {string} player - the player to check for a winner.       
 * @returns {boolean} - true if the board is a winning board for the given player.       
 */

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

/**
 * Resets the game to its initial state.           
 * @returns None           
 */
function reset() {
  currentBoard = BOARD.slice();
  isX = true;
  gameEnded = false;
  tds.forEach((td) => (td.innerHTML = ""));
  result.innerHTML = "";
}

/**
 * Finds all the empty indexies in the board.           
 * @param {Array<string | null>} board - the board to find the empty indexies in.           
 * @returns {Array<number>} - an array of all the empty indexies in the board.           
 */

function emptyIndexies(board) {
  const freeSpaces = [];
  board.forEach((td, index) => {
    if (td === null) {
      freeSpaces.push(index);
    }
  });

  return freeSpaces;
}

/**
 * Minimax function to determine the best move.           
 * @param {Array<Array<string>>} newBoard - the current board state.           
 * @param {string} player - the current player.           
 * @returns {Object} - the best move.           
 */

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

  /**
   * Finds the best move for the computer to make.           
   * @param {string} player - the player to find the best move for.           
   * @param {Array<Move>} moves - the array of moves to choose from.           
   * @returns {Move} - the best move for the computer to make.           
   */

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

/**
 * Places an X or O in the given position.           
 * @param {string} player - the player to place (X or O)           
 * @param {number} position - the position to place the player in           
 * @returns None           
 */

function placeXorO(player, position) {
  tds[position].innerHTML = player;
  currentBoard[position] = player;
}

/**
 * Checks if the board is full.           
 * @returns {boolean} - true if the board is full, false otherwise.           
 */

function isDraw() {
  let draw = true;
  currentBoard.forEach((td) => {
    if (td === null) {
      draw = false;
    }
  });
  return draw;
}

/**
 * A function that is called when the game ends.       
 * @param {string} message - The message to display in the result element.       
 * @returns None       
 */

function onGameEnd(message) {
  result.innerHTML = message;
  gameEnded = true;
}
