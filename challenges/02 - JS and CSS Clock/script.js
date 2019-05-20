'use strict';

const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

const update = () => {
  const time = new Date();
  const sec = time.getSeconds();
  const min = time.getMinutes();
  const hour = time.getHours();

  const secDegrees = sec * 6 + 90;
  const minDegrees = min * 6 + sec / 10 + 90;
  const hourDegrees = (hour % 12) * 30 + min / 2 + 90;

  secondHand.style.transform = `rotate(${secDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minDegrees}deg)`;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
};

const sync = () => {
  update();
  setInterval(update, 1000);
};

update();
setTimeout(sync, 1000 - (Date.now() % 1000));
