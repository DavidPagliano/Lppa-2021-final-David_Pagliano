var Game = new Object();

var coinRadius = 25;

var timerInterval;

window.onload = function () {
    loadGame();
}

function loadGame() {
    var storage = window.localStorage;
    loadGameData(storage);
    startRendering();
    startGame();
}

function loadGameData(storage) {
    loadGameConfig(storage);
    loadPlayerConfig(storage);
    loadBoardConfig(storage);
}


function loadGameConfig(storage) {
    Game.playerCount = (storage.getItem("playerCount"));
    Game.time = (storage.getItem("time"));
    Game.turn = parseInt(storage.getItem("turn"));
    Game.playerCount = parseInt(storage.getItem("playerCount"));
    Game.maxColumns = parseInt(storage.getItem("maxColumns"));
    Game.maxRows = parseInt(storage.getItem("maxRows"));
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
    var columnsString = boardString.split("|");

    for (let i = 0; i < columnsString.length; i++) {
        var rowsString = columnsString[i].split("-");
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

function startRendering() {
    initializeCanvas();
    initializeTurn();
    renderGame();
}

function initializeCanvas() {
    document.getElementById("board").addEventListener("click", function (event) {
        var elem = document.getElementById("board");
        var elemLeft = elem.offsetLeft + elem.clientLeft,
            elemTop = elem.offsetTop + elem.clientTop;
        var x = event.pageX - elemLeft,
            y = event.pageY - elemTop;
        var column = collisionDetect(x, y);
        console.log("click: x:" + x + " y:" + y);
        console.log("column: " + column);

        putCoin(column);
    }, false);
}

function renderGame() {
    var boardElement = document.getElementById("board");
    boardElement.width = (Game.maxColumns + 1) * 75;
    boardElement.height = (Game.maxRows + 1) * 75;

    var canvasContext = boardElement.getContext("2d");
    for (let i = 0; i < Game.board.length; i++) {
        for (let j = 0; j < Game.board[i].length; j++) {
            var row = Game.board[i][j];
            var color = (row.Owner == undefined) ? "#ffffff" : row.Owner.Color;
            canvasContext.beginPath();
            canvasContext.arc((i + 1) * 75, (j + 1) * 75, coinRadius, 0, 2 * Math.PI);
            canvasContext.stroke();
            canvasContext.fillStyle = color;
            canvasContext.fill();

            //console.log("i:" + i + " j:" + j);
        }
    }
}

function collisionDetect(x, y) {
    for (let i = 0; i < Game.board.length; i++) {
        var currentColumn = (i + 1) * 75;
        if (x < currentColumn + coinRadius && x > currentColumn - coinRadius) { //x dentro de la columna
            return i;
        }
    }
    return null;
}

function initializeTurn() {
    var player = Game.players.find(x => x.ID == Game.turn);
    var renderElement = document.getElementById("currentturn");
    renderElement.innerText = "Turno: " + player.Name;
}

function resumeGame() {
    timerInterval = setInterval(timerImplementation, 1000);
}

function timerImplementation() {

    var tiempo = new Date(60);
    Game.time = tiempo;
    //Decremento 1 segundo
    var s = tiempo.getSeconds() - 1;
    tiempo.setSeconds(s);

    //Muestro la nueva fecha
    var texto = rellenaCeros(Game.time.getMinutes()) + ":" + rellenaCeros(Game.time.getSeconds());
    var spanTiempo = document.getElementById("tiempo");
    spanTiempo.innerHTML = texto;
    startGame();
    //Compruebo el valor para cambiar el color del texto
    if (Game.time.getSeconds() < 10) {
        spanTiempo.style.color = "red";

    }
    else if (Game.time.getSeconds() < 30) {
        spanTiempo.style.color = "orange";
    }
    else {
        spanTiempo.style.color = "#0F0";
    }

    //Compruebo si llega a 0 para finalizar el juego o continuar
    if (Game.time.getSeconds() <= 0) {
        var mensaje = "¡Lo siento! Se ha terminado el tiempo.";
        finalizar(mensaje);
    }
    else {
        //Hago un loop para que se ejecute cada 1s
        stop = setTimeout(timerImplementation, 1);
    }
}

function rellenaCeros(numero) {

    if (numero < 4) {
        return "0" + numero;
    }
    else {
        return numero;
    }

}


function putCoin(column) {
    var hit;
    var fail = false;
    for (let i = 0; i < Game.maxRows; i++) {
        var owner = Game.board[column][i].Owner;
        if (owner !== undefined) {
            if (i == 0) {
                fail = true;
                break;
            }
            hit = i;
            break;
        }
        else if (i === Game.maxRows - 1) {
            hit = i + 1;
        }
    }
    if (!fail) {
        var player = Game.players.find(x => x.ID == Game.turn);
        Game.board[column][hit - 1].Owner = player;
        renderGame();
        changeTurn();
    }
}

function changeTurn() {
    var fail = true;
    var player;
    var length = Game.players.length + 1;
    for (let i = Game.turn + 1; i <= length; i++) {
        player = Game.players.find(x => x.ID === i);
        if (player !== undefined) {
            Game.turn = player.ID;
            fail = false;
            break;
        }
    }
    if (fail == true) {
        for (let i = 1; i <= length; i++) {
            player = Game.players.find(x => x.ID === i);
            if (player !== undefined) {
                Game.turn = player.ID;
                fail = false;
                break;
            }
        }
    }
    var renderElement = document.getElementById("currentturn");
    renderElement.innerText = "Turno: " + player.Name;
}

function winner() {
    var saved = false;
    var winner = function (playersNames) {
        status.className = " ";
        boardHTML.className += "disabled";
        if (saved) {
            winnerPoster.innerHTML = "";
            messagePoster.innerHTML = "¡Saved the game!";
            resetButton.innerHTML = "Accept";
        } else {
            var gameOver = null;
            gameOver = true;
            if (playerNames) {
                playerNames = (playerNames == "p1") ? player.p1 : player.p2;
                winnerPoster.innerHTML = playerNames;
                messagePoster.innerHTML = "The winner is " + players + "!!!!";
            } else {
                winnerPoster.innerHTML = "No player has won!";
                messagePoster.innerHTML = "It\"s a TIE!";
            }
            resetButton.innerHTML = "¡Play again!";
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