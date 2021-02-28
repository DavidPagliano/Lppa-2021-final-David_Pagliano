var boardHTML = null;

var columns = null;

/**
 * Matriz para que jueguen dos jugadores
 */
var board2 = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, players, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
]

var board3 = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, players, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null]
]

//turno de los jugadores
var turns = function () {
    turn = (turn === 'p1') ? 'p2' : 'p1';
}

var render = function () {
    var html = '';
    for (var i = 0; i < board2.length; i++) {
        html += '<div id="c' + i + 'class=column>';
        for (var j = board2[i].length - 1; j >= 0; j--) {
            html += '<div id ="s' + i + j + '"class="spot';
            if (board2[i][j]) html += ' ' + board2[i][j];
            html += '"></div>';
        }
        html += '</div>';
    }
    boardHTML.innerHTML = html;
    bindColumnHandlers();
}



var columnEventHandler = function (evt) {
    var columnId = evt.target.id.substr(1, 1);
    for (var i = 0; i < board2[columnId].length; i++) {
        if (!board2[columnId][i]) {
            board2[columnId][i] = turn;
            turns();
            render();
            break;
        }
    }
}

var init = function () {
    boardHTML = document.getElementById('board');
    turn = Math.random() > 0.5 ? 'p1' : 'p2';
}