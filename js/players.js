'use strict';

var players = new Array();


class player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

}

var createNewPlayers = function (name, color) {
    var newPlayer = new player(name, color);
    players.push(newPlayer);
}
function addPlayer() {
    var p3 = document.getElementById('board-p3');
    p3.style.display = 'flex';
    document.getElementById('less').style.display = 'flex';
    document.getElementById('less').style.visibility = 'visible';
    document.getElementById('add').style.visibility = 'hidden';
}

function lessPlayer() {
    var p3 = document.getElementById('board-p3');
    p3.style.display = 'none';
    document.getElementById('add').style.display = 'flex';
    document.getElementById('less').style.visibility = 'hidden';
    document.getElementById('add').style.visibility = 'visible';
}

function playercount() {
    for (var i = null; i < players; i++) {
        playername + i;
    }
}


// Funcion para crear y guardar jugadores para luego usarlo en el juego
function createNewGame() {
    var miStorage = window.localStorage;
    var playerCount = 0;

    miStorage.clear();
    var p1 = document.getElementById('p1').value;
    if (!validateName(p1, 1)) {
        return;
    }

    var p2 = document.getElementById('p2').value;
    if (!validateName(p2, 2)) {
        return;
    }

    var p3 = null;
    var estilo = document.getElementById('board-p3').style.display;
    if (estilo !== "none" && estilo !== '') {
        p3 = document.getElementById('p3').value;
        if (!validateName(p3, 3)) {
            return;
        }
        playerCount = 3;
    } else {
        playerCount = 2;
    }

    miStorage.setItem('playerCount', playerCount);
    miStorage.setItem('playerName1', p1);
    miStorage.setItem('playerColor1', 0xff0000ff);
    miStorage.setItem('playerName2', p2);
    miStorage.setItem('playerColor2', 0x0000ffff);
    miStorage.setItem('Turn', 1);
    miStorage.setItem('Time', 60);


    if (playerCount === 3) {
        var maxColumns = 10, maxRows = 9;
        miStorage.setItem('playerName3', p3);
        miStorage.setItem('playerColor3', 0x00ff00ff);
        miStorage.setItem('maxColumns', maxColumns);
        miStorage.setItem('maxRows', maxRows);
        var matrixstring = '';
        for (let i = 0; i < maxColumns; i++) {
            for (let j = 0; j < maxRows; j++) {
                // permite guardar las columnas y filas dependiendo la cantidad de jugadores
                matrixstring = matrixstring + '0' + j == maxRows - 1 ? '' : '-';
            }
            matrixstring = matrixstring + i == maxColumns - 1 ? '' : '|';
        }
        miStorage.setItem('board', matrixstring);
    } else {
        var maxColumns = 2, maxRows = 2;
        miStorage.setItem('maxColumns', maxColumns);
        miStorage.setItem('maxRows', maxRows);
        var matrixstring = "";
        for (let i = 0; i < maxColumns; i++) {
            for (let j = 0; j < maxRows; j++) {
                // permite guardar las columnas y filas dependiendo la cantidad de jugadores
                matrixstring = matrixstring + '0' + j == maxRows - 1 ? '' : '-';
            }
            matrixstring = matrixstring + i == maxColumns - 1 ? '' : '|';
        }
        miStorage.setItem('board', matrixstring);
    }
    // redirige toda la configuracion a game.html para utilizar los datos guardados
    window.location.href = 'game.html';

}

function validateName(p1, numero) {
    if (p1 === '' || p1 === null || p1.lenght > 3) {
        alert('el nombre del jugador ' + numero + ' es invalido');
        return false;
    }
    return true;
}