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
Player.prototype.keepScore = function () {
  let diceNum = diceNumber();
  if (diceNum !== 1) {
    this.playerScore = 0;
  } else {
    this.playerScore += diceNum;
  }
};



function endRound(player) {
  if (PlayerList.players[2].playerScore) {
    // Trigger scoreboard function
  };
  // End round, switch player
  // Trigger function to send the player number and player score to an object
  playerData.finalScores[player.id] = player.playerScore;
};

// Returns a random number between 1 and 6
function diceNumber() {
  min = Math.ceil(1);
  max = Math.floor(6);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function rollDice(event) {
  roundSystem();
}

// Business Logic
function roundSystem() {
  const rollDie = document.getElementById("roll-die");
  idArray = Object.keys(playerData.players)
  console.log("Confirm ID Array: " + idArray);
  idArray.forEach(id => {
    console.log("Confirm Player Score: " + playerData.players[id].playerScore);
    while (playerData.players[id].playerScore !== 0) {
      if (playerData.players[id].playerScore === undefined) {
        playerData.players[id].playerScore = 0;
      }
      playerData.players[id].keepScore();
      console.log(playerData.players[id].playerScore)
    } console.log("break");
    });
  };





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