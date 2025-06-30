```javascript
let x = document.querySelectorAll(".items");
let btnx = document.querySelector("#btnx");
let btno = document.querySelector("#btno");
let temp = 0;
let won = document.querySelector("#won");
let play = document.querySelector(".play");

x.forEach(element => {
    element.addEventListener("click", function() {
        if (temp === 0) {
            element.innerHTML = "X";
            btnx.style.backgroundColor = "transparent";
            btno.style.backgroundColor = "#e2e8f0";
            btno.style.color = "#1e293b";
            btnx.style.color = "white";
            temp = 1;
            Gamelogic();
        } else {
            element.innerHTML = "O";
            btnx.style.backgroundColor = "#e2e8f0";
            btno.style.backgroundColor = "transparent";
            btnx.style.color = "#1e293b";
            btno.style.color = "white";
            temp = 0;
            Gamelogic();
        }
    });
});

function Gamelogic() {
    let board = ["", "", "", "", "", "", "", "", ""];
    x.forEach((item,index) => board[index] = item.innerText);

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    let winner = null;
    winningConditions.forEach(condition => {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
        }
    });

    if (winner) {
        won.innerHTML = `${winner} Won`;
        winningConditions.forEach(condition => {
            const [a, b, c] = condition;
            if (board[a] === winner && board[a] === board[b] && board[a] === board[c]) {
                x[a].style.backgroundColor = "#cbdaf1";
                x[b].style.backgroundColor = "#cbdaf1";
                x[c].style.backgroundColor = "#cbdaf1";
            }
        });
        play.style.display = "block";
        x.forEach(element => element.removeEventListener("click", element.onclick));
    }
}

play.addEventListener("click", function() {
    location.reload();
});
```