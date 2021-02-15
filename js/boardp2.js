var boardHTML = null;

var columns = null;

/**
 * Matriz para que jueguen dos jugadores
 */
var board2= [
    [null, null, null, null, null , null, null],
    [null, null, null, null, null , null, null],
    [null, null, null, players, null , null, null],
    [null, null, null, null, null , null, null],
    [null, null, null, null, null , null, null],
    [null, null, null, null, null , null, null]
]

//turno de los jugadores
var turns = function(){
    turn = (turn ==='p1')? 'p2': 'p1';
}

var columnEventHandler = function(evt){
    var columnId = evt.target.id.substr(1,1);
    for(var i = 0; i <board2[columnId].length; i++)
    {

    }
}