```javascript
const board = document.querySelectorAll('.items');
const xButton = document.querySelector('#btnx');
const oButton = document.querySelector('#btno');
const winnerDisplay = document.querySelector('#won');
const playAgainButton = document.querySelector('.play');
let currentPlayer = 'X';

board.forEach(item => {
    item.addEventListener('click', handleClick);
});

function handleClick(event) {
    if (event.target.textContent !== '') return;
    event.target.textContent = currentPlayer;
    switchPlayer();
    checkWinner();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
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
        if (board[a].textContent && board[a].textContent === board[b].textContent && board[a].textContent === board[c].textContent) {
            winnerDisplay.textContent = `${board[a].textContent} Won`;
            highlightWinningCombination(combination);
            disableBoard();
            playAgainButton.style.display = 'block';
            return;
        }
    }
    if (Array.from(board).every(item => item.textContent !== '')) {
        winnerDisplay.textContent = "It's a Draw!";
        playAgainButton.style.display = 'block';
    }
}

function highlightWinningCombination(combination) {
    combination.forEach(index => {
        board[index].style.backgroundColor = '#cbdaf1';
    });
}

function disableBoard() {
    board.forEach(item => item.removeEventListener('click', handleClick));
}

playAgainButton.addEventListener('click', () => {
    location.reload();
});
```