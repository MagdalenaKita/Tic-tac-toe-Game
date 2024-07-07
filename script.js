const playerX = 'X';
const playerO = 'O';
let activeGame = false;
let currentPlayer = playerX;
let movementsArray = ['', '', '', '', '', '', '', '', ''];
const winningVariants = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const playersTurn = document.getElementById('playersTurn');
const winner = document.getElementById('winText');
const newGame = document.getElementById('newGame');
const changePlayersTurn = document.getElementById('changePlayersTurn');
const modal = document.getElementById('modal');
const playerXPoints = document.getElementById('playerXPoints');
const playerOPoints = document.getElementById('playerOPoints');

playerXPoints.textContent = 0;
playerOPoints.textContent = 0;

const startGame = () => {
    cells.forEach(cell => {
        cell.addEventListener('click', drawSymbol, {once: true})
    });
    newGame.addEventListener('click', restartGame);
    changePlayersTurn.addEventListener('click', changePlayer);
    playersTurn.textContent = `Runda gracza ${currentPlayer}`;   
    activeGame = true;    
}

const drawSymbol = (event) => {
    event.target.innerHTML = currentPlayer;
    movementsArray[event.target.id] = currentPlayer;
    changePlayersTurn.removeEventListener('click', changePlayer);
    checkWinner();    
}

const changePlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    playersTurn.textContent = `Runda gracza ${currentPlayer}`;
}

const checkWinner = () => {
    let roundWon = false;    

    for(let i = 0; i < winningVariants.length; i++) {
        const variant = winningVariants[i];
        const cellA = movementsArray[variant[0]];
        const cellB = movementsArray[variant[1]];
        const cellC = movementsArray[variant[2]];

        if(cellA == '' || cellB =='' || cellC == '') {
            continue;
        } 

        if(cellA == cellB && cellB == cellC) {
            cells[variant[0]].classList.add('winCell');
            cells[variant[1]].classList.add('winCell');
            cells[variant[2]].classList.add('winCell');
            roundWon = true;
            break;
        }
    }

    if(roundWon){        
        activeGame = false;
        winner.textContent = `Wygrał gracz ${currentPlayer}`;
        cells.forEach(cell => {
            cell.removeEventListener('click', drawSymbol)
        });

        if(currentPlayer == playerX){
            playerXPoints.textContent++;
        }
        if(currentPlayer == playerO){
            playerOPoints.textContent++;
        }

    } else if(!movementsArray.includes('')){
        activeGame = false;
        winner.textContent = `Remis`;
    } else {
        changePlayer();
    }

    if(!activeGame) {
        modal.classList.remove('displayNone');
        modal.classList.add('modal');
    }
}

const restartGame = () => {
    currentPlayer = playerX;
    movementsArray = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winCell');
    });
    winner.textContent = '';
    activeGame = true;
    modal.classList.remove('modal');
    modal.classList.add('displayNone');
    startGame();
}

startGame();
