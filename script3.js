const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("resetBtn");
const scoreXEl = document.getElementById("score-x");
const scoreOEl = document.getElementById("score-o");

let currentPlayer = "X";
let board = Array(9).fill("");
let scores = {X: 0, O: 0};
let gameOver = false;

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], //rows
    [0,3,6],[1,4,7],[2,5,8], //cols
    [0,4,8],[2,4,6], //diagonals
];

function updateScores() {
    if (scoreXEl) scoreXEl.textContent = scores.X;
    if (scoreOEl) scoreOEl.textContent = scores.O;
}

function highlight(pattern) {
    pattern.forEach(i => cells[i].classList.add("winner"));
}

function isWinning(player) {
    return winPatterns.find(([a,b,c]) =>
        board[a] === player && board[b] === player && board[c] === player
    );
}

function resetBoard() {
    board.fill("");
    cells.forEach(c => {
        c.textContent = "";
        c.classList.remove("winner", "taken");
    });
    currentPlayer = "X";
    gameOver = false;
}

function handleCellClick(e) {
    if (gameOver) return;

    const index = e.target.dataset.index !== undefined
        ? Number(e.target.dataset.index)
        : e.target.dataset.idx !== undefined
            ? Number(e.target.dataset.idx)
            : [...cells].indexOf(e.target);

    if (index < 0 || board[index]) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add("taken")

    const winPattern = isWinning(currentPlayer);
    if (winPattern) {
        highlight(winPattern);
        scores[currentPlayer]++;
        updateScores();
        gameOver = true;
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        return;
    }

    if (board.every(v => v)) {
        gameOver = true;
        setTimeout(() => alert('Its a draw!'), 100);
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

cells.forEach(c => c.addEventListener("click", handleCellClick));
if (resetBtn) resetBtn.addEventListener("click", resetBoard);
updateScores();



























































































































//TO-DO LIST

const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-container button");

function createTask(text) {
  const li = document.createElement("li");
  li.className = "task";

  const span = document.createElement("span");
  span.textContent = text;

  const actions = document.createElement("div");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✅";
  completeBtn.onclick = () => li.classList.toggle("completed");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = () => li.remove();

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);

  return li;
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    taskList.appendChild(createTask(text));
    taskInput.value = "";
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    document.querySelectorAll("#taskList .task").forEach(task => {
      switch (filter) {
        case "all": task.style.display = "flex"; break;
        case "completed": task.style.display = task.classList.contains("completed") ? "flex" : "none"; break;
        case "pending": task.style.display = task.classList.contains("completed") ? "none" : "flex"; break;
      }
    });
  });
});