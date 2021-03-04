var game = function () {
    if (!move(col, board, turn)) {
        console.log("Mov. a" + col + "es ilegal");
        return;
    }
}

var winner = seeWinner(board);
if (winner == players) {
    pause = true;
    console.log("Ah ganado el jugador" + players);
    message.innerHTML = 'Ag ganado el jugador' + players;
    result.style.visibility = "show";
    points[0]++;
} else {
    let Empate = true;
    for (let i = 0; i < col; i++) {

    }
}



