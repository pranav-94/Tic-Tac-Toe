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
            element.textContent = "X";
            btnx.style.backgroundColor = "transparent";
            btno.style.backgroundColor = "#e2e8f0";
            btno.style.color = "#1e293b";
            btnx.style.color = "white";
            temp = 1;
        } else {
            element.textContent = "O";
            btnx.style.backgroundColor = "#e2e8f0";
            btno.style.backgroundColor = "transparent";
            btnx.style.color = "#1e293b";
            btno.style.color = "white";
            temp = 0;
        }
        Gamelogic();
    });
});

function checkWin(player) {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return document.getElementById(`item${index}`).textContent === player;
        });
    });
}

function Gamelogic() {
    if (checkWin("X")) {
        won.textContent = "X Won";
        highlightWin("X");
        play.style.display = "block";
        disableBoard();
    } else if (checkWin("O")) {
        won.textContent = "O Won";
        highlightWin("O");
        play.style.display = "block";
        disableBoard();
    }
}

function highlightWin(player) {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];
    const winningCombo = winningCombinations.find(combo => combo.every(i => document.getElementById(`item${i}`).textContent === player));
    winningCombo.forEach(index => document.getElementById(`item${index}`).style.backgroundColor = "#cbdaf1");
}

function disableBoard() {
    x.forEach(element => element.removeEventListener("click", element.onclick));
}

play.addEventListener("click", () => location.reload());

```