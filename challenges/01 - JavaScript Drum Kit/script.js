'use strict';

const playSound = ({ key }) => {
  const keyCode = key.toUpperCase().charCodeAt();
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  if (!audio) return;
  // allows to play audio along other sounds:
  new Audio(audio.src).play();

  const button = document.querySelector(`div[data-key="${keyCode}"]`);
  button.classList.add('playing');
};

const transitionBack = ({ target: { classList }, propertyName }) => {
  if (classList.contains('playing')
  // filter out a bunch of other css properties transitioned:
  && propertyName === 'transform') {
    classList.remove('playing');
  }
};

document.addEventListener('keypress', playSound);
document.querySelectorAll('.key')
  .forEach(button => button.addEventListener('transitionend', transitionBack));
