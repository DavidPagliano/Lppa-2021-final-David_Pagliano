var player1 = null,
    player2 = null,
    player3 = null;

var getElements = function(){
    player1 = document.getElementById('p1');
    player2 = document.getElementById('p2');
    player3 = document.getElementById('p3');
}

var init = function(){
    getElements();
}

window.onload(init);