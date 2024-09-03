let player = 'x';

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('container');
    const restartButton = document.getElementById('restartButton');

    function game() {
        for (let i = 0; i < 400; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('id', i);
            cell.setAttribute("onClick", `positiondetector(${i})`);
            cell.dataset.index = i;
            gameBoard.appendChild(cell);
        }
        // loadGameFromStorage();
    }
    game();
    restartButton.addEventListener('click', restartGame);


});

function checkHorizontalLine(id) {
    const board = Array.from(document.getElementsByClassName('cell')).map(cell => cell.innerHTML);
    const index = parseInt(id);
    const symbol = board[index];
    const rowStart = Math.floor(index / 20) * 20;  
    // console.log(board[index]);

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
    //  console.log(colStart);
    //  console.log(index);

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
    // Array.from(...): Converts the HTMLCollection into an array.

    //This line creates an array called board that contains the current
    // state of all the cells on the board. Each cell's inner HTML (which is either 'X', 'O', or an empty string)
    // is mapped to the array

    const index = parseInt(id);
    const symbol = board[index];
    const size = 20; // Board is 20x20

    // Check diagonal from top-left to bottom-right
    let row = Math.floor(index / size);
    let col = index % size;

    // Move to the top-left most position of the diagonal
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

    // Check diagonal from top-right to bottom-left
    row = Math.floor(index / size);
    col = index % size;

    // Move to the top-right most position of the diagonal
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
        element.innerHTML = player; // Display the current player's symbol first

        // Now check for a winning condition or a draw
        if (checkHorizontalLine(id) || checkVerticalLine(id) || checkDiagonalLine(id)) {
            setTimeout(() => {
                alert(`Le joueur ${player} a gagné !`);
                restartGame();
            }, 10); // Adding a slight delay to ensure the last move is shown
        } else if (checkDraw()) {
            setTimeout(() => {
                alert("Match nul !");
                restartGame();
            }, 10);
        } else {
            player = player === 'x' ? 'o' : 'x'; // Switch player
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
    
    //Creates an array of the current cell contents.
    // Converts this array into a JSON string.
    // Stores the JSON string in localStorage under the key 'ticTacToeState'
}
