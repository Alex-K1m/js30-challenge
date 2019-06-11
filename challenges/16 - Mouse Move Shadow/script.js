'use strict';

const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 500;

const shadow = ({ target, offsetX, offsetY }) => {
  const { offsetWidth: width, offsetHeight: height } = hero;
  const fixX = this !== target ? target.offsetLeft : 0;
  const fixY = this !== target ? target.offsetTop : 0;
  const x = offsetX + fixX;
  const y = offsetY + fixY;
  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));

  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(255, 0, 255, 0.7),
    ${xWalk * -1}px ${yWalk * -1}px 0 rgba(0, 255, 255, 0.7),
    ${yWalk}px ${xWalk}px 0 rgba(0, 255, 0, 0.7),
    ${yWalk * -1}px ${xWalk * -1}px 0 rgba(0, 0, 255, 0.7)
  `;
};

hero.addEventListener('mousemove', shadow);
