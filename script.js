let player = 'x';
let playerXScore = 0;
let playerOScore = 0;

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('container');
    const restartButton = document.getElementById('restartButton');

    // Load scores from localStorage
    loadScoresFromStorage();

    function game() {
        for (let i = 0; i < 400; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('id', i);
            cell.setAttribute("onClick", `positiondetector(${i})`);
            cell.dataset.index = i;
            gameBoard.appendChild(cell);
        }
    }
    game();
    restartButton.addEventListener('click', restartGame);
});

function checkHorizontalLine(id) {
    const board = Array.from(document.getElementsByClassName('cell')).map(cell => cell.innerHTML);
    const index = parseInt(id);
    const symbol = board[index];
    const rowStart = Math.floor(index / 20) * 20;

    let count = 0;
    for (let i = 0; i < 20; i++) {
        if (board[rowStart + i] === symbol) {
            count++;
            if (count === 5) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

function checkVerticalLine(id) {
    const board = Array.from(document.getElementsByClassName('cell')).map(cell => cell.innerHTML);
    const index = parseInt(id);
    const symbol = board[index];
    const colStart = index % 20;

    let count = 0;
    for (let i = 0; i < 400; i += 20) {
        if (board[colStart + i] === symbol) {
            count++;
            if (count === 5) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

function checkDiagonalLine(id) {
    const board = Array.from(document.getElementsByClassName('cell')).map(cell => cell.innerHTML);
    const index = parseInt(id);
    const symbol = board[index];
    const size = 20;

    let row = Math.floor(index / size);
    let col = index % size;

    while (row > 0 && col > 0) {
        row--;
        col--;
    }

    let count = 0;
    while (row < size && col < size) {
        if (board[row * size + col] === symbol) {
            count++;
            if (count === 5) return true;
        } else {
            count = 0;
        }
        row++;
        col++;
    }

    row = Math.floor(index / size);
    col = index % size;

    while (row > 0 && col < size - 1) {
        row--;
        col++;
    }

    count = 0;
    while (row < size && col >= 0) {
        if (board[row * size + col] === symbol) {
            count++;
            if (count === 5) return true;
        } else {
            count = 0;
        }
        row++;
        col--;
    }

    return false;
}

function positiondetector(id) {
    let element = document.getElementById(id);

    if (element.innerHTML === '') {
        element.innerHTML = player;

        if (checkHorizontalLine(id) || checkVerticalLine(id) || checkDiagonalLine(id)) {
            if (player === 'x') {
                playerXScore++;
                localStorage.setItem('playerXScore', playerXScore);
            } else {
                playerOScore++;
                localStorage.setItem('playerOScore', playerOScore);
            }
            updateScoreBoard();
            setTimeout(() => {
                alert(`Le joueur ${player} a gagné !`);
                // restartGame();
            }, 10);
        } else if (checkDraw()) {
            setTimeout(() => {
                alert("Match nul !");
                restartGame();
            }, 10);
        } else {
            player = player === 'x' ? 'o' : 'x';
        }
        saveGameToStorage();
    }
}

function checkDraw() {
    return Array.from(document.getElementsByClassName('cell')).every(cell => cell.innerHTML !== '');
}

function restartGame() {
    Array.from(document.getElementsByClassName('cell')).forEach(cell => cell.innerHTML = '');
    player = 'x';
    saveGameToStorage();
}

function saveGameToStorage() {
    const cells = Array.from(document.getElementsByClassName('cell')).map(cell => cell.innerHTML);
    localStorage.setItem('ticTacToeState', JSON.stringify(cells));
    localStorage.setItem('ticTacToePlayer', player);
}

function loadScoresFromStorage() {
    playerXScore = parseInt(localStorage.getItem('playerXScore')) || 0;
    playerOScore = parseInt(localStorage.getItem('playerOScore')) || 0;
    updateScoreBoard();
}

function updateScoreBoard() {
    document.getElementById('scoreX').innerText = playerXScore;
    document.getElementById('scoreO').innerText = playerOScore;
}
