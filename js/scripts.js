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
    } else {
        this.addToTurnTotal(dieRoll);
    }
}

Player.prototype.checkWinState = function() {
    if(this.turnTotal + this.gameTotal >= 100) {
        console.log("Congratulations " + this.name + " you won!")
    }
}
