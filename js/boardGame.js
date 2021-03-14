class boardGame {
    constructor(board, boardHTML, columnHTML) {
        this.board = board,
            this.boardHTML = boardHTML,
            this.columnHTML = columnHTML;
    }
}

reset = function () {
    for (var i = 0; i < this.board.length; i++) {
        for (var j = 0; j < this.board[i].length; j++) {
            this.board[i][j] = null;
        }
    }
}

bindColumnHandlers = function () {
    for (var i = 0; i < this.columnsHTML.length; i++) {
        this.columnsHTML[i].onclick = this.columnEventHandler.bind(this);
    }
}


render = function () {
    var html = '';
    for (var i = 0; i < this.board.length; i++) {
        (this.board.length === 10) ? html += '<div id="columns' + i + '" class="column three">'
            : html += '<div id="columns' + i + '" class="column">';
        for (var j = this.board[i].length - 1; j >= 0; j--) {
            html += '<div id="slot' + i + j + '" class="slot';
            if (this.board[i][j]) { html += ' ' + this.board[i][j]; }
            html += '"></div>';
        }
        html += '</div>';
    }
    this.boardHTML.innerHTML = html;
    this.bindColumnHandlers();
}