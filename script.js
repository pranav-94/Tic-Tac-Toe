```javascript
let items = document.querySelectorAll(".items");
let btnx = document.querySelector("#btnx");
let btno = document.querySelector("#btno");
let wonDisplay = document.querySelector("#won");
let playButton = document.querySelector(".play");

let board = Array(9).fill(''); // Represents the 3x3 board state
let currentPlayer = 'X';
let gameActive = true;

// Define winning combinations (indices of the board array)
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to update the turn indicator styling
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

// Function to check for a win
function checkWin() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            // Win found
            gameActive = false;
            wonDisplay.innerHTML = `${board[a]} Won`;
            // Highlight winning cells
            items[a].style.backgroundColor = "#cbdaf1";
            items[b].style.backgroundColor = "#cbdaf1";
            items[c].style.backgroundColor = "#cbdaf1";
            playButton.style.display = "block";
            return true;
        }
    }
    return false;
}

// Function to check for a tie
function checkTie() {
    // If the game is still active and every cell is filled
    if (gameActive && board.every(cell => cell !== '')) {
        gameActive = false;
        wonDisplay.innerHTML = "It's a Tie!";
        playButton.style.display = "block";
        return true;
    }
    return false;
}

// Function to handle a cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = Array.from(items).indexOf(clickedCell); // Get the index of the clicked element

    // If the game is not active or the cell is already filled, do nothing
    if (!gameActive || board[clickedCellIndex] !== '') {
        return;
    }

    // Update the board state and the cell's content
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    // Check for win or tie
    if (checkWin()) {
        // Game ended with a win
        return; // Stop further processing
    }

    if (checkTie()) {
        // Game ended with a tie
        return; // Stop further processing
    }

    // If no win or tie, switch player and update turn indicator
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnIndicator();
}

// Function to reset the game
function resetGame() {
    board.fill(''); // Clear the board state
    gameActive = true;
    currentPlayer = 'X'; // Start with X
    wonDisplay.innerHTML = ""; // Clear win/tie message
    playButton.style.display = "none"; // Hide play again button

    // Clear cell content and remove highlight
    items.forEach(item => {
        item.innerHTML = "";
        item.style.backgroundColor = ""; // Reset background color
    });

    // Reset turn indicator
    updateTurnIndicator();
}

// Add event listeners to each item (cell)
items.forEach(item => {
    item.addEventListener("click", handleCellClick);
});

// Add event listener to the play again button
playButton.addEventListener("click", resetGame);

// Initial setup: set the turn indicator for the starting player
updateTurnIndicator();
```