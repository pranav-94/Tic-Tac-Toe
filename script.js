```javascript
let x = document.querySelectorAll(".items");
let btnx = document.querySelector("#btnx");
let btno = document.querySelector("#btno");
let won = document.querySelector("#won");
let play = document.querySelector(".play");

let currentPlayer = 0; // 0 for X, 1 for O
let gameActive = true;
let moves = 0; // Track the number of moves for draw detection

// Define winning combinations using indices of the 'x' NodeList (0-8)
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to handle the end of the game (win or draw)
function endGame(message, combination = null) {
    gameActive = false;
    won