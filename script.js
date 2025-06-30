```javascript
let x = document.querySelectorAll(".items");
let btnx = document.querySelector("#btnx");
let btno = document.querySelector("#btno");
let temp = 0;
let won = document.querySelector("#won");
let play = document.querySelector(".play");

x.forEach(element => {
    element.addEventListener("click", function() {
        if (temp == 0) {
            element.innerHTML = "X";
            btnx.style.backgroundColor = "transparent";
            btno.style.backgroundColor = "#e2e8f0";
            btno.style.color = "#1e293b";
            btnx.style.color = "white";
            temp = 1;
            Gamelogic();
            play.addEventListener("click", function() {
                location.reload();
            });
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
    let item1 = document.querySelector("#item1");
    let item2 = document.querySelector("#item2");
    let item3 = document.querySelector("#item3");
    let item4 = document.querySelector("#item4");
    let item5 = document.querySelector("#item5");
    let item6 = document.querySelector("#item6");
    let item7 = document.querySelector("#item7");
    let item8 = document.querySelector("#item8");
    let item9 = document.querySelector("#item9");

    let winConditions = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    function checkWin(player) {
        for (let condition of winConditions) {
            let itemA = document.getElementById(`item${condition[0]}`);
            let itemB = document.getElementById(`item${condition[1]}`);
            let itemC = document.getElementById(`item${condition[2]}`);
            if (itemA.innerText === player && itemB.innerText === player && itemC.innerText === player) {
                itemA.style.backgroundColor = "#cbdaf1";
                itemB.style.backgroundColor = "#cbdaf1";
                itemC.style.backgroundColor = "#cbdaf1";
                won.innerHTML = `${player} Won`;
                play.style.display = "block";
                return true;
            }
        }
        return false;
    }

    if (checkWin("X") || checkWin("O")) {
        x.forEach(element => {
            if (element.innerHTML === "") {
                element.removeEventListener("click", element.onclick);
            }
        });
    }
}
```