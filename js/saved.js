'use strict'

var button = null;
var savedGame = [];
var savedTimer = [];
var state = null;
var player1 = null;
var player2 = null;
var player3 = null;
var timer = null;
var dateGame = Date();
var buttonReturn = null;
var buttonUpdate = null;
var buttonDelete = null;
var buttonLoad = null;
var buttonSaved = null;
var select = null;
var listGame = null;

function deleteG(e) {
    var button = Array.from().indexOf(e.target);
    savedGame.splice(savedGame[button], 1);
    savedTimer.splice(savedTimer[button], 1);
    localStorage['savedGame'] = JSON.stringify(savedGame);
    localStorage['savedTimer'] = JSON.stringify(savedTimer);
    location.reload();
}

function loadG() {
    var newG = false;
    localStorage['newG'] = JSON.stringify(newG);
    location.href = 'game.html';
}



