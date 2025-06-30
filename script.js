```javascript
const x = document.querySelectorAll(".items");
const btnx = document.querySelector("#btnx");
const btno = document.querySelector("#btno");
let temp = 0;
const won = document.querySelector("#won");
const playAgain = document.querySelector(".play");

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

x.forEach((element, index) => {
  element.addEventListener("click", () => {
    if (element.innerText !== "" || won.innerText !== "") return;

    const currentPlayer = temp === 0 ? "X" : "O";
    element.innerText = currentPlayer;

    btnx.style.backgroundColor = temp === 0 ? "transparent" : "#e2e8f0";
    btno.style.backgroundColor = temp === 0 ? "#e2e8f0" : "transparent";
    btnx.style.color = temp === 0 ? "white" : "#1e293b";
    btno.style.color = temp === 0 ? "#1e293b" : "white";

    temp = 1 - temp; 

    checkWinner();
  });
});

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    const aValue = x[a].innerText;
    const bValue = x[b].innerText;
    const cValue = x[c].innerText;

    if (aValue !== "" && aValue === bValue && aValue === cValue) {
      won.innerText = `${aValue} Won`;
      highlightWinningCombination(combination);
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

function highlightWinningCombination(combination) {
  combination.forEach(index => {
    x[index].style.backgroundColor = "#cbdaf1";
  });
}

function disableBoard(){
    x.forEach(element => element.removeEventListener("click", element.onclick));
}

playAgain.addEventListener("click", () => {
  location.reload();
});
```