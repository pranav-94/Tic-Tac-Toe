```javascript
let cells = document.querySelectorAll(".items");
let btnx = document.querySelector("#btnx");
let btno = document.querySelector("#btno");
let wonDisplay = document.querySelector("#won");
let playButton = document.querySelector(".play");

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', '']; // Represents the state of the 9 cells

// Define winning combinations (indices of the cells)
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to handle a cell click
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell); // Get the index of the clicked cell

    // If the cell is already filled or the game is not active, ignore the click
    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Place the current player's mark
    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    // Update button styles based on the next player
    updateButtonStyles();

    // Check for win or tie
    if (checkWin()) {
        endGame(false); // Pass false for tie
    } else if (checkTie()) {
        endGame(true); // Pass true for tie
    } else {
        // Switch player
        switchPlayer();
    }
}

// Function to switch the current player
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to update button styles based on the current player
function updateButtonStyles() {
    if (currentPlayer === 'X') {
        btnx.style.backgroundColor = "transparent";
        btno.style.backgroundColor = "#e2e8f0";
        btno.style.color = "#1e293b";
        btnx.style.color = "white";
    } else {
        btnx.style.backgroundColor = "#e2e8f0";
        btno.style.backgroundColor = "transparent";
        btnx.style.color = "#1e293b";
        btno.style.color = "white";
    }
}

// Function to check for a win
function checkWin() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        let a = boardState[combination[0]];
        let b = boardState[combination[1]];
        let c = boardState[combination[2]];

        // If any cell in the combination is empty, it's not a win
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // If all cells in the combination are the same, it's a win
        if (a === b && b === c) {
            // Highlight winning cells
            cells[combination[0]].style.backgroundColor = "#cbdaf1";
            cells[combination[1]].style.backgroundColor = "#cbdaf1";
            cells[combination[2]].style.backgroundColor = "#cbdaf1";
            return true; // Win found
        }
    }
    return false; // No win found
}

// Function to check for a tie
function checkTie() {
    // If there are no empty cells left and no win, it's a tie
    return !boardState.includes('');
}

// Function to end the game
function endGame(isTie) {
    gameActive = false; // Stop the game

    if (isTie) {
        wonDisplay.innerHTML = "It's a Tie!";
    } else {
        wonDisplay.innerHTML = `${currentPlayer} Won!`;
    }

    playButton.style.display = "block"; // Show the play again button
}

// Function to restart the game
function restartGame() {
    location.reload(); // Simple reload for restart
}

// Add event listeners to cells
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

// Add event listener to the play again button
playButton.addEventListener("click", restartGame);

// Initial button style setup (assuming X starts)
updateButtonStyles();
```