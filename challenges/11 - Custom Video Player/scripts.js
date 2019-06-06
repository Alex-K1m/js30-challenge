'use strict';

const player = /** @type {HTMLMediaElement} */ (document.querySelector('.player__video'));
const playBtn = document.querySelector('.player__button');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');

const togglePlay = () => {
  if (player.paused) {
    player.play();
    playBtn.textContent = '⏸';
  } else {
    player.pause();
    playBtn.textContent = '►';
  }
};

const updateProgress = () => {
  const percent = player.currentTime / player.duration * 100;
  progressFilled.style.flexBasis = `${percent}%`;
};

const setTime = ({ offsetX }) => {
  player.currentTime = player.duration * offsetX / progress.clientWidth;
};

const adjustVolume = ({ target: { value } }) => {
  player.volume = value;
};

const adjustPlaybackRate = ({ target: { value } }) => {
  player.playbackRate = value;
};

player.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);
player.addEventListener('durationchange', updateProgress);
player.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', setTime);
document
  .querySelector('input[name=volume]')
  .addEventListener('input', adjustVolume);
document
  .querySelector('input[name=playbackRate]')
  .addEventListener('input', adjustPlaybackRate);
