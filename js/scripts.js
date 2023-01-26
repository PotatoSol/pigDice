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
        this.numberOfTimesRolled = 0;
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

Player.prototype.askToRoll = function(passedInGame) { 
    gameLoop(passedInGame);
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
    updateCurrentDiceRoll(0);
    updateCurrentPlayerUI(this);
}

//////////////////////////////////////////////////////////

function gameLoop(passedInGame) {
    if (passedInGame.gameIsRunning) {
        //let currentPlayer = ourGame.playersArr[0];
        let currentDiceRoll = rollDice();
        updateCurrentDiceRoll(currentDiceRoll);
        console.log(passedInGame.playersArr[0].name + " just rolled: " + currentDiceRoll); //move out
        passedInGame.playersArr[0].checkValueOfCurrentDieRoll(currentDiceRoll);
        if(currentDiceRoll === 1){
            //switch players
            let x = passedInGame.playersArr.shift();
            passedInGame.playersArr.push(x);
            return;
        }
        if(passedInGame.playersArr[0].checkWinState() === true) {
            passedInGame.gameIsRunning = false;
            showWinner(passedInGame);
        } else if(currentDiceRoll === 1){ // || player chooses to pass turn
            passedInGame.playersArr[0].numberOfTimesRolled = 0;
            passedInGame.passTheTurn();
        } 
        updateCurrentPlayerUI(passedInGame);
        displayTotalScoreBoard(passedInGame);

    }
    //document.getElementById("rollDiceId").addEventListener("click", passedInGame.playersArr[0].askToRoll());
}

function initalizeGame(){
    let currentGame = new Game();
    //take in players
    return currentGame;
}

// UI Logic 

function updateCurrentPlayerUI(inputGame){
    document.getElementById("activePlayerName").innerText = "Active Player name: " + inputGame.playersArr[0].name;
    document.getElementById("turnTotal").innerText = "Current turn total: " + inputGame.playersArr[0].turnTotal;
    document.getElementById("totalScore").innerText = "Active Player total Score: " + inputGame.playersArr[0].gameTotal;
}

function updateCurrentDiceRoll(inputRoll){
    document.getElementById("currentRollId").innerText = "Current roll : " + inputRoll;
}

function showWinner(inputGame){
    document.getElementById("winnerId").innerText = "The winner is: " + inputGame.playersArr[0].name;
}

function takePlayerInput(){
    let playerNameInput = document.getElementById("playerInputId").value;
    console.log(playerNameInput);
    let noNameErrorMessage = document.getElementById('noNameMessage');
    playerNameInput.trim();
    if(playerNameInput === "") {
        console.log('no player name entered');
        document.getElementById('noNameMessage').setAttribute('class', 'angry');
        console.log('wow');
    }
    noNameErrorMessage.setAttribute('class', 'hidden')
    return new Player(playerNameInput);
}

function submitPlayers(inputPlayers, inputGame){
    inputPlayers.forEach(element => {
        inputGame.addPlayersToGame(element);
    });
}

function displayTotalScoreBoard(inputGame) {
    while(document.getElementById('testP').hasChildNodes()){
        document.getElementById('testP').removeChild(document.getElementById('testP').firstChild)
    }
    inputGame.playersArr.forEach(function(element) {
        let newliElement = document.createElement('li');
        newliElement.innerText = (element.name + ': ' + element.gameTotal);
        document.getElementById('testP').append(newliElement);
        });
}

function handleFormSubmission(inputPlayers){
    //take in players
    //initialize the game
    let currentGame = initalizeGame();
    document.getElementById("submitId").setAttribute("class", "hidden");
    submitPlayers(inputPlayers, currentGame);
    document.getElementById("rollDiceId").addEventListener("click", function(){
        currentGame.playersArr[0].askToRoll(currentGame)});
    document.getElementById("holdScoreId").addEventListener("click", function(){
        currentGame.passTheTurn()});
    gameLoop(currentGame);
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