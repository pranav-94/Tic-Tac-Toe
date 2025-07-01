```javascript
let cells = document.querySelectorAll(".items");
let btnX = document.querySelector("#btnx");
let btnO = document.querySelector("#btno");
let wonDisplay = document.querySelector("#won");
let playAgainBtn = document.querySelector(".play");

let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Define winning combinations (indices of the boardState array)
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initial UI setup
updateTurnUI();
playAgainBtn.style.display = "none";

// Add event listeners to each cell
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(cell, index));
});

// Add event listener to the play again button
playAgainBtn.addEventListener("click", resetGame);

function handleCellClick(cell, index) {
    // Check if the game is active and the cell is empty
    if (!gameActive || boardState[index] !== "") {
        return; // Ignore click if game is over or cell is already filled
    }

    // Update the board state and the cell's content
    boardState[index] = currentPlayer;
    cell.innerHTML = currentPlayer;

    // Check for win or tie
    if (checkWin()) {
        gameActive = false;
        displayResult(`${currentPlayer} Won!`);
        highlightWinningCells(checkWin()); // Pass the winning combination
        playAgainBtn.style.display = "block";
    } else if (checkTie()) {
        gameActive = false;
        displayResult("It's a Tie!");
        playAgainBtn.style.display = "block";
    } else {
        // Switch player and update UI
        switchPlayer();
        updateTurnUI();
    }
}

function checkWin() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] !== "" && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return combination; // Return the winning combination
        }
    }
    return null; // No win
}

function checkTie() {
    // If no win and all cells are filled, it's a tie
    return !checkWin() && boardState.every(cell => cell !== "");
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function updateTurnUI() {
    if (currentPlayer === "X") {
        btnX.style.backgroundColor = "#e2e8f0"; // Active color
        btnX.style.color = "#1e293b";
        btnO.style.backgroundColor = "transparent"; // Inactive color
        btnO.style.color = "white";
    } else {
        btnO.style.backgroundColor = "#e2e8f0"; // Active color
        btnO.style.color = "#1e293b";
        btnX.style.backgroundColor = "transparent"; // Inactive color
        btnX.style.color = "white";
    }
}

function displayResult(message) {
    wonDisplay.innerHTML = message;
}

function highlightWinningCells(combination) {
    if (combination) {
        combination.forEach(index => {
            cells[index].style.backgroundColor = "#cbdaf1"; // Highlight color
        });
    }
}

function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X"; // X starts the game

    // Clear cell content and remove highlight
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.style.backgroundColor = ""; // Reset background color
    });

    // Reset display and buttons
    displayResult("");
    playAgainBtn.style.display = "none";
    updateTurnUI(); // Set initial turn UI
}
```