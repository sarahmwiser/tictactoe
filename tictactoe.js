window.addEventListener('DOMContentLoaded', () => {
    let cells = Array.from(document.querySelectorAll('.cell'));
    let playerDisplay = document.querySelector('.display-player');
    let resetButton = document.querySelector('#reset');
    let announcer = document.querySelector('.announcer');

    let board = ['','','','','','','','',''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const playerXWon = 'playerXWon';
    const playerOWon = 'playerOWon';
    const TIE = 'Tie';
    
    // this is a list of all the winning combinations

    let winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    
        // this is to figure out if x or o has won 

    function handleResultValidation(){
        let roundWon = false;
        for(let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        if (roundWon) {
            announce(currentPlayer === 'X' ? playerXWon : playerOWon);
            isGameActive = false;
            return;
        }
        if (!board.includes(''))  // this is to say if no more open spots then it is a tie
        announce(TIE);
    }
    
        //this is to announce who won or if tie

    const announce = (type) => {
        switch(type){
            case playerOWon:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case playerXWon:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won'; 
                break;
            case TIE:
                announcer.innerHTML = 'This is a tie game'; 
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (cell) => {
        if (cell.innerText === 'X' || cell.innerText === 'O'){
            return false;
        }
        return true;
    }

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    // this was used to switch between players

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (cell, index) => {
        if(isValidAction(cell) && isGameActive) {
            cell.innerText = currentPlayer;
            cell.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }           // this is used to reset the board
    const resetBoard = () => {
        board = ['','','','','','','','',''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('playerX');
            cell.classList.remove('playerO');
        });
    }

    cells.forEach( (cell, index) => {
        cell.addEventListener('click', () => userAction(cell, index));
    })

    resetButton.addEventListener('click', resetBoard);
})
