'use strict';

const secToDeg = sec => sec * 6; // 360 deg / 60 sec
const minSecToDeg = (min, sec) => min * 6 + Math.floor(sec / 10);
const hourMinToDeg = (hour, min) => (hour % 12) * 30 + Math.floor(min / 2);

const initClockHand = (hand, current, step) => {
  let degree = 90 + current; // +90deg to fix initial direction of the clock hands
  const setPosition = () => { hand.style.transform = `rotate(${degree}deg)`; };
  setPosition();

  return () => {
    degree = (degree % 360) + step;
    setPosition();
  };
};

const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

const time = new Date(Date.now());
const sec = time.getSeconds();
const min = time.getMinutes();
const hour = time.getHours();
const now = Date.now();

const tickSec = initClockHand(secondHand, secToDeg(sec), 6);
const tickMin = initClockHand(minuteHand, minSecToDeg(min, sec), 1);
const tickHour = initClockHand(hourHand, hourMinToDeg(hour, min), 1);

const sync = (tick, interval) => () => {
  tick();
  setInterval(tick, interval);
};

setTimeout(sync(tickSec, 1000), 1000 - (now % 1000));
setTimeout(sync(tickMin, 10000), 10000 - (now % 10000));
setTimeout(sync(tickHour, 120000), 120000 - (now % 120000));
