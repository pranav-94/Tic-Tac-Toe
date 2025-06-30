```javascript
let x = document.querySelectorAll(".items");
let btnx = document.querySelector("#btnx");
let btno = document.querySelector("#btno");
let temp = 0;
let won = document.querySelector("#won");
let play = document.querySelector(".play");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";

x.forEach((element, index) => {
    element.addEventListener("click", () => {
        if (board[index] === "" && won.innerHTML === "") {
            board[index] = currentPlayer;
            element.innerHTML = currentPlayer;
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateButtonStyles();
            checkWinner();
        }
    });
});

function updateButtonStyles() {
    btnx.style.backgroundColor = currentPlayer === "X" ? "transparent" : "#e2e8f0";
    btno.style.backgroundColor = currentPlayer === "O" ? "transparent" : "#e2e8f0";
    btnx.style.color = currentPlayer === "X" ? "white" : "#1e293b";
    btno.style.color = currentPlayer === "O" ? "white" : "#1e293b";
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            won.innerHTML = board[a] + " Won";
            highlightWinningLine(pattern);
            play.style.display = "block";
            x.forEach(element => element.removeEventListener("click", element.onclick));
            return;
        }
    }

    if (!board.includes("")) {
        won.innerHTML = "It's a Draw!";
        play.style.display = "block";
        x.forEach(element => element.removeEventListener("click", element.onclick));
    }
}

function highlightWinningLine(pattern) {
    pattern.forEach(index => {
        x[index].style.backgroundColor = "#cbdaf1";
    });
}

play.addEventListener("click", () => {
    location.reload();
});

```