const dino = document.getElementById('dino');
const background = document.getElementById('background');
let isJumping = false;
let position = 0;
let pts = 0;

const handleKeyDown = event => {
  if (event?.keyCode === 32) {
    if (!isJumping){
      jump();
    }
  }
}

const jump = () => {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 160) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0){
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;

          dino.style.bottom = position + 'px';
        }
      }, 30);
    } else {
      position += 20;

      dino.style.bottom = position + 'px';
    }
  }, 30);
}

const createCactus = () => {
  const cactus = document.createElement('div');
  let cactusPosition = 1300;
  let randomTime = Math.random() * 6000;

  cactus.classList.add('cactus');
  cactus.style.left = cactusPosition + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
      pts += 10;
      document.getElementById('pts').innerText = pts;
    } else if (cactusPosition > 0 && cactusPosition < 60 && position <= 60) {
      const game = document.getElementById('background');
      if (game) {
        document.body.removeChild(game);
        document.body.innerHTML += '<h1 id="gameOver">FIM DE JOGO</H1>';
      }
      clearInterval(leftInterval);
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

document.addEventListener('keydown', handleKeyDown);
createCactus();
