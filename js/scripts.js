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



function rollDice(event) {
  if (playerData.players[1].playerScore === 0) {
    playerData.players[2].calculate(2);
  } else {playerData.players[1].calculate(1)};
}

Player.prototype.calculate = function(id) {
  if (playerData.players[id].playerScore !== 0) {
    if (playerData.players[id].playerScore === undefined) {
      playerData.players[id].playerScore = 0;
    }
    playerData.players[id].keepScore(id);
    console.log("ID: " + id + "; Score: " + playerData.players[id].playerScore)
  };
};

Player.prototype.keepScore = function (id) {
  let diceNum = diceNumber();
  if (diceNum === 1) {
    playerData.players[id].playerScore = 0;
    endRound();
  } else if (diceNum !== 1) {
    this.playerScore += diceNum;
  }
};

function diceNumber() {
  min = Math.ceil(1);
  max = Math.floor(6);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function endRound(event) {
  if (playerData.players[2].playerScore === undefined) {
  playerData.finalScores[1] = playerData.players[1].playerScore;
  playerData.players[1].playerScore = 0;
  } else if (playerData.players[2].playerScore >= 0) {
    playerData.finalScores[2] = playerData.players[2].playerScore;
    playerData.players[2].playerScore = 0;
    scoreBoard();
};
}


// Business Logic

function scoreBoard() {
  document.getElementById("hold").classList.add("hidden");
  document.getElementById("roll-die").classList.add("hidden");
  let playerOneScore =  playerData.finalScores[1];
  console.log("Player One Score: " + playerOneScore)
  let playerTwoScore =  playerData.finalScores[2];
  console.log("Player Two Score: " + playerTwoScore)
}




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
  document.getElementById("player-creation").classList.add("hidden");
};

window.addEventListener("load", function () {
  this.document.querySelector("form").addEventListener("submit", playerCreation)
  this.document.querySelector("button#roll-die").addEventListener("click", rollDice)
  this.document.querySelector("button#hold").addEventListener("click", endRound)
});