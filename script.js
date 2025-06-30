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
        } else {
            element.innerHTML = "O";
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
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7]             // Diagonals
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => {
            const item = document.querySelector(`#item${index}`);
            return item.innerText === player;
        });
    });
}

function Gamelogic() {
    const winningPlayer = checkWin("X") ? "X" : (checkWin("O") ? "O" : null);

    if (winningPlayer) {
        won.innerHTML = `${winningPlayer} Won`;
        const winningCombination = getWinningCombination(winningPlayer);
        winningCombination.forEach(index => {
            document.querySelector(`#item${index}`).style.backgroundColor = "#cbdaf1";
        });
        play.style.display = "block";
        disableBoard();
    }
}

function getWinningCombination(player) {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    for (const combination of winningCombinations) {
        if (combination.every(index => document.querySelector(`#item${index}`).innerText === player)) {
            return combination;
        }
    }
    return [];
}

function disableBoard() {
    x.forEach(element => {
        element.removeEventListener("click", element._clickListener);
    });
}

play.addEventListener("click", function() {
    location.reload();
});

```