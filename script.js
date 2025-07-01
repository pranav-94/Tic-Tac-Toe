```javascript
let cells = document.querySelectorAll(".items");
let btnX = document.querySelector("#btnx");
let btnO = document.querySelector("#btno");
let wonDisplay = document.querySelector("#won");
let playButton = document.querySelector(".play");

let board = Array(9).fill(''); // Represents the game board state
let currentPlayer = 'X';
let gameActive = true; // Flag to indicate if the game is ongoing

// Define the winning combinations (indices of the board array)
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to update the turn indicator styles
function updateTurnIndicator() {
    if (currentPlayer === 'X') {
        btnX.style.backgroundColor = "#e2e8f0";
        btnX.style.color = "#1e293b";
        btnO.style.backgroundColor = "transparent";
        btnO.style.color = "white";
    } else {
        btnO.style.backgroundColor = "#e2e8f0";
        btnO.style.color = "#1e293b";
        btnX.style.backgroundColor = "transparent";
        btnX.style.color = "white";
    }
}

// Function to check for a win
function checkWin() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            // We have a winner!
            return combination; // Return the winning combination indices
        }
    }
    return null; // No winner yet
}

// Function to check for a tie
function checkTie() {
    // If the board is full and there's no winner, it's a tie
    return board.every(cell => cell !== '');
}

// Function to handle the end of the game (win or tie)
function endGame(winningCombo = null) {
    gameActive = false;
    playButton.style.display = "block";

    if (winningCombo) {
        wonDisplay.innerHTML = `${currentPlayer} Won`;
        // Highlight the winning cells
        winningCombo.forEach(index => {
            cells[index].style.backgroundColor = "#cbdaf1";
        });
    } else {
        wonDisplay.innerHTML = "It's a Tie!";
    }

    // Disable clicking on cells after the game ends
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick); // Remove the specific handler
        // Or alternatively, add a class that prevents clicks via CSS pointer-events
        // cell.classList.add('disabled');
    });
}

// Function to handle a cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    // If the cell is already filled or the game is not active, do nothing
    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Update the board state and the cell's content
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    // Check for win or tie
    const winningCombo = checkWin();
    if (winningCombo) {
        endGame(winningCombo);
        return; // Game ended
    }

    if (checkTie()) {
        endGame(); // Game ended in a tie
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnIndicator();
}

// Function to reset the game
function resetGame() {
    board.fill(''); // Clear the board state
    cells.forEach(cell => {
        cell.innerHTML = ''; // Clear cell content
        cell.style.backgroundColor = ''; // Remove highlight
        // Re-add the click listener if it was removed
        cell.removeEventListener('click', handleCellClick); // Ensure no duplicates
        cell.addEventListener('click', handleCellClick);
        // If using disabled class, remove it
        // cell.classList.remove('disabled');
    });
    currentPlayer = 'X'; // Start with X
    gameActive = true; // Set game to active
    wonDisplay.innerHTML = ''; // Clear win/tie message
    playButton.style.display = "none"; // Hide restart button
    updateTurnIndicator(); // Reset turn indicator display
}

// Initialize the game
function initGame() {
    // Add click listeners to each cell
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    // Add click listener to the play again button
    playButton.addEventListener("click", resetGame);

    // Set initial turn indicator
    updateTurnIndicator();

    // Hide the play again button initially
    playButton.style.display = "none";
}

// Start the game when the script loads
initGame();

// Initial turn indicator setup (redundant if initGame is called, but good for clarity)
updateTurnIndicator();
```