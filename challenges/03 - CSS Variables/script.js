'use strict';

const image = document.querySelector('img');

const update = ({ target: { id, value } }) => {
  image.style.setProperty(`--${id}`, value[0] === '#' ? value : `${value}px`);
};

['spacing', 'blur', 'base']
  .map(id => document.getElementById(id))
  .forEach(input => input.addEventListener('input', update));
