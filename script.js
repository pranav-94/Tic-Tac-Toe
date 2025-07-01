```javascript
// Cache DOM elements
const gridItems = document.querySelectorAll(".items");
const btnX = document.querySelector("#btnx");
const btnO = document.querySelector("#btno");
const wonDisplay = document.querySelector("#won");
const playAgainButton = document.querySelector(".play");

// Game state variables
let currentPlayer = 'X';
// Represents the 3x3 grid state using indices 0-8
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true; // Is the game currently playable?

// Define winning combinations (indices of the gameBoard array)
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

// Function to handle a cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    // Get the index of the clicked cell within the gridItems NodeList
    const clickedCellIndex = Array.from(gridItems).indexOf(clickedCell);

    // If the cell is already filled or the game is not active, ignore the click
    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Update the game state
    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    // Check for win or draw after the move
    checkResult();

    // If the game is still active, switch player and update UI
    if (gameActive) {
        switchPlayer();
        updatePlayerTurnUI();
    }
}

// Function to switch the current player
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to update the UI indicating whose turn it is
function updatePlayerTurnUI() {
    // Reset styles first
    btnX.style.backgroundColor = "transparent";
    btnX.style.color = "white";
    btnO.style.backgroundColor = "transparent";
    btnO.style.color = "white";

    // Apply active styles
    if (currentPlayer === 'X') {
        btnX.style.backgroundColor = "#e2e8f0"; // Assuming this is the active color
        btnX.style.color = "#1e293b";
    } else {
        btnO.style.backgroundColor = "#e2e8f0";
        btnO.style.color = "#1e293b";
    }
}

// Function to check for win or draw
function checkResult() {
    let roundWon = false;

    // Check all winning conditions
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = gameBoard[winCondition[0]];
        const b = gameBoard[winCondition[1]];
        const c = gameBoard[winCondition[2]];

        // If any of the cells in the condition are empty, continue to the next condition
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // If all three cells are the same, we have a winner
        if (a === b && b === c) {
            roundWon = true;
            // Highlight the winning cells
            winCondition.forEach(index => {
                gridItems[index].style.backgroundColor = "#cbdaf1"; // Highlight color
            });
            break; // No need to check further conditions
        }
    }

    // Handle win
    if (roundWon) {
        wonDisplay.innerHTML = `${currentPlayer} Won`;
        gameActive = false; // End the game
        playAgainButton.style.display = "block"; // Show play again button
        return; // Game is over, no need to check for draw
    }

    // Handle draw (if no win and the board is full)
    // Check if every cell in the gameBoard array is not empty
    const isDraw = gameBoard.every(cell => cell !== '');
    if (isDraw) {
        wonDisplay.innerHTML = "Draw";
        gameActive = false; // End the game
        playAgainButton.style.display = "block"; // Show play again button
        return;
    }

    // If neither win nor draw, game continues (gameActive remains true)
}

// Function to reset the game
function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', '']; // Clear the board state
    gameActive = true; // Set game to active
    currentPlayer = 'X'; // Start with X again

    // Clear cell content and reset background color for all grid items
    gridItems.forEach(cell => {
        cell.innerHTML = '';
        cell.style.backgroundColor = ''; // Reset background color
    });

    // Reset UI elements
    wonDisplay.innerHTML = ''; // Clear win/draw message
    playAgainButton.style.display = "none"; // Hide play again button
    updatePlayerTurnUI(); // Reset player turn indicator (should show X's turn)
}

// Add event listeners to each grid item
gridItems.forEach(item => {
    item.addEventListener('click', handleCellClick);
});

// Add event listener to the play again button