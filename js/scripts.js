// Creates a PlayerList object with a players and ID property
function PlayerList() {
  this.players = {};
  this.currentId = 0;
}

// Creates a player object with the playerName and playerNumber properties
function Player(playerName, playerNumber) {
  this.playerName = playerName;
  this.playerNumber = playerNumber;
}