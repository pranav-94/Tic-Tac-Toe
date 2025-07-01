```javascript
let cells = document.querySelectorAll(".items");
let btnX = document.querySelector("#btnx");
let btnO = document.querySelector("#btno");
let wonDisplay = document.querySelector("#won");
let playAgainButton = document.querySelector(".play");

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initial player turn indicator styling
function updateTurnIndicator() {
    if (currentPlayer === 'X') {
        btnX.style.backgroundColor = "#e2e8f0"; // Active color
        btnX.style.color = "#1e293b"; // Active text color
        btnO.style.backgroundColor = "transparent"; // Inactive color
        btnO.style.color = "white"; // Inactive text color
    } else {
        btnO.style.backgroundColor = "#e2e8f0"; // Active color
        btnO.style.color = "#1e293b"; // Active text color
        btnX.style.backgroundColor = "transparent"; // Inactive color
        btnX.style.color = "white"; // Inactive text color
    }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handleResultValidation() {
    let roundWon = false;
    let winningLine = null;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winningLine = winCondition;
            break;
        }
    }

    if (roundWon) {
        wonDisplay.innerHTML = `${currentPlayer} Won`;
        gameActive = false;
        playAgainButton.style.display = "block";
        // Highlight winning cells
        if (winningLine) {
            winningLine.forEach(index => {
                cells[index].style.backgroundColor = "#cbdaf1";
            });
        }
        return;
    }

    // Check for Draw
    let roundDraw = !board.includes('');
    if (roundDraw) {
        wonDisplay.innerHTML = "Draw";
        gameActive = false;
        playAgainButton.style.display = "block";
        return;
    }

    // If no win or draw, switch player
    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnIndicator();
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index')); // Assuming cells have data-index attribute

    // Check if the cell is already filled or game is not active
    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    wonDisplay.innerHTML = '';
    playAgainButton.style.display = "none";
    updateTurnIndicator(); // Reset turn indicator

    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.style.backgroundColor = ''; // Remove highlight
    });
}

// Add event listeners
cells.forEach((cell, index) => {
    cell.setAttribute('data-index', index); // Add data-index for easy access
    cell.addEventListener('click', handleCellClick);
});

playAgainButton.addEventListener('click', restartGame);

// Initialize the game state and UI
updateTurnIndicator();
playAgainButton.style.display = "none"; // Hide play again button initially
wonDisplay.innerHTML = ''; // Clear initial won text


// --- Original code notes ---
// - Repeated DOM lookups inside Gamelogic.
// - Repetitive win condition checks for X and O separately.
// - Inline style manipulation instead of CSS classes.
// - Adding location.reload() listener inside the click handler, leading to multiple listeners on subsequent clicks after a win.
// - No explicit draw condition check.
// - No mechanism to prevent clicking on already filled cells after a win.
// - `temp` variable is not descriptive.
// - The logic for disabling clicks after a win is flawed (adds new listeners that reload the page).
// - The play button listener is added inside the cell click handler, which is incorrect.
```