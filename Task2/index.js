let playerTurn = 'X';
let drawCheck = 0;
let status = document.querySelector('.state');
let result = document.querySelector('.result');

// creates board rows data
class boardCells {
    constructor() {
        this.value = ['', '', ''];
    }
}

let topRow = new boardCells;
let midRow = new boardCells;
let botRow = new boardCells;

// creates board
let boardValues = [topRow, midRow, botRow];

const switchTurn = () => {
        if (playerTurn === 'X') {
            playerTurn = 'O';
        } else {
            playerTurn = 'X';
        }
}

const victoryCheck = () => {
    for (i = 0; i < boardValues.length; i++) {
        //horizontal check
        let horizontalVictory = "";
        let drawCheck = "";
        for (a = 0; a < boardValues[i].value.length; a++) {
            horizontalVictory += boardValues[i].value[a];
            //vertical check
            if (boardValues[0].value[a] !== "" &&
                boardValues[1].value[a] !== "" &&
                boardValues[2].value[a] !== "" &&  
                boardValues[0].value[a] === boardValues[1].value[a] && 
                boardValues[0].value[a] === boardValues[2].value[a]
                ) {
                    result.style.display = 'block';
                    result.textContent = `Winner: ${boardValues[0].value[a]}`
            }
            //diagonal left
            if (boardValues[0].value[0] !== "" &&
                boardValues[1].value[1] !== "" &&
                boardValues[2].value[2] !== "" &&  
                boardValues[0].value[a] === boardValues[1].value[a + 1] && 
                boardValues[0].value[a] === boardValues[2].value[a + 2]
                ) {
                    result.style.display = 'block';
                    result.textContent = `Winner: ${boardValues[0].value[0]}`
            //diagonal right
            } else if (
                boardValues[0].value[2] !== "" &&
                boardValues[1].value[1] !== "" &&
                boardValues[2].value[0] !== "" &&  
                boardValues[0].value[a] === boardValues[1].value[a - 1] && 
                boardValues[0].value[a] === boardValues[2].value[a - 2]
                ) {
                    result.style.display = 'block';
                    result.textContent = `Winner: ${boardValues[0].value[2]}`
            }
        }
        //horizontal check
        if (horizontalVictory === "XXX" || horizontalVictory === "OOO") {
            result.style.display = 'block';
            result.textContent = `Winner: ${horizontalVictory.substring(0, 1)}`
        }

    }
}

//generates board cells and creates functionality for cells
const cellGenerator = () => {
    for (i = 0; i < boardValues.length; i++) {
        let row = document.querySelector(`.row${i + 1}`);
    
        for (a = 0; a < 3; a++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.classList.add(`cell${i}${a}`)
            row.appendChild(cell);
            cell.onclick = () => {
                if (boardValues[cell.className.substring(9, 10)].value[cell.className.substring(10)] === "") {
                    boardValues[cell.className.substring(9, 10)].value[cell.className.substring(10)] = playerTurn;
                    cell.textContent = boardValues[cell.className.substring(9, 10)].value[cell.className.substring(10)];
                    switchTurn();
                    victoryCheck();
                    status.textContent = `Turn: ${playerTurn}`;
                    drawCheck += 1;
                    //draw check
                    if (drawCheck === 9) {
                        result.style.display = 'block';
                        result.textContent = `Winner: ‘’`
                    }
                }
            }
        }
    }
}

// reset the board on click
result.onclick = () => {
    for (i = 0; i < boardValues.length; i++) {
        for (a = 0; a < boardValues[i].value.length; a++) {
            boardValues[i].value[a] = "";
        }
        let row = document.querySelector(`.row${i + 1}`);
        row.textContent = "";
    }
    playerTurn = "X";
    drawCheck = 0;
    status.textContent = `Turn: ${playerTurn}`
    cellGenerator();
    result.style.display = 'none';
}

cellGenerator();