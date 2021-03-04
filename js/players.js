'use strict';

var player1 = null,
    player2 = null,
    player3 = null,
    buttonAdd = null,
    buttoPlay = null,
    errorPlayer = null,
    players = [];


player1 = document.getElementById('p1');
player2 = document.getElementById('p2');
player3 = document.getElementById('p3');
buttonAdd = document.getElementById('button-add');
buttoPlay = document.getElementById('button-start');
errorPlayer = document.getElementById('errorPlayer');

var savePlayer = function () {
    var save = players[i];

    localStorage.setItem("save", JSON.stringify(save));


}
var buttonAdds = function () {
    if (buttonAdd.className === '' || buttonAdd.className === 'button-less') {
        player3++;
        var div = document.createElement('div');
        div.setAttribute('class', 'form-inline');
        div.innerHTML = '<div style="clear:both" class="button-add' + player3 + ' col-md-offset-1 col-md-6"><input class="namePlayer" name="p3' + player3;
        document.getElementById('canciones').appendChild(div); document.getElementById('canciones').appendChild(div);
    } else {
        player3--;
        var div = document.createElement('div');
        div.setAttribute('class', 'form-inline');
        div.innerHTML = '<div style="clear:both" class="button-less' + player3 + ' col-md-offset-1 col-md-6"><input class="namePlayer" name="p3" value="-' + player3;
        document.getElementById('canciones').appendChild(div); document.getElementById('canciones').appendChild(div);
    }


}

var getElements = function () {




}

var init = function () {
    getElements();
}

window.onload(init);