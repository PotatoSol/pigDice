function Player(name) {
    this.name = name;
    this.turnTotal = 0;
    this.gameTotal = 0;
    this.numberOfTimesRolled = 0;
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
    this.numberOfTimesRolled++;
    if(dieRoll === 1) {
        this.zeroOutTurnTotal();
    } else {
        this.addToTurnTotal(dieRoll);
        this.checkWinState();
    }
}

Player.prototype.checkWinState = function() {
    if(this.turnTotal + this.gameTotal >= 100) {
        console.log("Congratulations " + this.name + " you won!")
        console.log(this.turnTotal + " " + this.gameTotal);
        return true;
    }
    return false;
}

function rollDice() {
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

Game.prototype.passTheTurn = function(currentGame) {  
    let x = this.playersArr.shift();
    this.playersArr.push(x);
}

//////////////////////////////////////////////////////////

function gameLoop(passedInGame) {
    while (passedInGame.gameIsRunning) {
        //let currentPlayer = ourGame.playersArr[0];
        let currentDiceRoll = rollDice();
        passedInGame.playersArr[0].checkValueOfCurrentDieRoll(currentDiceRoll);
        console.log(passedInGame.playersArr[0].name + " just rolled: " + currentDiceRoll);
        if(passedInGame.playersArr[0].checkWinState() === true) {
            passedInGame.gameIsRunning = false;
        } else if (passedInGame.playersArr[0].numberOfTimesRolled >= 4 ) {
            console.log('hello');
            passedInGame.playersArr[0].numberOfTimesRolled = 0;
            passedInGame.passTheTurn();
        } else if(currentDiceRoll === 1){ // || player chooses to pass turn
            passedInGame.playersArr[0].numberOfTimesRolled = 0;
            passedInGame.passTheTurn();
        } 
    }
}

// //////////////////////////////////////  Delte below 

let player1 = new Player('Bob');
let player2 = new Player('Billy');
let player3 = new Player('Thirsten');
let newGame = new Game();
newGame.addPlayersToGame(player2);
newGame.addPlayersToGame(player1);
newGame.addPlayersToGame(player3);