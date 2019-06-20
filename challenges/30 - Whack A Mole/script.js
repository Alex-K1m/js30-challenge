'use strict';

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole = null;
let hideMoleTimerId = null;
let score = 0;
let isGameRunning = false;

const genRandom = (min, max) => Math.floor(
  Math.random() * (max + 1 - min) + min,
);

const showMole = () => {
  const holeIdx = genRandom(0, holes.length - 1);
  if (holeIdx === lastHole) {
    return showMole();
  }
  lastHole = holeIdx;
  holes[holeIdx].classList.add('up');
  hideMoleTimerId = setTimeout(hideMole, genRandom(5, 10) * 100);
};

const hideMole = () => {
  document.querySelector('.up').classList.remove('up');
  if (isGameRunning) showMole();
};

const whack = ({ currentTarget }) => {
  clearTimeout(hideMoleTimerId);
  score += 1;
  scoreBoard.textContent = score;
  hideMole();
};

const startGame = () => {
  score = 0;
  scoreBoard.textContent = score;
  showMole();
  isGameRunning = true;
  setTimeout(() => { isGameRunning = false; }, 5000);
};

moles.forEach(mole => mole.addEventListener('click', whack));
