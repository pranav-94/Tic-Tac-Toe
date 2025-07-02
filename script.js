```javascript
let items = document.querySelectorAll(".items");
let btnx = document.querySelector("#btnx");
let btno = document.querySelector("#btno");
let wonDisplay = document.querySelector("#won");
let playAgainButton = document.querySelector(".play");

let currentPlayer = 'X'; // 'X' starts
let gameEnded = false;

// Winning combinations (indices of the items array)
const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initial styling for player turn
btnx.style.backgroundColor = "#e2e8f0";
btnx.style.color = "#1e293b";
btno.style.backgroundColor = "transparent";
btno.style.color = "white";

// Add click listeners to each grid item
items.forEach(item => {
    item.addEventListener("click", handleItemClick);
});

// Add click listener to the play again button
playAgainButton.addEventListener("click", function() {
    location.reload(); // Simple reload to reset the game
});

function handleItemClick() {
    // If the game has ended or the cell is already filled, do nothing
    if (gameEnded || this.textContent !== "") {
        return;
    }

    // Place the current player's mark
    this.textContent = currentPlayer;

    // Check for win or draw
    checkWinOrDraw();

    // Switch player if the game hasn't ended
    if (!gameEnded) {
        switchPlayer();
    }
}

function switchPlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
        btnx.style.backgroundColor = "transparent";
        btnx.style.color = "white";
        btno.style.backgroundColor = "#e2e8f0";
        btno.style.color = "#1e293b";
    } else {
        currentPlayer = 'X';
        btno.style.backgroundColor = "transparent";
        btno.style.color = "white";
        btnx.style.backgroundColor = "#e2e8f0";
        btnx.style.color = "#1e293b";
    }
}

function checkWinOrDraw() {
    let winner = null;

    // Check for a win
    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        const itemA = items[a];
        const itemB = items[b];
        const itemC = items[c];

        if (itemA.textContent !== "" &&
            itemA.textContent === itemB.textContent &&
            itemA.textContent === itemC.textContent) {
            winner = itemA.textContent;
            // Highlight winning cells
            itemA.style.backgroundColor = "#cbdaf1";
            itemB.style.backgroundColor = "#cbdaf1";
            itemC.style.backgroundColor = "#cbdaf1";
            break; // Found a winner, no need to check other combinations
        }
    }

    if (winner) {
        wonDisplay.textContent = `${winner} Won`;
        endGame();
    } else {
        // Check for a draw
        const allFilled = Array.from(items).every(item => item.textContent !== "");
        if (allFilled) {
            wonDisplay.textContent = "Draw";
            endGame();
        }
    }
}

function endGame() {
    gameEnded = true;
    playAgainButton.style.display = "block";
    // Optionally remove event listeners from items to prevent further clicks
    // items.forEach(item => {
    //     item.removeEventListener("click", handleItemClick);
    // });
    // Or simply rely on the `gameEnded` flag check in `handleItemClick`
}

// Initial state: hide play again button
playAgainButton.style.display = "none";
```