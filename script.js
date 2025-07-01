```javascript
let items = document.querySelectorAll(".items");
let btnx = document.querySelector("#btnx");
let btno = document.querySelector("#btno");
let wonDisplay = document.querySelector("#won");
let playButton = document.querySelector(".play");

let currentPlayer = 'X';
let gameActive = true;

// Define winning combinations (indices of the items NodeList)
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

// Initial button styles
updateTurnIndicator();

items.forEach(item => {
    item.addEventListener("click", handleItemClick);
});

playButton.addEventListener("click", restartGame);

function handleItemClick(event) {
    const clickedItem = event.target;

    // If the item is already filled or the game is not active, do nothing
    if (clickedItem.innerHTML !== "" || !gameActive) {
        return;
    }

    // Place the current player's mark
    clickedItem.innerHTML = currentPlayer;

    // Check for win or tie
    if (checkWin()) {
        endGame(currentPlayer);
    } else if (checkTie()) {
        endGame(null); // Pass null for a tie
    } else {
        // Switch player and update turn indicator
        switchPlayer();
        updateTurnIndicator();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

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

function checkWin() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        const itemA = items[a];
        const itemB = items[b];
        const itemC = items[c];

        // Check if the cells are not empty and have the same content
        if (itemA.innerHTML !== "" && itemA.innerHTML === itemB.innerHTML && itemA.innerHTML === itemC.innerHTML) {
            // Highlight winning cells
            itemA.style.backgroundColor = "#cbdaf1";
            itemB.style.backgroundColor = "#cbdaf1";
            itemC.style.backgroundColor = "#cbdaf1";
            return true; // Found a winner
        }
    }
    return false; // No winner yet
}

function checkTie() {
    // Check if all cells are filled
    return Array.from(items).every(item => item.innerHTML !== "");
}

function endGame(winner) {
    gameActive = false; // Stop the game

    if (winner) {
        wonDisplay.innerHTML = `${winner} Won`;
    } else {
        wonDisplay.innerHTML = "It's a Tie!";
    }

    playButton.style.display = "block"; // Show restart button

    // Optionally, disable clicks on all cells explicitly (though gameActive check handles this)
    // items.forEach(item => item.removeEventListener("click", handleItemClick)); // Or similar
}

function restartGame() {
    // Reset game state
    currentPlayer = 'X';
    gameActive = true;
    wonDisplay.innerHTML = ""; // Clear winner message
    playButton.style.display = "none"; // Hide restart button

    // Clear board and reset styles
    items.forEach(item => {
        item.innerHTML = "";
        item.style.backgroundColor = ""; // Reset background color
    });

    // Reset turn indicator
    updateTurnIndicator();

    // Ensure event listeners are still active (they are, as we didn't remove them)
}
```