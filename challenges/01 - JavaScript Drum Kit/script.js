'use strict';

document.addEventListener('keypress', ({ key }) => {
  const keyCode = key.toUpperCase().charCodeAt();
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  if (!audio) return;
  // allows to play audio along other sounds:
  new Audio(audio.src).play();

  const button = document.querySelector(`div[data-key="${keyCode}"]`);
  button.classList.add('playing');
});

document.querySelectorAll('.key')
  .forEach(button => button.addEventListener('transitionend', (e) => {
    if (e.target.classList.contains('playing')
      // filter out a bunch of other css properties transitioned:
      && e.propertyName === 'transform') {
      e.target.classList.remove('playing');
    }
  }));
