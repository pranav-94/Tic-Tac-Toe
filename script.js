```javascript
const cells = document.querySelectorAll('.items');
const xButton = document.querySelector('#btnx');
const oButton = document.querySelector('#btno');
const winnerDisplay = document.querySelector('#won');
const playAgainButton = document.querySelector('.play');
let currentPlayer = 'X';

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

function handleClick(event) {
    const cell = event.target;
    if (cell.textContent === '' && !winnerDisplay.textContent) {
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateButtonStyles();
        checkWinner();
    }
}

function updateButtonStyles() {
    xButton.style.backgroundColor = currentPlayer === 'X' ? 'transparent' : '#e2e8f0';
    oButton.style.backgroundColor = currentPlayer === 'O' ? 'transparent' : '#e2e8f0';
    xButton.style.color = currentPlayer === 'X' ? 'white' : '#1e293b';
    oButton.style.color = currentPlayer === 'O' ? 'white' : '#1e293b';
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            winnerDisplay.textContent = `${cells[a].textContent} Won`;
            highlightWinningCells(combination);
            playAgainButton.style.display = 'block';
            cells.forEach(cell => cell.removeEventListener('click', handleClick));
            return;
        }
    }

    if (!cells.some(cell => cell.textContent === '')) {
        winnerDisplay.textContent = "It's a Draw!";
        playAgainButton.style.display = 'block';
        cells.forEach(cell => cell.removeEventListener('click', handleClick));
    }
}


function highlightWinningCells(combination) {
    combination.forEach(index => {
        cells[index].style.backgroundColor = '#cbdaf1';
    });
}

playAgainButton.addEventListener('click', () => {
    location.reload();
});

```