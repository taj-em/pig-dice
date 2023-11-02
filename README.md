Describe: playerCreation(event);

Test: "Confirm the creation of player 1 and 2 upon submitting player names"
Code: playerCreatoin(event);
Expected Result: Confirm Character Creation: Success

Test: "Confirm whether or not the user has decided to play against a computer"
Code: playerCreatoin(event);
Expected Result: "Confirm AI Selection"


Describe: CPU();

Test: "Automatically roll the dice once and hold if playing against computer"
Code:
  CPU() { 
    rollDice();
    endRound();
  }
Expected Result: AI: Dice Number

Test: "Roll the dice once per 'CPU round' event, automatically hold if score is bigger than 9"
Code:
  CPU() {
  if (playerData.players[1].playerScore < 10 || playerData.players[1].playerScore === undefined) {
    rollDice();
  } else if (playerData.players[1].playerScore >= 10) {endRound()};
}
Expected Result: AI: >= 10 or 0