```javascript
const items = document.querySelectorAll(".items");
const btnX = document.getElementById("btnx");
const btnO = document.getElementById("btno");
let currentPlayer = "X";
const wonDisplay = document.getElementById("won");
const playAgainButton = document.querySelector(".play");

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (items[a].textContent && items[a].textContent === items[b].textContent && items[a].textContent === items[c].textContent) {
            wonDisplay.textContent = `${items[a].textContent} Won`;
            items[a].style.backgroundColor = "#cbdaf1";
            items[b].style.backgroundColor = "#cbdaf1";
            items[c].style.backgroundColor = "#cbdaf1";
            playAgainButton.style.display = "block";
            items.forEach(item => item.removeEventListener("click", handleClick));
            return true;
        }
    }
    return false;
}

function handleClick(event) {
    const index = [...items].indexOf(event.target);
    if (items[index].textContent === "") {
        items[index].textContent = currentPlayer;
        if (checkWin()) return;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        btnX.style.backgroundColor = currentPlayer === "X" ? "transparent" : "#e2e8f0";
        btnO.style.backgroundColor = currentPlayer === "O" ? "transparent" : "#e2e8f0";
        btnX.style.color = currentPlayer === "X" ? "white" : "#1e293b";
        btnO.style.color = currentPlayer === "O" ? "white" : "#1e293b";
    }
}

function resetGame() {
    items.forEach(item => {
        item.textContent = "";
        item.style.backgroundColor = "";
    });
    wonDisplay.textContent = "";
    playAgainButton.style.display = "none";
    currentPlayer = "X";
    btnX.style.backgroundColor = "transparent";
    btnO.style.backgroundColor = "#e2e8f0";
    btnX.style.color = "white";
    btnO.style.color = "#1e293b";
    items.forEach(item => item.addEventListener("click", handleClick));
}


items.forEach(item => item.addEventListener("click", handleClick));
playAgainButton.addEventListener("click", resetGame);

```