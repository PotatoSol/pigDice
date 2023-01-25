function Player(name) {
    this.name = name;
    this.turnTotal = 0;
    this.gameTotal = 0;
}

Player.prototype.addToTurnTotal = function(dieRoll) {
    this.turnTotal += dieRoll;    
};
