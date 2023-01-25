## Describe Player function

It will: "Create a  player object which will contain the properties 'name', 'turn-total' and 'game-total'"
Code: new Player
Expected output: {name: , turn-total: 0, game-total: 0}

It will: "Update the turn-total by adding the most recent die roll to the current turn total"
Code: Player.turn-total += die-roll;
Expected output: turn-total: {name: 'Bob', turn-total: 12, game-total: 5}

It will: "Zero out turn total if player rolls a 1"
Code: .rolledOne();
Expected output:  {name: 'Bob', turn-total: 0, game-total: 5}
 
It will: "Update game total by adding value of turn total"
Code: Player.game-total + turn-total;
Expected output: {name: 'Bob', turn-total: 0, game-total: 15}
 
It will: "Check value of the current die roll and call a method based based on whether the roll is 1 or not"
Code: Player.checkValue();
Expected output: called Player.rolledOne(); or Player.turn-total();
 
It will: "Check if turn-total + game-total >= 100"
Code: if (Player.turn-total + Player.game-total >=100) {"You won"};
Expected output: Log the phrase "You won!" and end the game.

It will: "Pass the turn to the next player"
Code: player.exitTurn();
Expected output: call next player to roll.

It will: 
Code: 
Expected output:
 
It will: 
Code: 
Expected output:
 
It will: "Pass the turn to the next player"
Code: passTurn
Expected output: acitvePlaer