let player = 'x';

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('container');
    
    function game() {
        for (let i = 0; i < 400; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('id', i);
            cell.setAttribute("onClick", `positiondetector(${i})`);
            cell.dataset.index = i;
            gameBoard.appendChild(cell);
        }
        // loadGameFromStorage(); // Charger l'état du jeu depuis le stockage local
    }
    game();
});

function checkHorizontalLine(id) {
    const board = Array.from(document.getElementsByClassName('cell')).map(cell => cell.innerHTML);
    const index = parseInt(id);
    const symbol = board[index];
    const rowStart = Math.floor(index / 20) * 20;  // Début de la ligne
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

}


function positiondetector(id) {
    let element = document.getElementById(id);

    if (element.innerHTML === '') {
        element.innerHTML = player;
        // if (checkHorizontalLine(id)) {
        //     alert(`Le joueur ${player} a gagné !`);
        // }
         if (checkVerticalLine(id)) {
            alert(`Le joueur ${player} a gagné !`);
        }
        
        
        else {
            player = player === 'x' ? 'o' : 'x';
        }
        saveGameToStorage();
    }
}


function saveGameToStorage() {
    const cells = Array.from(document.getElementsByClassName('cell')).map(cell => cell.innerHTML);
    localStorage.setItem('ticTacToeState', JSON.stringify(cells));
    localStorage.setItem('ticTacToePlayer', player);
    
    //Creates an array of the current cell contents.
    // Converts this array into a JSON string.
    // Stores the JSON string in localStorage under the key 'ticTacToeState'
}

// function loadGameFromStorage() {
//     const savedState = localStorage.getItem('ticTacToeState');
//     const savedPlayer = localStorage.getItem('ticTacToePlayer');
    
//     if (savedState && savedPlayer) {
//         const cells = JSON.parse(savedState);
//         cells.forEach((value, index) => {
//             document.getElementById(index).innerHTML = value;
//         });
//         player = savedPlayer;
//     }
// }