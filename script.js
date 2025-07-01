```javascript
let cells = document.querySelectorAll(".items");
let btnX = document.querySelector("#btnx");
let btnO = document.querySelector("#btno");
let winnerDisplay = document.querySelector("#won");
let restartButton = document.querySelector(".play");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Define winning combinations (indices of the board array)
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

// Function to update the player turn UI
function updatePlayerTurnUI() {
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

// Function to handle a cell click
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell); // Get index of clicked cell

    // If the cell is already filled or the game is not active, ignore the click
    if (board[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // Place the player's mark on the board and update the UI
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    // Check for win or tie
    checkWinOrTie();

    // If the game is still active, switch player and update UI
    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updatePlayerTurnUI();
    }
}

// Function to check for a win or tie
function checkWinOrTie() {
    let roundWon = false;
    let winningCombo = null;

    // Check all winning conditions
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        // If any cell in the condition is empty, it's not a win yet
        if (a === "" || b === "" || c === "") {
            continue;
        }

        // If all cells in the condition are the same, it's a win
        if (a === b && b === c) {
            roundWon = true;
            winningCombo = winCondition;
            break; // Found a win, no need to check further
        }
    }

    // Handle win condition
    if (roundWon) {
        winnerDisplay.innerHTML = `${currentPlayer} Won`;
        gameActive = false;
        restartButton.style.display = "block"; // Show restart button

        // Highlight the winning cells
        winningCombo.forEach(index => {
            cells[index].style.backgroundColor = "#cbdaf1"; // Highlight color
        });
        return; // Game ended
    }

    // Handle tie condition (if no win and the board is full)
    let roundTie = !board.includes("");
    if (roundTie) {
        winnerDisplay.innerHTML = "Tie";
        gameActive = false;
        restartButton.style.display = "block"; // Show restart button
        return; // Game ended
    }

    // If neither win nor tie, game continues
}

// Function to restart the game
function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""]; // Reset board array
    gameActive = true; // Set game to active
    currentPlayer = "X"; // Reset current player to X

    winnerDisplay.innerHTML = ""; // Clear winner message
    restartButton.style.display = "none"; // Hide restart button

    // Clear cell contents and remove highlighting
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.style.backgroundColor = ""; // Remove background color
    });

    // Reset player turn UI
    updatePlayerTurnUI();
}

// Add event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

// Add event listener to the restart button
restartButton.addEventListener("click", restartGame);

// Initialize the UI on page load
updatePlayerTurnUI();
restartButton.style.display = "none"; // Ensure restart button is hidden initially
```