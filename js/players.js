"use strict";

var playerCount = 0;
var baseMaxColumns = 7;
var baseMaxRows = 6;

var errors = false;

function addPlayer() {
    var p3 = document.getElementById('board-p3');
    p3.style.display = 'flex';
    document.getElementById('less').style.display = 'flex';
    document.getElementById('less').style.visibility = 'visible'; // Cuando les da click el boton - aparece y el boton + desaparece
    document.getElementById('add').style.visibility = 'hidden';
}

function lessPlayer() {
    var p3 = document.getElementById('board-p3');
    p3.style.display = 'none';
    document.getElementById('add').style.display = 'flex';
    document.getElementById('less').style.visibility = 'hidden'; // Se hace la inversa y se mantiene la logica
    document.getElementById('add').style.visibility = 'visible';
}


// Funcion para crear y guardar jugadores para luego usarlo en el juego
function createNewGame() {
    var storage = window.localStorage;
    //CLEAR LOCAL STORAGE
    storage.clear();

    //PLAYER DATA INITIALIZE
    createPlayer(getIDValue("p1"), 0xff0000ff);
    createPlayer(getIDValue("p2"), 0xff0000ff);
    if (isVisible("board-p3")) createPlayer(getIDValue("p3"), 0xff0000ff);

    if (hasErrors()) {
        clearErrors();
        return;
    }

    setDefaultGameConfig();

    setBoardConfig();

    // redirige toda la configuracion a game.html para utilizar los datos guardados
    window.location.href = "game.html";

}

function isVisible(id) {
    var display = document.getElementById(id).style.display;
    if (display !== "none" && display !== "") {
        return true;
    }
    return false;
}

function getIDValue(id) {
    return document.getElementById(id).value;
}

function createPlayer(name, color) {
    playerCount++;
    var currentPlayerNumber = playerCount;
    var storage = window.localStorage;

    if (name === "" || name === null || name.lenght > 3) {
        alert("The player " + currentPlayerNumber + "'s name is invalid.");
        setErrors();
        return;
    }

    storage.setItem("playerName" + currentPlayerNumber, name);
    storage.setItem("playerColor" + currentPlayerNumber, color);
}

function setBoardConfig() {
    var maxColumns = baseMaxColumns + (playerCount - 1) * 3;
    var maxRows = baseMaxRows + (playerCount - 1) * 3;
    var boardString = "";
    var storage = window.localStorage;

    storage.setItem("maxColumns", maxColumns);
    storage.setItem("maxRows", maxRows);

    for (let i = 0; i < maxColumns; i++) {
        for (let j = 0; j < maxRows; j++) {
            // permite guardar las columnas y filas dependiendo la cantidad de jugadores
            var result = "0" + (j == maxRows - 1 ? "" : "-");
            boardString += result;
        }
        boardString += i == maxColumns - 1 ? "" : "|";
    }

    storage.setItem("board", boardString);
}

function hasErrors() {
    if (errors) {
        return true;
    }
    return false;
}

function clearErrors() {
    errors = false;
}

function setErrors() {
    errors = true;
}

function setDefaultGameConfig() {
    var storage = window.localStorage;

    storage.setItem("turn", 1);
    storage.setItem("time", 60);
}

function validateName(name, number) {
    if (name === "" || name === null || name.lenght > 3) {
        alert("el nombre del jugador " + number + " es invalido");
        return false;
    }
    return true;
}