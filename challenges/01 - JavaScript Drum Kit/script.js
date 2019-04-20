'use strict';

document.addEventListener('keypress', ({ key }) => {
  const keyCode = key.toUpperCase().charCodeAt();
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  if (!audio) return;
  audio.play();

  const button = document.querySelector(`div[data-key="${keyCode}"]`);
  button.classList.add('playing');
  setTimeout(() => button.classList.remove('playing'), 70);
});
