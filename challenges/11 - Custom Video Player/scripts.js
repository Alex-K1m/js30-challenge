'use strict';

const player = /** @type {HTMLMediaElement} */ (document.querySelector('.player__video'));
const playBtn = document.querySelector('.player__button.toggle');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const volume = document.querySelector('input[name=volume]');
const playbackRate = document.querySelector('input[name=playbackRate]');
const skipBtns = document.querySelectorAll('.player__button[data-skip]');
let mouseDown = false;

const togglePlay = () => {
  if (player.paused) player.play();
  else player.pause();
};

const updatePlayBtn = () => {
  playBtn.textContent = player.paused ? '►' : '⏸';
};

const updateProgress = () => {
  const percent = player.currentTime / player.duration * 100;
  progressFilled.style.flexBasis = `${percent}%`;
};

const setTime = ({ offsetX }) => {
  player.currentTime = player.duration * offsetX / progress.clientWidth;
};

const adjustVolumeAndPlayback = ({ target: { value, name } }) => {
  player[name] = value;
};

const skipTime = ({ target: { dataset: { skip } } }) => {
  player.currentTime += Number(skip);
};

player.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);
player.addEventListener('play', updatePlayBtn);
player.addEventListener('pause', updatePlayBtn);
player.addEventListener('durationchange', updateProgress);
player.addEventListener('timeupdate', updateProgress);
progress.addEventListener('mousedown', (e) => { mouseDown = true; setTime(e); });
progress.addEventListener('mouseup', () => { mouseDown = false; });
progress.addEventListener('mousemove', e => mouseDown && setTime(e));
volume.addEventListener('input', adjustVolumeAndPlayback);
playbackRate.addEventListener('input', adjustVolumeAndPlayback);
skipBtns.forEach(btn => btn.addEventListener('click', skipTime));
