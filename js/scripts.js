function Player(name) {
    this.name = name;
    this.turnTotal = 0;
    this.gameTotal = 0;
}

Player.prototype.addToTurnTotal = function(dieRoll) {
    this.turnTotal += dieRoll;    
};

Player.prototype.playerRolledOne = function() {
    this.turnTotal = 0;
}