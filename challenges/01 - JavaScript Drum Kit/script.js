'use strict';

const audioElements = [...document.querySelectorAll('audio[data-key]')];
const keyCodesInUse = audioElements.map(el => el.dataset.key);

document.addEventListener('keypress', ({ key }) => {
  const keyCode = key.toUpperCase().charCodeAt();
  if (!keyCodesInUse.includes(keyCode.toString())) return;
  document.querySelector(`audio[data-key="${keyCode}"]`).play();
});

// TODO: animate
// const buttons = document.querySelectorAll('.key');
