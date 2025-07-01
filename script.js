```javascript
let cells = document.querySelectorAll(".items");
let btnx = document.querySelector("#btnx");
let btno = document.querySelector("#btno");
let wonDisplay = document.querySelector("#won");
let playAgainButton = document.querySelector(".play");

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', '']; // Represents the state of the 9 cells

// Winning combinations (indices of the cells)
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

// Initial turn display
updateTurnDisplay();

// Add click listeners to each cell
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(cell, index));
});

// Add click listener to the play again button
playAgainButton.addEventListener("click", () => {
    location.reload(); // Simple reload to reset the game
});

function handleCellClick(clickedCell, clickedCellIndex) {
    // If the cell is already filled or the game is not active, do nothing
    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Place the current player's mark
    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    // Check for win or tie
    if (checkWin()) {
        gameActive = false;
        wonDisplay.innerHTML = `${currentPlayer} Won`;
        playAgainButton.style.display = "block";
        // Highlighting is done inside checkWin
    } else if (checkTie()) {
        gameActive = false;
        wonDisplay.innerHTML = "It's a Tie!";
        playAgainButton.style.display = "block";
    } else {
        // Switch player and update display
        switchPlayer();
        updateTurnDisplay();
    }
}

function checkWin() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = boardState[winCondition[0]];
        let b = boardState[winCondition[1]];
        let c = boardState[winCondition[2]];

        // If any cell in the combination is empty, it's not a win yet
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // If all cells in the combination are the same, it's a win
        if (a === b && b === c) {
            roundWon = true;
            // Highlight the winning cells
            cells[winCondition[0]].style.backgroundColor = "#cbdaf1";
            cells[winCondition[1]].style.backgroundColor = "#cbdaf1";
            cells[winCondition[2]].style.backgroundColor = "#cbdaf1";
            break; // No need to check other conditions
        }
    }
    return roundWon;
}

function checkTie() {
    // If the board state contains no empty strings, it's a tie
    return !boardState.includes('');
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateTurnDisplay() {
    if (currentPlayer === 'X') {
        btnx.style.backgroundColor = "#e2e8f0"; // Highlight X
        btnx.style.color = "#1e293b";
        btno.style.backgroundColor = "transparent"; // De-highlight O
        btno.style.color = "white";
    } else {
        btno.style.backgroundColor = "#e2e8f0"; // Highlight O
        btno.style.color = "#1e293b";
        btnx.style.backgroundColor = "transparent"; // De-highlight X
        btnx.style.color = "white";
    }
}

// Initial state: X's turn is highlighted
updateTurnDisplay();
```