'use strict';

let timeLeft = 0;
let timerId = null;
const leftDisplay = document.querySelector('.display__time-left');
const endDisplay = document.querySelector('.display__end-time');

const tick = () => {
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  leftDisplay.textContent = `${min}:${sec < 10 ? `0${sec}` : sec}`;
  if (timeLeft === 0) {
    clearInterval(timerId);
    endDisplay.textContent = 'Time is over!';
  }
  timeLeft -= 1;
};

const setTimer = (e) => {
  e.preventDefault();
  clearInterval(timerId);
  timeLeft = Number(
    e.target.dataset.time || e.target.querySelector('input').value * 60,
  );
  tick();
  timerId = setInterval(tick, 1000);

  const endTime = new Date(Date.now() + timeLeft * 1000).toLocaleTimeString();
  endDisplay.textContent = `Be back at ${endTime}`;
};

document
  .querySelectorAll('.timer__controls>button')
  .forEach(button => button.addEventListener('click', setTimer));

document
  .getElementById('custom')
  .addEventListener('submit', setTimer);
