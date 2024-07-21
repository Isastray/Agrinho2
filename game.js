const score = document.querySelector('.score');
const cavalo = document.querySelector('.cavalo');
const cerca = document.querySelector('.cerca');
const overlay = document.querySelector('.overlay');
const reset = document.querySelector('.reset');
const overlayScore = document.querySelector('.overlay-score');
const startGameInfo = document.querySelector('.start-game');

let countScore = 0;
let startGame = true;
let timerVerifyDead;
let timerScore;
let timerSpeed;

startGameInfo.innerHTML =
  'Pressione qualquer tecla para iniciar. <br/> Bom jogo!!!';

reset.addEventListener('click', () => window.location.reload());

window.addEventListener('keypress', () => {
  cerca.classList.add('cercaRun');
  cavalo.classList.add('jump');

  setTimeout(() => cavalo.classList.remove('jump'), 500);

  if (startGame) {
    let cercaSpeed = 1.5;
    startGameInfo.innerHTML = '';
    startGameInfo.style.background = 'transparent';
    timerScore = setInterval(() => {
      countScore++;
      score.innerHTML = `SCORE ${countScore}`;
    }, 1500);

    timerSpeed = setInterval(() => {
      cercaSpeed -= 0.1;
      if (cercaSpeed <= 0) {
        cercaSpeed = 0.6;
      }
      console.log({ cercaSpeed });
      cerca.style.animationDelay = `cerca-animate ${cercaSpeed}s infinite linear`;
    }, 1000 * 10);
  }

  startGame = false;

  timerVerifyDead = setInterval(() => {
    handleLogicForGameOver();
  }, 10);
});

const handleLogicForGameOver = () => {
  const cercaLocalization = cerca.offsetLeft;
  const cavaloLocalization = +window
    .getComputedStyle(cavalo)
    .bottom.replace('px', '');

  if (
    cercaLocalization <= 120 &&
    cercaLocalization > 0 &&
    cavaloLocalization < 80
  ) {
    cerca.style.animation = '';
    cerca.style.left = `${cercaLocalization}px`;

    cavalo.src = './game-over.png';
    cavalo.style.marginLeft = '50px';
    cavalo.style.bottom = `-200px`;
    cavalo.style.width = '80px';
    cavalo.classList.add('dead');

    overlayScore.innerHTML = `SCORE ${countScore}`;
    overlay.style.display = 'flex';

    clearInterval(timerScore);
    clearInterval(timerVerifyDead);
  }
};
