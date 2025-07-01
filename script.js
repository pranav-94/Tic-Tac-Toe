```javascript
let items = document.querySelectorAll(".items");
let btnx = document.querySelector("#btnx");
let btno = document.querySelector("#btno");
let wonDisplay = document.querySelector("#won");
let playAgainButton = document.querySelector(".play");

let currentPlayer = 'X'; // 'X' starts
let gameActive = true; // Flag to indicate if the game is ongoing
let boardState = Array(9).fill(''); // Internal representation of the board

// Winning combinations (indices of the items NodeList)
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to update button styles based on current player
function updatePlayerTurnStyles() {
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
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return combination; // Return the winning combination indices
        }
    }
    return null; // No win
}

// Function to check for a tie
function checkTie() {
    return boardState.every(cell => cell !== '');
}

// Function to end the game
function endGame(message, winningCombo = null) {
    gameActive = false;
    wonDisplay.innerHTML = message;
    playAgainButton.style.display = "block";

    if (winningCombo) {
        winningCombo.forEach(index => {
            items[index].style.backgroundColor = "#cbdaf1"; // Highlight winning cells
        });
    }

    // Optionally disable clicks on all cells after game ends
    items.forEach(item => {
        item.removeEventListener('click', handleCellClick); // Remove existing listeners
        // Or add a check inside handleCellClick: if (!gameActive) return;
    });
}

// Handle click on a cell
function handleCellClick() {
    const index = Array.from(items).indexOf(this); // Get the index of the clicked item

    // If game is not active or cell is already filled, do nothing
    if (!gameActive || boardState[index] !== '') {
        return;
    }

    // Update board state and display
    boardState[index] = currentPlayer;
    this.innerHTML = currentPlayer;

    // Check for win
    const winningCombo = checkWin();
    if (winningCombo) {
        endGame(`${currentPlayer} Won`, winningCombo);
        return; // Game ended, stop further checks
    }

    // Check for tie
    if (checkTie()) {
        endGame("It's a Tie!");
        return; // Game ended, stop further checks
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updatePlayerTurnStyles();
}

// Add event listeners to each item
items.forEach(element => {
    element.addEventListener("click", handleCellClick);
});

// Add event listener to the play again button
playAgainButton.addEventListener("click", function() {
    location.reload(); // Simple way to restart
});

// Initial style update for X's turn
updatePlayerTurnStyles();
```