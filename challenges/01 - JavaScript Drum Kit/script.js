'use strict';

const audioElements = [...document.querySelectorAll('audio[data-key]')];
const keyCodesInUse = audioElements.map(el => el.dataset.key);

document.addEventListener('keypress', ({ key }) => {
  const keyCode = key.toUpperCase().charCodeAt();
  if (!keyCodesInUse.includes(keyCode.toString())) return;

  document.querySelector(`audio[data-key="${keyCode}"]`).play();

  const button = document.querySelector(`div[data-key="${keyCode}"]`);
  button.classList.add('playing');
  setTimeout(() => button.classList.remove('playing'), 70);
});
