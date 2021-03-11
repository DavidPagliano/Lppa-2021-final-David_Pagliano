'use strict';

var player1 = null,
    player2 = null,
    player3name = null,
    p3 = null,
    buttonAdd = null,
    buttoPlay = null,
    errorPlayer = null,
    players = [],
    add = 0;

var addPlayer = function () {
    if (buttonAdd.className === ' ' || buttonAdd.className === 'less') {
        add = add + 1;
        var btn = '<div><input type="text" class="playername" >' + add + '</div>';

    }
}


