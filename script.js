```javascript
let cells = document.querySelectorAll(".items");
let btnX = document.querySelector("#btnx");
let btnO = document.querySelector("#btno");
let wonDisplay = document.querySelector("#won");
let playAgainButton = document.querySelector(".play");

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', '']; // Represents the state of the 9 cells

// Define winning combinations (indices of the cells)
const winConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left
    [2, 4, 6]  // Diagonal from top-right
];

// Function to handle a cell click
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    // Get the index of the clicked cell based on its position in the NodeList
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    // If the cell is already filled or the game is not active, ignore the click
    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Update the board state and the cell's display
    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    // Check for win or tie
    checkResult();

    // Switch player if the game is still active
    if (gameActive) {
        switchPlayer();
    }
}

// Function to switch the current player and update UI
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnIndicator();
}

// Function to update the visual turn indicator
function updateTurnIndicator() {
    if (currentPlayer === 'X') {
        btnX.style.backgroundColor = "#e2e8f0"; // Highlight X
        btnX.style.color = "#1e293b";
        btnO.style.backgroundColor = "transparent"; // De-highlight O
        btnO.style.color = "white";
    } else {
        btnO.style.backgroundColor = "#e2e8f0"; // Highlight O
        btnO.style.color = "#1e293b";
        btnX.style.backgroundColor = "transparent"; // De-highlight X
        btnX.style.color = "white";
    }
}

// Function to check for a win or a tie
function checkResult() {
    let roundWon = false;

    // Check win conditions
    for (let i = 0; i < winConditions.length; i++) {
        const winCondition = winConditions[i];
        let a = boardState[winCondition[0]];
        let b = boardState[winCondition[1]];
        let c = boardState[winCondition[2]];

        // If any of the cells in the condition are empty, continue
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // If all cells in the condition are the same, a player has won
        if (a === b && b === c) {
            roundWon = true;
            // Highlight the winning cells
            cells[winCondition[0]].style.backgroundColor = "#cbdaf1";
            cells[winCondition[1]].style.backgroundColor = "#cbdaf1";
            cells[winCondition[2]].style.backgroundColor = "#cbdaf1";
            break; // No need to check other conditions
        }
    }

    // Handle win
    if (roundWon) {
        wonDisplay.innerHTML = `${currentPlayer} Won`;
        gameActive = false;
        playAgainButton.style.display = "block";
        // Optionally disable clicks on all cells here if not already handled by gameActive flag
        return; // Game is over
    }

    // Check for tie (if no one won and the board is full)
    let roundTie = !boardState.includes('');
    if (roundTie) {
        wonDisplay.innerHTML = "It's a Tie!";
        gameActive = false;
        playAgainButton.style.display = "block";
        return; // Game is over
    }

    // If neither win nor tie, game continues
}

// Function to reset the game
function resetGame() {
    gameActive = true;
    currentPlayer = 'X'; // Start with X again
    boardState = ['', '', '', '', '', '', '', '', ''];
    wonDisplay.innerHTML = '';
    playAgainButton.style.display = "none";

    // Clear cell content and reset background color
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.style.backgroundColor = ''; // Reset to default/CSS background
    });

    // Reset turn indicator
    updateTurnIndicator();
}

// Add event listeners
// Add click listener to each cell
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

// Add click listener to the play again button
playAgainButton.addEventListener("click", resetGame);

// Initial setup: Hide play again button and set initial turn indicator
playAgainButton.style.display = "none";
updateTurnIndicator(); // Set initial state for X's turn
```