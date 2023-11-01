// Creates a PlayerList object with players, scores and ID properties
function PlayerData() {
  this.players = {};
  this.finalScores = {};
  this.currentId = 0;
}

let playerData = new PlayerData();

// Assign an id to a player object and use bracket notation to
// create an object with a key of player.id and a value of the player object
PlayerData.prototype.addPlayer() = function(player) {
  player.id = this.assignId();
  this.players[player.id] = player;
}

// Adds 1 to currentId and returns the value
PlayerData.prototype.assignId() = function() {
  this.currentId += 1;
  return this.currentId;
}


// Creates a player object with the playerName and playerNumber properties
function Player(playerName, playerNumber, playerScore) {
  this.playerName = playerName;
  this.playerNumber = playerNumber;
  this.playerScore = playerScore;
}

// Adds the value of a dice roll unless the roll = 1 
// to the player's count when called
Player.prototype.keepScore() = function(player) {
  let diceNum = rollDice();
  if (diceNum === 1) {
    player.playerScore = 0;
    endRound();
  }
  player.playerScore += diceNum;
}



function endRound(player) {
  if (PlayerList.players[2].playerScore) {
    // Trigger scoreboard function
  }
  // End round, switch player
  // Trigger function to send the player number and player score to an object
  playerData.finalScores[player.id] = player.playerScore;
}

// Returns a random number between 1 and 6
function rollDice() {
  min = Math.ceil(1);
  max = Math.floor(6);
  return Math.floor(Math.random() * (max - min + 1) + min);
}