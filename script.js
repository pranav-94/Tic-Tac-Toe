```javascript
let items = document.querySelectorAll(".items");
let btnx = document.querySelector("#btnx");
let btno = document.querySelector("#btno");
let wonDisplay = document.querySelector("#won");
let playButton = document.querySelector(".play");

let currentPlayer = 'X';
let gameActive = true;

// Define winning combinations using indices (0-8)
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initial player turn display
updatePlayerTurnDisplay();

// Add click listener to each item
items.forEach(item => {
    item.addEventListener("click", handleItemClick);
});

// Add click listener to the play again button
playButton.addEventListener("click", () => {
    location.reload(); // Simple way to restart
});

function handleItemClick(event) {
    const clickedItem = event.target;

    // If the game is not active or the cell is already filled, do nothing
    if (!gameActive || clickedItem.innerHTML !== "") {
        return;
    }

    // Place the current player's mark
    clickedItem.innerHTML = currentPlayer;

    // Check for win or tie
    if (checkWin()) {
        endGame(false); // Pass false, as it's a win
    } else if (checkTie()) {
        endGame(true); // Pass true, as it's a tie
    } else {
        // Switch player
        switchPlayer();
        // Update player turn display
        updatePlayerTurnDisplay();
    }
}

function checkWin() {
    // Get the current state of the board
    const boardState = Array.from(items).map(item => item.innerHTML);

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        // Check if the combination is filled by the current player
        if (boardState[a] === currentPlayer && boardState[b] === currentPlayer && boardState[c] === currentPlayer) {
            // Highlight the winning combination
            items[a].style.backgroundColor = "#cbdaf1";
            items[b].style.backgroundColor = "#cbdaf1";
            items[c].style.backgroundColor = "#cbdaf1";
            return true; // Found a win
        }
    }
    return false; // No win found
}

function checkTie() {
    // Check if all cells are filled
    return Array.from(items).every(item => item.innerHTML !== "");
}

function endGame(isTie) {
    gameActive = false; // Stop the game

    if (isTie) {
        wonDisplay.innerHTML = "It's a Tie!";
    } else {
        wonDisplay.innerHTML = `${currentPlayer} Won!`;
    }

    playButton.style.display = "block"; // Show the play again button

    // Optional: Disable further clicks on cells (already handled by gameActive check)
    // items.forEach(item => item.removeEventListener("click", handleItemClick)); // Or similar
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updatePlayerTurnDisplay() {
    if (currentPlayer === 'X') {
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

// Initial state setup (optional, but good practice)
// Ensure play button is hidden initially
playButton.style.display = "none";
```