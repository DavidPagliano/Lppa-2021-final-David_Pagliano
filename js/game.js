var Game;
var coinRadius = 25;
var maxProbability = 3;
var defaultTurnTime = 60;
var timerInterval;

window.onload = function () {
    loadGame();
}

function loadGame() {
    loadGameData();
    startRendering();
    startGame();
}

function loadGameData() {
    Game = JSON.parse(window.localStorage.getItem("currentGame"));
}


function startRendering() {
    initializeCanvas();
    if (Game.state == "playing") {
        renderTurn(Game.players.find(x => x.ID == Game.turn));
    }
    else {
        showWinner();
    }
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

        if (Game.state == "playing" && column !== null) {
            putCoin(column);
        }
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
            var color = (row == null) ? "#ffffff" : row.Color;
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
        if (x <= currentColumn + coinRadius && x > currentColumn - coinRadius) { //x dentro de la columna
            return i;
        }
    }
    return null;
}

function resumeGame() {
    renderTimer();
    timerInterval = setInterval(timerImplementation, 1000);
}

function timerImplementation() {
    Game.time--;
    
    renderTimer();

    //Compruebo si llega a 0 para finalizar el juego o continuar
    if (Game.time <= 0) {
        changeTurn();
    }
}

function fillWithZeros(numero) {

    if (numero < 4) {
        return "0" + numero;
    }
    else {
        return numero;
    }

}

function renderTimer() {
    var minutes = Math.floor(Game.time / 60);
    var secondsleft = Game.time - minutes * 60;
    var text = fillWithZeros(fillWithZeros(minutes) + ":" + fillWithZeros(secondsleft));
    var spanTimer = document.getElementById("timer");
    spanTimer.innerHTML = text;
    //Compruebo el valor para cambiar el color del texto
    if (Game.time < 10) {
        spanTimer.style.color = "red";

    }
    else if (Game.time < 30) {
        spanTimer.style.color = "orange";
    }
    else {
        spanTimer.style.color = "#0F0";
    }
}

function putCoin(column) {
    var hit;
    var fail = false;
    for (let i = 0; i < Game.maxRows; i++) {
        var owner = Game.board[column][i];
        if (owner !== null) {
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
        Game.board[column][hit - 1] = player;
        renderGame();
        saveBoard();
        checkWinCondition(column, hit - 1);
        if (Game.state == "playing") changeTurn();
    }
}

function saveBoard() {
    var boardString = "";

    for (let i = 0; i < Game.maxColumns; i++) {
        for (let j = 0; j < Game.maxRows; j++) {
            // permite guardar las columnas y filas dependiendo la cantidad de jugadores
            var result = ((Game.board[i][j] !== null) ? Game.board[i][j].ID : "0") + (j == Game.maxRows - 1 ? "" : "-");
            boardString += result;
        }
        boardString += i == Game.maxColumns - 1 ? "" : "|";
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

    renderTurn(player);
    Game.time = defaultTurnTime;
    Game.turn = player.ID;
    clearInterval(timerInterval);
    timerInterval = setInterval(timerImplementation, 1000);
    renderTimer();
}

function renderTurn(player) {
    var renderElement = document.getElementById("currentturn");
    renderElement.innerHTML = "Turn: <span style=\"color:" + player.Color + "\">" + player.Name + "</span>";
}

function checkWinCondition(x, y) {
    checkVerticalWinCondition(x, y);
    checkHorizontalWinCondition(x, y);
    checkObliqueWinCondition(x, y);
}

function checkVerticalWinCondition(x, y) {
    var hits = 1;
    for (let i = 1; i <= maxProbability; i++) {
        var y2 = y + i;
        if (y2 < Game.maxRows) {
            var player = Game.board[x][y2];
            if (player !== null) {
                if (player.ID == Game.turn) {
                    hits++;
                }
            }
        }
        y2 = y - i;
        if (y2 >= 0) {
            player = Game.board[x][y2];
            if (player !== null) {
                if (player.ID == Game.turn) {
                    hits++;
                }
            }
        }
    }
    if (hits === 4) {
        //gana jugador
        showWinner();
    }
}

function checkHorizontalWinCondition(x, y) {
    var hits = 1;
    for (let i = 1; i <= maxProbability; i++) {
        var x2 = x + i;
        if (x2 < Game.maxColumns) {
            var player = Game.board[x2][y];
            if (player !== null) {
                if (player.ID == Game.turn) {
                    hits++;
                }
            }
        }
        x2 = x - i;
        if (x2 >= 0) {
            player = Game.board[x2][y];
            if (player !== null) {
                if (player.ID == Game.turn) {
                    hits++;
                }
            }
        }
    }
    if (hits === 4) {
        //gana jugador
        showWinner();
    }
}

function checkObliqueWinCondition(x, y) {
    var hits = 1;
    for (let i = 1; i <= maxProbability; i++) {
        var x2 = x + i;
        var y2 = y - i;
        if (x2 < Game.maxColumns && y2 >= 0) {
            var player = Game.board[x2][y2];
            if (player !== null) {
                if (player.ID == Game.turn) {
                    hits++;
                }
            }
        }
        x2 = x - i;
        y2 = y + i;
        if (x2 >= 0 && y2 < Game.maxRows) {
            player = Game.board[x2][y2];
            if (player !== null) {
                if (player.ID == Game.turn) {
                    hits++;
                }
            }
        }
    }
    if (hits === 4) {
        //gana jugador
        showWinner();
        return;
    }

    //Inverse oblique line
    hits = 1;
    for (let i = 1; i <= maxProbability; i++) {
        var x2 = x + i;
        var y2 = y + i;
        if (x2 < Game.maxColumns && y2 < Game.maxRows) {
            var player = Game.board[x2][y2];
            if (player !== null) {
                if (player.ID == Game.turn) {
                    hits++;
                }
            }
        }
        x2 = x - i;
        y2 = y - i;
        if (x2 >= 0 && y2 >= 0) {
            player = Game.board[x2][y2];
            if (player !== null) {
                if (player.ID == Game.turn) {
                    hits++;
                }
            }
        }
    }
    if (hits === 4) {
        //gana jugador
        showWinner();
        return;
    }
}

function showWinner() {
    var player = Game.players.find(x => x.ID === Game.turn);
    var renderElement = document.getElementById("currentturn");
    clearInterval(timerInterval);
    renderElement.innerHTML = "Congratulations!!<br/>The winner is <span style=\"color:" + player.Color + "\">" + player.Name + "</span>!!!";
    Game.state = "ended";
}

function startGame() {
    //Timer
    resumeGame();
}

function saveGame()
{
    var storage = window.localStorage;
    var savedGamesString = storage.getItem("savedGames");
    var savedGames;

    if(savedGamesString === "" || savedGamesString === null || savedGamesString === undefined)
    {
        savedGames = new Array();
    }
    else {
        savedGames = JSON.parse(savedGamesString);
    }

    var savedGame = savedGames.find(x => x.ID === Game.ID);
    if(savedGame !== undefined && savedGame !== null)
    {
        savedGames[(Game.ID)-1] = Game;
    }
    else {
        savedGames.push(Game);
    }
    storage.setItem("savedGames", JSON.stringify(savedGames));
    alert("Game saved");
}