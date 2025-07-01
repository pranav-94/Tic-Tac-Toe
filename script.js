```javascript
let items = document.querySelectorAll(".items");
let btnx = document.querySelector("#btnx");
let btno = document.querySelector("#btno");
let wonDisplay = document.querySelector("#won");
let playAgainButton = document.querySelector(".play");

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(''); // Represents the state of the 3x3 board

// Define winning combinations (indices of the items array)
const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

// Function to update player turn indicator styles
function updateTurnIndicator() {
    if (currentPlayer === 'X') {
        btnx.style.backgroundColor = "#e2e8f0";
        btnx.style.color = "#1e293b";
        btno.style.backgroundColor = "transparent";
        btno.style.color = "white";
    } else {
        btnx.style.backgroundColor = "transparent";
        btnx.style.color = "white";
        btno.style.backgroundColor = "#e2e8f0";
        btno.style.color = "#1e293b";
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

// Function to check for a draw
function checkDraw() {
    return boardState.every(cell => cell !== '');
}

// Function to end the game
function endGame(winningCombination = null) {
    gameActive = false;
    playAgainButton.style.display = "block";

    if (winningCombination) {
        const winner = boardState[winningCombination[0]];
        wonDisplay.innerHTML = `${winner} Won`;
        // Highlight winning cells
        winningCombination.forEach(index => {
            items[index].style.backgroundColor = "#cbdaf1"; // Or any highlight color
        });
    } else {
        wonDisplay.innerHTML = "Draw";
    }

    // Disable clicks on all items after game ends
    items.forEach(item => {
        item.removeEventListener('click', handleItemClick); // Remove the specific handler
        item.style.pointerEvents = 'none'; // Optional: visually indicate disabled
    });
}

// Handle click on a grid item
function handleItemClick() {
    const index = Array.from(items).indexOf(this); // Get the index of the clicked item

    // If the cell is already filled or game is not active, do nothing
    if (boardState[index] !== '' || !gameActive) {
        return;
    }

    // Update board state and display
    boardState[index] = currentPlayer;
    this.innerHTML = currentPlayer;

    // Check for win or draw
    const winningCombination = checkWin();
    if (winningCombination) {
        endGame(winningCombination);
    } else if (checkDraw()) {
        endGame(); // It's a draw
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateTurnIndicator();
    }
}

// Add event listeners to each grid item
items.forEach(item => {
    item.addEventListener("click", handleItemClick);
});

// Add event listener to the play again button (only once)
playAgainButton.addEventListener("click", function() {
    location.reload(); // Simple way to restart
});

// Initial turn indicator setup
updateTurnIndicator();
```