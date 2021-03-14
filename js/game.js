var Game = new Object();
window.onload = function () {
    loadGame();
}

function loadGame() {
    var storage = window.localStorage;
    loadGameData(storage);
    renderGame();
    startGame();
}

function loadGameData(storage) {
    loadGameConfig(storage);
    loadPlayerConfig(storage);
    loadBoardConfig(storage);
}


function loadGameConfig(storage) {
    Game.playerCount = storage.getItem("playerCount");
    Game.time = storage.getItem("time");
    Game.turn = storage.getItem("turn");
    Game.playerCount = storage.getItem("playerCount");
    Game.maxColumns = storage.getItem("maxColumns");
    Game.maxRows = storage.getItem("maxRows");
}

function loadPlayerConfig(storage) {
    Game.players = new Array();

    for (let i = 1; i <= Game.playerCount; i++) {
        var player = new Object();
        player.ID = i;
        player.Name = storage.getItem("playerName" + i);
        player.Color = storage.getItem("playerColor" + i);
        Game.players.push(player);
    }
}

function loadBoardConfig(storage) {
    var board = new Array();
    var boardString = storage.getItem("board");
    var columnsString = boardString.split('|');

    for (let i = 0; i < columnsString.length; i++) {
        var rowsString = columnsString[i].split('-');
        var column = new Array();
        for (let j = 0; j < rowsString.length; j++) {
            var row = new Object();
            var player = Game.players.find(x => x.ID == parseInt(rowsString[j]));
            row.Owner = player;
            column.push(row);
        }
        board.push(column);
    }

    Game.board = board;
}


function renderGame() {
    var html = '';
    board = document.getElementsByClassName('board');
    boardHTML = document.getElementsByClassName('game');
    for (var i = 0; i < board.length; i++) {
        this.board.length === 10 ? html += '<div id="column' + i + '" class="column3">'
            : html += '<div id="column' + i + '"class="column">';
        for (var j = this.board[i] - 1; j >= 0; j--) {
            html += '<div id="slot' + i + j + '" class="slot';
            if (this.board[i][j]) { html += ' ' + this.board[i][j]; }
            html += '"></div>';
        }
        html += '></div>';
    }
    this.boardHTML.innerHTML = html;
    this.bindColumnHandlers();


    /*var table = document.createElement("table");

    for (let i = 0; i < Game.board.length; i++) {
        var column = document.createElement("tr");

        for (let j = 0; j < Game.board[i].length; j++) {
            var row = document.createElement("td");
            var circle = document.createElement("div");
            circle.classList.add("spot");
            circle.style.backgroundColor = Game.board[i].row[j].Owner.Color;
            row.append(circle);
            column.append(row);
        }
        table.append(column);
    }

    boardElement.append(table);*/
}

function winner() {
    var saved = false;
    var winner = function (playersNames) {
        status.className = ' ';
        boardHTML.className += 'disabled';
        if (saved) {
            winnerPoster.innerHTML = '';
            messagePoster.innerHTML = '¡Saved the game!';
            resetButton.innerHTML = 'Accept';
        } else {
            var gameOver = null;
            gameOver = true;
            if (playerNames) {
                playerNames = (playerNames == 'p1') ? player.p1 : player.p2;
                winnerPoster.innerHTML = playerNames;
                messagePoster.innerHTML = 'The winner is ' + players + '!!!!';
            } else {
                winnerPoster.innerHTML = 'No player has won!';
                messagePoster.innerHTML = 'It\'s a TIE!';
            }
            resetButton.innerHTML = '¡Play again!';
        }
    }
}

function check() {

    //Chequeo de forma vertical
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j]) {
                if (board[i][j] === (board[i][j + 1]) && board[i][j] === board[i][j + 2] &&
                    board[i][j] === (board[i][j + 3])) {
                    winner(board[i][j]);
                }
            }
        }
    }

    for (var i = 0; i < board.length - 3; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j]) {
                //Chequeo de forma horizontal
                if (board[i][j] === (board[i + 1][j]) && board[i][j] === board[i + 2][j] &&
                    board[i][j] === (board[i + 3][j])) {
                    winner(board[i][j]);
                }

                //Chequeo de forma diagonal en incremento
                if (board[i][j] === (board[i + 1][j + 1]) && board[i][j] === board[i + 2][j + 2] &&
                    board[i][j] === (board[i + 3][j + 3])) {
                    winner(board[i][j]);
                }
            }
        }
    }

    //Chequeo de forma diagonal en descreciente
    for (var i = 0; i < board.length - 3; i++) {
        for (var j = 3; j < board[i].length; j++) {
            if (board[i][j]) {
                if (board[i][j] === (board[i + 1][j - 1]) && board[i][j] === board[i + 2][j - 2] &&
                    board[i][j] === (board[i + 3][j - 3])) {
                    winner(board[i][j]);
                }
            }
        }
    }

}


function startGame() {

}