'use strict';

const sequence = (new Array(11)).fill(null);
const konami = '3838404037393739666513';

const onKeypress = ({ keyCode }) => {
  sequence.shift();
  sequence.push(keyCode);
  if (sequence.join('') === konami) {
    cornify_add();
  }
};

window.addEventListener('keydown', onKeypress);
