function Player(name) {
    this.name = name;
    this.turnTotal = 0;
    this.gameTotal = 0;
}

Player.prototype.addToTurnTotal = function(dieRoll) {
    this.turnTotal += dieRoll;
    this.checkWinState();    
};

Player.prototype.zeroOutTurnTotal = function() {
    this.turnTotal = 0;
}

Player.prototype.addTurnTotalToGameTotal = function() {
    this.gameTotal += this.turnTotal;
    this.zeroOutTurnTotal();
}

Player.prototype.checkValueOfCurrentDieRoll = function(dieRoll) {
    if(dieRoll === 1) {
        this.zeroOutTurnTotal();
        this.passTheTurn();
    } else {
        this.addToTurnTotal(dieRoll);
        this.checkWinState();
    }
}

Player.prototype.checkWinState = function() {
    if(this.turnTotal + this.gameTotal >= 100) {
        console.log("Congratulations " + this.name + " you won!")
    }
}

Player.prototype.passTheTurn = function() {
    console.log('passing to next player');
}


function dieRoll() {
    let rollTheDie = Math.floor(Math.random()*6) + 1;
    return rollTheDie
}

/////////////////////////////////////////////////////////

function Game() {
    this.gameIsRunning =  true;
    this.playersArr = [];
}

Game.prototype.addPlayersToGame = function(playerName) {
    this.playersArr.push(playerName);
}

//////////////////////////////////////////////////////////



function gameloop() {
    let ourGame = new Game();
    while (ourGame.gameIsRunning) {
        //let currentPlayer = ourGame.playersArr[0];
        ourGame.playersArr[0].dieRoll();
        ourGame.playersArr[0].checkValueOfCurrentDieRoll(

    }
}




















