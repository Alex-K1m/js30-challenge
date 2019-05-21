'use strict';

const update = ({ target: { id, value, dataset: { sizing } } }) => {
  document.body.style.setProperty(`--${id}`, `${value}${sizing || ''}`);
};

document.querySelectorAll('.controls input')
  .forEach(input => input.addEventListener('input', update));
