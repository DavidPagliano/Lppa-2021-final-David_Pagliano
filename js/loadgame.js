var savedGames;

window.onload = function(){
    savedGames = JSON.parse(window.localStorage.getItem("savedGames"));
    var mainBoard = document.getElementById("board-saved");
    savedGames.forEach(Game => {
        if(Game.state == "playing")
        {
            var div = document.createElement("div");
            div.className = "game-playing";
            div.onclick = "loadGame("+(Game.ID-1)+");";

            var players = document.createElement("div");
            players.className = "players";

            var playerTitle = document.createElement("span");
            playerTitle.className = "name-P1";
            playerTitle.innerHTML = "Players:";
            playerTitle.style.color = "#000000";
            players.appendChild(playerTitle);

            Game.players.forEach(player => {
                var playerElement = document.createElement("span");
                playerElement.className = "name-P"+player.ID;
                playerElement.innerHTML = player.Name;
                playerElement.style.color = player.Color;
                players.appendChild(playerElement);
            });
            div.appendChild(players);

            var div2 = document.createElement("div");
            
            var stategame = document.createElement("div");
            stategame.className = "state-game";

            var turnplayer = document.createElement("div");
            turnplayer.className = "turn-Player";
            var turnplayerName = (Game.players.find(x => x.ID == Game.turn)).Name;
            turnplayer.innerHTML = "Turn: " + turnplayerName;
            
            var state = document.createElement("div");
            state.className = "state";
            state.innerHTML = "Time: "+ Game.time + " seconds";

            stategame.appendChild(turnplayer);
            stategame.appendChild(state);

            div2.appendChild(stategame);

            div.appendChild(div2);
            mainBoard.appendChild(div);
        }
    });
    

}

function loadGame(id)
{
    var Game = savedGames[id];
    if(Game.state != "playing") return;
    window.localStorage.setItem("currentGame", JSON.stringify(Game));
    window.location.href = "game.html";
}