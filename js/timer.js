//timer
class Timers {
    constructor(timer, updateTimer, currentTimer, count) {
        this.count = count,
            this.currentTimer = currentTimer,
            this.timer = timer,
            this.updateTimer = updateTimer;
    }
}


//Funcion para empezar el turno o juego
function Star() {
    var begin = this;
    if ((!this.count)) {
        this.updateTimer = new Date().getTime();
        this.count = setInterval(function () {
            var now = new Date().getTime();
            var t = now - begin.updateTimer;
            begin.currentTimer += t;
            begin.timer = (begin.formatTime(timer.getMinutes())) + ':' + (begin.formatTime(timer.getSeconds()));
            begin.updateTimer = now;
        }, 1);
    }
}


//Funcion para detener el tiempo
function Stop() {
    clearCount(this.count);
    this.count = 0;
}

function formatTime() {
    return ('00' + timer).substr(-2);
}


// Funcion para reiniciar el tiempo para cada turno del jugador o cuando se termina el juego y se vuelve a iniciar
function reset() {
    this.currentTimer = 0;
    this.updateTimer = new Date.getTime();
    this.count = 0;
    this.Star();
}