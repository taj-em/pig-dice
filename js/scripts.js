// Creates a PlayerList object with players, scores and ID properties
function PlayerData() {
  this.players = {};
  this.finalScores = {};
  this.currentId = 0;
};

let playerData = new PlayerData();

// Assign an id to a player object and use bracket notation to
// create an object with a key of player.id and a value of the player object
PlayerData.prototype.addPlayer = function (player) {
  player.id = this.assignId();
  this.players[player.id] = player;
};

// Adds 1 to currentId and returns the value
PlayerData.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};


// Creates a player object with the playerName and playerNumber properties
function Player(playerName) {
  this.playerName = playerName;
};

// Adds the value of a dice roll unless the roll = 1 
// to the player's count when called
Player.prototype.keepScore = function (id) {
  let diceNum = diceNumber();
  if (diceNum === 1) {
    playerData.players[id].playerScore = 0;
    playerData.finalScores[id] = 0;
  } else if (diceNum !== 1) {
    this.playerScore += diceNum;
  }
};

Player.prototype.calculate = function(id) {
  if (playerData.players[id].playerScore !== 0) {
    if (playerData.players[id].playerScore === undefined) {
      playerData.players[id].playerScore = 0;
    }
    playerData.players[id].keepScore(id);
    console.log("ID: " + id + "; Score: " + playerData.players[id].playerScore)
  } else {endRound()};
};



function endRound() {
  if (playerData.players[2].playerScore) {
    playerData.finalScores[2] = playerData.players[2].playerScore;
    // Trigger scoreboard function
  };
  playerData.finalScores[1] = playerData.players[1].playerScore;
};

// Returns a random number between 1 and 6
function diceNumber() {
  min = Math.ceil(1);
  max = Math.floor(6);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function rollDice(event) {
  if (playerData.finalScores[1] === 0) {
    playerData.players[2].calculate(2);
  }
    playerData.players[1].calculate(1);
}


// Business Logic






// UI Logic

function playerCreation(event) {
  event.preventDefault();
  const playerOneName = document.getElementById("player-one-name").value;
  const playerTwoName = document.getElementById("player-two-name").value;
  let playerOne = new Player(playerOneName);
  let playerTwo = new Player(playerTwoName);
  playerData.addPlayer(playerOne);
  playerData.addPlayer(playerTwo);
  console.log("Confirm Character Creation: " + playerData.players[1].playerName);
  console.log("Confirm Character Creation: " + playerData.players[2].playerName);
};

window.addEventListener("load", function () {
  this.document.querySelector("form").addEventListener("submit", playerCreation)
  this.document.querySelector("button#roll-die").addEventListener("click", rollDice)
});