'use strict';

const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');
const min = 0.4;
const max = 4;
let mouseDown = false;

const adjustPlaybackRate = ({ pageY, currentTarget }) => {
  if (!mouseDown) return;
  const y = pageY - currentTarget.offsetTop;
  const proportion = y / currentTarget.offsetHeight;
  const height = `${Math.round(proportion * 100)}%`;
  const playbackRate = proportion * (max - min) + min;
  bar.style.height = height;
  bar.textContent = `${playbackRate.toFixed(2)}×`;
  video.playbackRate = playbackRate;
};

speed.addEventListener('mousedown', (e) => { mouseDown = true; adjustPlaybackRate(e); });
speed.addEventListener('mouseup', () => { mouseDown = false; });
speed.addEventListener('mouseleave', () => { mouseDown = false; });
speed.addEventListener('mousemove', adjustPlaybackRate);
