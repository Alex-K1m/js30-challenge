'use strict';

// 👀👀👀👀👀👀👀👀👀👀👀👀👀👀👀

const hl = document.createElement('div');
hl.classList.add('highlight');

const getFullOffset = offsetSide => (elem) => {
  const iter = (el, acc) => {
    const newAcc = acc + el[offsetSide];
    if (!el.offsetParent) return newAcc;
    return iter(el.offsetParent, newAcc);
  };
  return iter(elem, 0);
};

const getFullOffsetTop = getFullOffset('offsetTop');
const getFullOffsetLeft = getFullOffset('offsetLeft');

const highlight = ({ target }) => {
  hl.style.width = `${target.offsetWidth}px`;
  hl.style.height = `${target.offsetHeight}px`;
  hl.style.top = `${getFullOffsetTop(target)}px`;
  hl.style.left = `${getFullOffsetLeft(target)}px`;
};

highlight({ target: document.querySelector('.menu a') });
document.body.prepend(hl);

document
  .querySelectorAll('a')
  .forEach(link => link.addEventListener('mouseover', highlight));
