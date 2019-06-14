'use strict';

const totalSeconds = [...document.querySelectorAll('.videos>li')]
  .map(node => node.dataset.time)
  .reduce((sec, str) => {
    const match = str.match(/(\d+):(\d+)/);
    return sec + Number(match[1]) * 60 + Number(match[2]);
  }, 0);

console.log(new Date(totalSeconds * 1000).toLocaleTimeString());
