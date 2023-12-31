let board;
let playerOne = "0";
let playerTwo = "X";
let currPlayer = playerOne;
let gameOver;

let playerOneScore = document.getElementById("playerOneScore");
let oneScore = 0;
let playerTwoScore = document.getElementById("playerTwoScore");
let twoScore = 0;

let turn = document.getElementById("turn");

window.onload = function() {
    setGame();
    turn.innerHTML = "Player One's Turn";
}

function setGame() {
    gameOver = false;
    playerOneScore.innerHTML = oneScore;
    playerTwoScore.innerHTML = twoScore;

    board = [
        [' ', ' ', ' ',],
        [' ', ' ', ' ',],
        [' ', ' ', ' ',]
    ]

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", setTile);
            document.getElementById("board").append(tile);
        }
    }
}

function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' ') {
        return;
    }

    board[r][c] = currPlayer;
    this.innerText = currPlayer;

    if (currPlayer == playerOne) {
        currPlayer = playerTwo;
        turn.innerHTML = "Player Two's Turn";
    } else {
        currPlayer = playerOne;
        turn.innerHTML = "Player One's Turn";
    }

    checkWinner();
}

function checkWinner() {
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            for (let x = 0; x < 3; x++) {
                let tile = document.getElementById(r.toString() + "-" + x.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ' ') {
            for (let x = 0; x < 3; x++) {
                let tile = document.getElementById(x.toString() + "-" + c.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' '){
        for (let x = 0; x < 3; x++) {
            let tile = document.getElementById(x.toString() + "-" + x.toString());
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }

    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        let tile = document.getElementById("0-2");
        tile.classList.add("winner");

        tile = document.getElementById("1-1");
        tile.classList.add("winner");

        tile = document.getElementById("2-0");
        tile.classList.add("winner");

        gameOver = true;
        return;
    }
}

function newGame() {

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.remove();
        }
    }

    if (gameOver) {

        gameOver = false;

        if (currPlayer == playerTwo) {
            oneScore += 1; 
        } else {
            twoScore += 1;
        }
    }

    setGame();
}