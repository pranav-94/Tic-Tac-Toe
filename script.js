```javascript
let cells = document.querySelectorAll(".items");
let btnx = document.querySelector("#btnx");
let btno = document.querySelector("#btno");
let wonDisplay = document.querySelector("#won");
let playAgainButton = document.querySelector(".play");

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', '']; // Represents the 9 cells

// Winning combinations (indices of the cells)
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to update player turn indicator styling
function updateTurnIndicator() {
    if (currentPlayer === 'X') {
        btnx.style.backgroundColor = "#e2e8f0";
        btnx.style.color = "#1e293b";
        btno.style.backgroundColor = "transparent";
        btno.style.color = "white";
    } else {
        btno.style.backgroundColor = "#e2e8f0";
        btno.style.color = "#1e293b";
        btnx.style.backgroundColor = "transparent";
        btnx.style.color = "white";
    }
}

// Initial turn indicator setup
updateTurnIndicator();

// Function to check for win or tie
function checkGameStatus() {
    let roundWon = false;
    let winningCombo = null;

    for (let i = 0; i < winningCombinations.length; i++) {
        const combo = winningCombinations[i];
        let a = boardState[combo[0]];
        let b = boardState[combo[1]];
        let c = boardState[combo[2]];

        if (a === '' || b === '' || c === '') {
            continue; // Skip if any cell in the combo is empty
        }
        if (a === b && b === c) {
            roundWon = true;
            winningCombo = combo;
            break; // Found a winner
        }
    }

    if (roundWon) {
        gameActive = false;
        wonDisplay.innerHTML = `${currentPlayer} Won`;
        // Highlight winning cells
        winningCombo.forEach(index => {
            cells[index].style.backgroundColor = "#cbdaf1";
        });
        playAgainButton.style.display = "block";
        return; // Game ended with a win
    }

    // Check for tie
    if (!boardState.includes('')) {
        gameActive = false;
        wonDisplay.innerHTML = "It's a Tie!";
        playAgainButton.style.display = "block";
        return; // Game ended with a tie
    }

    // If no win and no tie, continue the game
    // Switch player is handled in the cell click listener
}

// Handle cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    // If the cell is already filled or the game is not active, do nothing
    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Place the current player's mark
    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    // Check game status (win or tie)
    checkGameStatus();

    // If game is still active, switch player and update indicator
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateTurnIndicator();
    }
}

// Add click listeners to each cell
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

// Add click listener to the play again button (only once)
playAgainButton.addEventListener("click", function() {
    location.reload(); // Simple way to reset the game
});
```