```javascript
const x = document.querySelectorAll(".items");
const btnx = document.querySelector("#btnx");
const btno = document.querySelector("#btno");
let currentPlayer = "X";
const won = document.querySelector("#won");
const playAgain = document.querySelector(".play");

x.forEach(element => {
  element.addEventListener("click", handleClick);
});

function handleClick(event) {
  const element = event.target;
  if (element.innerText === "") {
    element.innerText = currentPlayer;
    updateButtonStyles();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    checkWinner();
  }
}

function updateButtonStyles() {
  btnx.style.backgroundColor = currentPlayer === "X" ? "transparent" : "#e2e8f0";
  btno.style.backgroundColor = currentPlayer === "O" ? "transparent" : "#e2e8f0";
  btnx.style.color = currentPlayer === "X" ? "white" : "#1e293b";
  btno.style.color = currentPlayer === "O" ? "white" : "#1e293b";
}


function checkWinner() {
  const winningCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    const itemA = document.getElementById(`item${a}`);
    const itemB = document.getElementById(`item${b}`);
    const itemC = document.getElementById(`item${c}`);

    if (itemA.innerText !== "" && itemA.innerText === itemB.innerText && itemB.innerText === itemC.innerText) {
      won.innerText = `${itemA.innerText} Won`;
      highlightWinningCombination([itemA, itemB, itemC]);
      playAgain.style.display = "block";
      disableBoard();
      return;
    }
  }
  
  const allFilled = [...x].every(item => item.innerText !== "");
  if(allFilled){
    won.innerText = "It's a Draw!";
    playAgain.style.display = "block";
    disableBoard();
  }
}

function highlightWinningCombination(items) {
  items.forEach(item => item.style.backgroundColor = "#cbdaf1");
}

function disableBoard(){
    x.forEach(item => item.removeEventListener("click",handleClick));
}

playAgain.addEventListener("click", () => location.reload());
```