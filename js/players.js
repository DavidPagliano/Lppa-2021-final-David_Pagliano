"use strict";

var Game = new Object();
Game.players = new Array();

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
    createPlayer(getIDValue("p1"), "#ff0000");
    createPlayer(getIDValue("p2"), "#00ff00");
    if (isVisible("board-p3")) createPlayer(getIDValue("p3"), "#0000ff");

    if (hasErrors()) {
        clearErrors();
        return;
    }

    setDefaultGameConfig();

    setBoardConfig();

    saveGameConfig();

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
    var player;
    var currentPlayerNumber = Game.players.length+1;

    if (name === "" || name === null || name.length < 3) {
        alert("The player " + currentPlayerNumber + "'s name is invalid.");
        setErrors();
        return;
    }

    if (color === "" || color === null || color.length != 7) {
        alert("The player " + currentPlayerNumber + "'s color is invalid.");
        setErrors();
        return;
    }
    
    player = new Object();
    player.ID = Game.players.length+1;
    player.Name = name;
    player.Color = color;

    Game.players.push(player);
}

function setBoardConfig() {
    var maxColumns = baseMaxColumns + (Game.players.length - 2) * 3;
    var maxRows = baseMaxRows + (Game.players.length - 2) * 3;
    var board = Array.from(Array(maxColumns), () => new Array(maxRows));
    Game.maxColumns = maxColumns;
    Game.maxRows = maxRows;
    Game.board = board;
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
    Game.turn = 1;
    Game.time = 60;
    Game.state = "playing";
}

function saveGameConfig()
{
    var savedGames = JSON.parse(window.localStorage.getItem("savedGames"));
    var game;
    if(savedGames === null || savedGames === undefined)
    {
        savedGames = new Array();
    }
    Game.ID = savedGames.length !== 0 ? savedGames.length : 1;
    game = JSON.stringify(Game);
    window.localStorage.setItem("currentGame", game);
}