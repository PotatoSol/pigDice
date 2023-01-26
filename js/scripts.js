// Business Logic

function Player(name) {
    this.name = name;
    this.turnTotal = 0;
    this.gameTotal = 0;
    this.numberOfTimesRolled = 0;
}

Player.prototype.addToTurnTotal = function(dieRoll) {
    this.turnTotal += dieRoll;
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
    }
}

Player.prototype.checkWinState = function() {
    if(this.turnTotal + this.gameTotal >= 100) {
        console.log("Congratulations " + this.name + " you won!")
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

Game.prototype.passTheTurn = function() { 
    this.playersArr[0].addTurnTotalToGameTotal();
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
            passedInGame.playersArr[0].numberOfTimesRolled = 0;
            passedInGame.passTheTurn();
        } else if(currentDiceRoll === 1){ // || player chooses to pass turn
            passedInGame.playersArr[0].numberOfTimesRolled = 0;
            passedInGame.passTheTurn();
        } 
    }
}

function initalizeGame(){
    let currentGame = new Game();
    //take in players
    return currentGame();
}

// //////////////////////////////////////  Delte below 

let player1 = new Player('Bob');
let player2 = new Player('Billy');
let player3 = new Player('Thirsten');
let newGame = new Game();
newGame.addPlayersToGame(player2);
newGame.addPlayersToGame(player1);
newGame.addPlayersToGame(player3);



// UI Logic 

//document.getElementById('playerNames').innerText = Game.playersArr[0].name;

function takePlayerInput(){
    console.log('hello');
    return new Player(document.getElementById("playerInputId").value)
}

function handleFormSubmission(inputPlayers){
    //take in players
    console.log(inputPlayers);
    console.log('hellohello');
    //initialize the game
    initalizeGame();
    //enter game loop
}
window.addEventListener("load", function(){
    let inputPlayers = [];
    document.getElementById("addPlayerId").addEventListener("click", function(event){
        event.preventDefault();
        inputPlayers.push(takePlayerInput());
    });
    document.getElementById("submitId").addEventListener("click", function(event){
        event.preventDefault();
        handleFormSubmission(inputPlayers);

        
    });
});