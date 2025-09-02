const COLS = 7;
const ROWS = 6;
let board = [];
let currentPlayer = "red";
let gameOver = false;

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");

function createBoard() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  boardEl.innerHTML = "";
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.col = c;
      boardEl.appendChild(cell);
    }
  }
}

function dropPiece(col) {
  if (gameOver) return;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (!board[r][col]) {
      board[r][col] = currentPlayer;
      const cell = boardEl.children[r * COLS + col];
      cell.classList.add(currentPlayer);
      if (checkWin(r, col)) {
        statusEl.textContent = Player `${capitalize(currentPlayer)} wins!`;
        gameOver = true;
      } else if (board.flat().every(x => x)) {
        statusEl.textContent = "It's a draw!";
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === "red" ? "yellow" : "red";
        statusEl.textContent = Player `${capitalize(currentPlayer)}'s turn`;
      }
      break;
    }
  }
}

function checkWin(row, col) {
  return (
    checkDir(row, col, 1, 0) || // horizontal
    checkDir(row, col, 0, 1) || // vertical
    checkDir(row, col, 1, 1) || // diagonal \
    checkDir(row, col, 1, -1)   // diagonal /
  );
}

function checkDir(row, col, dr, dc) {
  let count = 1;
  count += countPieces(row, col, dr, dc);
  count += countPieces(row, col, -dr, -dc);
  return count >= 4;
}

function countPieces(row, col, dr, dc) {
  let r = row + dr;
  let c = col + dc;
  let count = 0;
  while (
    r >= 0 && r < ROWS &&
    c >= 0 && c < COLS &&
    board[r][c] === currentPlayer
  ) {
    count++;
    r += dr;
    c += dc;
  }
  return count;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

boardEl.addEventListener("click", e => {
  if (!e.target.classList.contains("cell")) return;
  const col = parseInt(e.target.dataset.col);
  dropPiece(col);
});

resetBtn.addEventListener("click", () => {
  createBoard();
  currentPlayer = "red";
  gameOver = false;
  statusEl.textContent = "Player Red's turn";
});

createBoard();