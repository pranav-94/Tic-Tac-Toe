```javascript
let cells = document.querySelectorAll(".items");
let btnx = document.querySelector("#btnx");
let btno = document.querySelector("#btno");
let wonDisplay = document.querySelector("#won");
let playButton = document.querySelector(".play");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""]; // Represents the board state
let moveCount = 0;

// Define winning conditions
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left
    [2, 4, 6]  // Diagonal from top-right
];

// Function to update button styles based on current player
function updatePlayerButtonStyles() {
    if (currentPlayer === "X") {
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

// Function to handle a cell click
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.id.replace('item', '')) - 1; // Get index (0-8)

    // If the cell is already filled or the game is not active, ignore the click
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // Place the player's mark and update the state
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    moveCount++;

    // Check for win or draw
    handleResultValidation();

    // If game is still active, switch player and update styles
    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updatePlayerButtonStyles();
    }
}

// Function to check for win or draw
function handleResultValidation() {
    let roundWon = false;
    let winningCombo = null;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        // If any cell in the condition is empty, it's not a win yet
        if (a === "" || b === "" || c === "") {
            continue;
        }

        // If all cells in the condition are the same, it's a win
        if (a === b && b === c) {
            roundWon = true;
            winningCombo = winCondition;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        wonDisplay.innerHTML = `${currentPlayer} Won`;
        // Highlight winning cells
        winningCombo.forEach(index => {
            cells[index].style.backgroundColor = "#cbdaf1";
        });
        playButton.style.display = "block";
        return; // Game is over
    }

    // Check for draw (if no win and all cells are filled)
    if (moveCount === 9) {
        gameActive = false;
        wonDisplay.innerHTML = "Draw";
        playButton.style.display = "block";
        return; // Game is over
    }

    // If neither win nor draw, game continues
}

// Add event listeners to cells
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

// Add event listener to the play again button
playButton.addEventListener("click", function() {
    location.reload(); // Reload the page to restart the game
});

// Initial button style setup
updatePlayerButtonStyles();
```