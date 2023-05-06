let score = {
  wins: 0,
  losses: 0,
  ties: 0
};

const savedScore = JSON.parse(localStorage.getItem('score'));
if (savedScore) {
  score = savedScore;
}

updateScoreElement();

function makeMove(playerMove) {
  const computerMove = pickComputerMove();
  const resultElement = document.querySelector('.js-result');

  if (playerMove === computerMove) {
    resultElement.innerHTML = `Tie.`;
    score.ties += 1;

  } else if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    resultElement.innerHTML = `You win.`;
    score.wins += 1;

  } else {
    resultElement.innerHTML = `You lose.`;
    score.losses += 1;
  }

  const movesElement = document.querySelector('.js-moves-chosen');
  movesElement.innerHTML = `
    You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer
  `;

  updateScoreElement();
  localStorage.setItem('score', JSON.stringify(score));
}

function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };

  updateScoreElement();
  localStorage.removeItem('score');
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove;

  if (randomNumber < (1 / 3)) {
    computerMove = 'rock';
  } else if (randomNumber < (2 / 3)) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }

  return computerMove;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `
    Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
  `;
}

let isPlaying = false;
let intervalId;

function autoPlay() {
  if (!isPlaying) {
    isPlaying = true;

    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      makeMove(playerMove);
    }, 1000);

    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Stop Play';

  } else {
    isPlaying = false;
    clearInterval(intervalId);

    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Auto Play';
  }
}
  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      playGame('rock');
    } else if (event.key === 'p') {
      playGame('paper');
    } else if (event.key === 's') {
      playGame('scissors');
    
    } else if (event.key === 'a') {
      autoPlay();
    }
  });

  function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  }

  document.querySelector('.js-reset-score-button')
    .addEventListener('click', () => {
      resetScore();
    });
