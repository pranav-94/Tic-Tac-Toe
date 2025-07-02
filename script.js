```javascript
let x = document.querySelectorAll(".items");
let btnx = document.querySelector("#btnx");
let btno = document.querySelector("#btno");
let temp = 0; // 0 for X, 1 for O
let won = document.querySelector("#won");
let play = document.querySelector(".play");

let gameActive = true; // State variable to track if the game is ongoing

// Define winning conditions (indices of the grid items)
const winningConditions = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6]
];

// Add click listener to each grid item
x.forEach(element => {
    element.addEventListener("click", function() {
        // Check if the game is active and the cell is empty
        if (!gameActive || element.innerHTML !== "") {
            return; // Do nothing if game is over or cell is already filled
        }

        // Place the mark based on the current player (temp)
        if (temp === 0) {
            element.innerHTML = "X";
            // Update turn indicator styles
            btnx.style.backgroundColor = "transparent";
            btno.style.backgroundColor = "#e2e8f0";
            btno.style.color = "#1e293b";
            btnx.style.color = "white";
            temp = 1; // Switch to O's turn
        } else {
            element.innerHTML = "O";
            // Update turn indicator styles
            btnx.style.backgroundColor = "#e2e8f0";
            btno.style.backgroundColor = "transparent";
            btnx.style.color = "#1e293b";
            btno.style.color = "white";
            temp = 0; // Switch to X's turn
        }

        // Check for game outcome (win or tie)
        checkGameOutcome();
    });
});

// Add click listener to the "Play Again" button (only once)
play.addEventListener("click", function() {
    location.reload(); // Reload the page to restart the game
});

function checkGameOutcome() {
    let roundWon = false;

    // Check all winning conditions
    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const a = condition[0];
        const b = condition[1];
        const c = condition[2];

        // Get the content of the three cells in the condition
        const cellA = x[a].innerHTML;
        const cellB = x[b].innerHTML;
        const cellC = x[c].innerHTML;

        // Check if all three cells are the same and not empty
        if (cellA === "" || cellB === "" || cellC === "") {
            continue; // Skip if any cell is empty
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true; // Found a winning combination
            // Highlight the winning cells
            x[a].style.backgroundColor = "#cbdaf1";
            x[b].style.backgroundColor = "#cbdaf1";
            x[c].style.backgroundColor = "#cbdaf1";
            break; // No need to check other conditions
        }
    }

    // Handle game end (win or tie)
    if (roundWon) {
        gameActive = false; // Stop the game
        won.innerHTML = `${x[winningConditions[i][0]].innerHTML} Won`; // Display the winner
        play.style.display = "block"; // Show the play again button
    } else if (Array.from(x).every(cell => cell.innerHTML !== "")) {
        // Check for a tie if no one won and all cells are filled
        gameActive = false; // Stop the game
        won.innerHTML = "Tie"; // Display tie message
        play.style.display = "block"; // Show the play again button
    }
}

// Initial state: X's turn indicator active
btnx.style.backgroundColor = "#e2e8f0";
btnx.style.color = "#1e293b";
btno.style.backgroundColor = "transparent";
btno.style.color = "white";
```