function PlayerData() {
  this.players = {};
  this.finalScores = {};
  this.currentId = 0;
};

PlayerData.prototype.addPlayer = function (player) {
  player.id = this.assignId();
  this.players[player.id] = player;
};

PlayerData.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};


function Player(playerName) {
  this.playerName = playerName;
};

Player.prototype.calculate = function (id) {
  if (this.playerScore !== 0) {
    if (this.playerScore === undefined) {
      this.playerScore = 0;
    }
    this.keepScore();
  };
};

Player.prototype.keepScore = function () {
  let diceNum = diceNumber();
  if (diceNum === 1) {
    this.playerScore = 0;
    scoreBoard();
    endRound();
  } else if (diceNum !== 1) {
    this.playerScore += diceNum;
    scoreBoard();
  };
};


// Business Logic

let playerData = new PlayerData();

function rollDice() {
  if (playerData.players[1].playerScore === 0) {
    playerData.players[2].calculate(2);
  } else { playerData.players[1].calculate(1) };
};

function diceNumber() {
  min = Math.ceil(1);
  max = Math.floor(6);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function endRound() {
  document.getElementById("play-with-AI").classList.add("hidden");
  if (playerData.players[2].playerScore === undefined && playerData.players[1].playerScore !== undefined) {
    playerData.finalScores[1] = playerData.players[1].playerScore;
    playerData.players[1].playerScore = 0;
    turnCPU();
  } else if (playerData.players[1].playerScore === undefined) {
    playerData.players[1].playerScore = 0;
    playerData.finalScores[1] = playerData.players[1].playerScore;
    turnCPU();
  } else if (playerData.players[2].playerScore >= 0) {
    playerData.finalScores[2] = playerData.players[2].playerScore;
    playerData.players[2].playerScore = 0;
    winScreen();
  };
};

// UI Logic

function turnCPU() {
  document.getElementById("play-with-AI").classList.remove("hidden");
  document.getElementById("roll-die").classList.add("hidden");
  document.getElementById("hold").classList.add("hidden");
}

function scoreBoard() {
  const playerOneSpan = document.getElementById("player1-span");
  const playerTwoSpan = document.getElementById("player2-span");
  if (playerData.players[2].playerScore === undefined) {
    playerOneSpan.innerText = playerData.players[1].playerScore;
  } else if (playerData.players[2].playerScore) {
    playerTwoSpan.innerText = playerData.players[2].playerScore;
  };
};
function playerCreation(event) {
  event.preventDefault();
  const playerOneName = document.getElementById("player-one-name").value;
  const playerTwoName = document.getElementById("player-two-name").value;
  let playerOne = new Player(playerOneName);
  let playerTwo = new Player(playerTwoName);
  playerData.addPlayer(playerOne);
  playerData.addPlayer(playerTwo);
  document.getElementById("player-one-heading").innerText = playerOneName + ": ";
  document.getElementById("player-two-heading").innerText = playerTwoName + ": ";
  document.getElementById("player1-span").innerText = "0";
  document.getElementById("player2-span").innerText = "0";
  document.getElementById("player-creation").classList.add("hidden");
};

function winScreen() {
  document.getElementById("game-UI").classList.add("hidden");
  document.getElementById("score-board").classList.add("hidden");
  document.getElementById("win-screen").classList.remove("hidden");
  const playerOneScore = playerData.finalScores[1];
  const playerTwoScore = playerData.finalScores[2];
  const playerOneDisplay = document.getElementById("player-one-display");
  const playerTwoDisplay = document.getElementById("player-two-display");
  const winnerDisplay = document.getElementById("winner-display");
  playerOneDisplay.innerText = (playerData.players[1].playerName + ": " + playerOneScore);
  playerTwoDisplay.innerText = (playerData.players[2].playerName + ": " + playerTwoScore);
  if (playerOneScore === playerTwoScore) {
    winnerDisplay.innerText = "It's a Draw!"
  } else if (playerOneScore > playerTwoScore) {
    winnerDisplay.innerText = (playerData.players[1].playerName + " wins!!!");
  } else if (playerOneScore < playerTwoScore) {
    winnerDisplay.innerText = (playerData.players[2].playerName + " wins!!!");
  }
}
function CPU() {
  const difficultyAi = document.querySelector("input[name='AI-difficulty']:checked").value;
  if (difficultyAi === "1") {
    rollDice();
    endRound();
  } else if (difficultyAi === "2") {
    if (playerData.players[2].playerScore < 10 || playerData.players[2].playerScore === undefined) {
      rollDice();
    } else if (playerData.players[2].playerScore >= 10) { endRound() };
  } else if (difficultyAi === "3") {
    if (playerData.players[2].playerScore < 25 || playerData.players[2].playerScore === undefined) {
      rollDice();
    } else if (playerData.players[2].playerScore >= 25) { endRound() };
  }
}

function reset() {
  document.getElementById("game-UI").classList.remove("hidden");
  document.getElementById("score-board").classList.remove("hidden");
  document.getElementById("win-screen").classList.add("hidden");
  document.getElementById("play-with-AI").classList.add("hidden");
  document.getElementById("roll-die").classList.remove("hidden");
  document.getElementById("hold").classList.remove("hidden");
  document.getElementById("player1-span").innerText = "0";
  document.getElementById("player2-span").innerText = "0";
  document.getElementById("player-one-display").innerText = "";
  document.getElementById("player-two-display").innerText = "";
  document.getElementById("winner-display").innerText = "";
  playerData.players[1].playerScore = undefined;
  playerData.players[2].playerScore = undefined;
}

function displayDifficulty(event) {
  event.preventDefault();
  const gameMode = document.querySelector("input[name='game-mode']:checked").value
  if (gameMode === "1") {
    document.getElementById("player-two-name").value = "AI";
    document.getElementById("player-two").classList.add("hidden");
    document.querySelector("div#game-mode").classList.add("hidden")
    document.querySelector("div#difficulty").classList.remove("hidden")
  } else if (gameMode === "0") {
    document.querySelector("div#game-setup").classList.add("hidden")
  }
  document.querySelector("div#player-creation").classList.remove("hidden")
}

function displayCreation(event) {
  event.preventDefault();
  document.querySelector("div#difficulty").classList.add("hidden")
  document.querySelector("div#player-creation").classList.remove("hidden")
}

window.addEventListener("load", function () {
  this.document.querySelector("form#game-mode-form").addEventListener("submit", displayDifficulty);
  this.document.querySelector("form#difficulty-form").addEventListener("submit", displayCreation);
  this.document.querySelector("form#player-creation-form").addEventListener("submit", playerCreation);
  this.document.querySelector("button#roll-die").addEventListener("click", rollDice);
  this.document.querySelector("button#hold").addEventListener("click", endRound);
  this.document.querySelector("button#play-with-AI").addEventListener("click", CPU);
  this.document.querySelector("button#reset-btn").addEventListener("click", reset);
});