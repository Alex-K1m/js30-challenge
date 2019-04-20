'use strict';

document.addEventListener('keypress', ({ key }) => {
  const keyCode = key.toUpperCase().charCodeAt();
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  if (!audio) return;
  audio.play();

  const button = document.querySelector(`div[data-key="${keyCode}"]`);
  button.classList.add('playing');
});

document.querySelectorAll('.key')
  .forEach(button => button.addEventListener('transitionend', (e) => {
    // filter out a bunch of other css properties transitioned:
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }));
