const game = () => {
    let pScore = 0;
    let cScore = 0;

    /**
     * Adds an event listener to each hand that will play the animation when clicked.       
     * @returns None       
     */
    const playMatch = () => {

      const options = document.querySelectorAll(".options button");
      const playerHand = document.querySelector(".player-hand");
      const computerHand = document.querySelector(".computer-hand");
      const hands = document.querySelectorAll(".hands img");
  
      hands.forEach(hand => {
        hand.addEventListener("animationend", function() {
          this.style.animation = "";
        });
      });

      /**
       * Takes in the player's choice and the computer's choice and determines who won.           
       * @param {string} playerChoice - the player's choice           
       * @param {string} computerChoice - the computer's choice           
       * @returns None           
       */
      const computerOptions = ["rock", "paper", "scissors"];
  
      options.forEach(option => {
        option.addEventListener("click", function() {

          const computerNumber = Math.floor(Math.random() * 3);
          const computerChoice = computerOptions[computerNumber];
  
          setTimeout(() => {

            compareHands(this.textContent, computerChoice);

            playerHand.src = `./photos/${this.textContent}.png`;
            computerHand.src = `./photos/${computerChoice}.png`;
          }, 2000);

          /**
           * Shakes the player and computer hands.                     
           */
          playerHand.style.animation = "shakePlayer 2s ease";
          computerHand.style.animation = "shakeComputer 2s ease";
        });
      });
    };
  
    /**
     * Updates the score of the game.           
     * @returns None           
     */
    const updateScore = () => {
      const playerScore = document.querySelector(".player-score p");
      const computerScore = document.querySelector(".computer-score p");
      playerScore.textContent = pScore;
      computerScore.textContent = cScore;
    };
  
    /**
     * Compares the player's choice to the computer's choice and determines who wins.           
     * @param {string} playerChoice - the player's choice           
     * @param {string} computerChoice - the computer's choice           
     * @returns None           
     */
    const compareHands = (playerChoice, computerChoice) => {

      const winner = document.querySelector(".winner");

      if (playerChoice === computerChoice) {
        winner.textContent = "It is a tie";
        return;
      }

      if (playerChoice === "rock") {
        if (computerChoice === "scissors") {
          winner.textContent = "You Win";
          pScore++;
          updateScore();
          return;
        } else {
          winner.textContent = "Computer Wins";
          cScore++;
          updateScore();
          return;
        }
      }

      if (playerChoice === "paper") {
        if (computerChoice === "scissors") {
          winner.textContent = "Computer Wins";
          cScore++;
          updateScore();
          return;
        } else {
          winner.textContent = "You Win";
          pScore++;
          updateScore();
          return;
        }
      }

      if (playerChoice === "scissors") {
        if (computerChoice === "rock") {
          winner.textContent = "Computer Wins";
          cScore++;
          updateScore();
          return;
        } else {
          winner.textContent = "You Win";
          pScore++;
          updateScore();
          return;
        }
      }
    };
  
    playMatch();
  };
  

  game();

  