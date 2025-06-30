```javascript
const items = document.querySelectorAll(".items");
const btnX = document.getElementById("btnx");
const btnO = document.getElementById("btno");
let currentPlayer = "X";
const wonDisplay = document.getElementById("won");
const playAgainBtn = document.querySelector(".play");

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWin() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (items[a].textContent && items[a].textContent === items[b].textContent && items[a].textContent === items[c].textContent) {
      wonDisplay.textContent = `${items[a].textContent} Won`;
      items[a].style.backgroundColor = "#cbdaf1";
      items[b].style.backgroundColor = "#cbdaf1";
      items[c].style.backgroundColor = "#cbdaf1";
      playAgainBtn.style.display = "block";
      items.forEach(item => item.removeEventListener("click", handleClick));
      return true;
    }
  }
  return false;
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  btnX.style.backgroundColor = currentPlayer === "X" ? "transparent" : "#e2e8f0";
  btnO.style.backgroundColor = currentPlayer === "O" ? "transparent" : "#e2e8f0";
  btnX.style.color = currentPlayer === "X" ? "white" : "#1e293b";
  btnO.style.color = currentPlayer === "O" ? "white" : "#1e293b";
}

function handleClick(index) {
  if (this.textContent === "") {
    this.textContent = currentPlayer;
    if (checkWin()) return;
    switchPlayer();
  }
}


items.forEach((item, index) => {
  item.addEventListener("click", handleClick.bind(item, index));
});

playAgainBtn.addEventListener("click", () => {
  location.reload();
});

```