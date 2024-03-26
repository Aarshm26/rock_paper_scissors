let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };
  
  updateScoreElement();
  
  let isAutoPlaying = false;
  let intervalId;
  
  function toggleAutoPlay() {
    if (!isAutoPlaying) {
      intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;
    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  }
  
  function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  }
  
  document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
      playGame('rock');
      highlightSelectedMove('.js-rock-button');
    });
  
  document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
      playGame('paper');
      highlightSelectedMove('.js-paper-button');
    });
  
  document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
      playGame('scissors');
      highlightSelectedMove('.js-scissors-button');
    });
  
  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      playGame('rock');
      highlightSelectedMove('.js-rock-button');
    } else if (event.key === 'p') {
      playGame('paper');
      highlightSelectedMove('.js-paper-button');
    } else if (event.key === 's') {
      playGame('scissors');
      highlightSelectedMove('.js-scissors-button');
    }
  });
  
  function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';
  
    if (playerMove === computerMove) {
      result = 'Tie.';
    } else if ((playerMove === 'rock' && computerMove === 'scissors') ||
               (playerMove === 'paper' && computerMove === 'rock') ||
               (playerMove === 'scissors' && computerMove === 'paper')) {
      result = 'You win.';
    } else {
      result = 'You lose.';
    }
  
    let reason = '';
    if (result === 'You win.') {
      score.wins++;
      reason = `<img src="images/${playerMove}.png" class="move-icon"> beats <img src="images/${computerMove}.png" class="move-icon">`;
    } else if (result === 'You lose.') {
      score.losses++;
      reason = `<img src="images/${computerMove}.png" class="move-icon"> beats <img src="images/${playerMove}.png" class="move-icon">`;
    } else {
      score.ties++;
      reason = `Both chose <img src="images/${playerMove}.png" class="move-icon">`;
    }
  
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
  
    document.querySelector('.js-result').innerHTML = `${result}. ${reason}`;
  }
  
  function updateScoreElement() {
    document.querySelector('.js-wins').textContent = score.wins;
    document.querySelector('.js-losses').textContent = score.losses;
    document.querySelector('.js-ties').textContent = score.ties;
  }
  
  function pickComputerMove() {
    const moves = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  }
  
  function highlightSelectedMove(selectedMoveButton) {
    const moveButtons = document.querySelectorAll('.move-button');
    moveButtons.forEach(button => {
      button.classList.remove('selected');
    });
  
    const selectedButton = document.querySelector(selectedMoveButton);
    selectedButton.classList.add('selected');
  }
  