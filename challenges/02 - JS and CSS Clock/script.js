'use strict';

const secToDeg = sec => sec * 6; // 360 deg / 60 sec

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

const time = new Date(Date.now());
const sec = time.getSeconds();
const ms = time.getMilliseconds();

const tick = initClockHand(secondHand, secToDeg(sec), secToDeg(1));

const syncTick = () => {
  tick();
  setInterval(tick, 1000);
};

setTimeout(syncTick, 1000 - ms);
