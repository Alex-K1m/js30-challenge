'use strict';

let mouseDown = false;
let beginDragX = 0;
const items = document.querySelector('.items');

const drag = ({ pageX }) => {
  if (!mouseDown) return;
  const x = pageX - items.offsetLeft;
  items.scrollLeft += beginDragX - x;
  beginDragX = x;
};

const activate = ({ pageX }) => {
  items.classList.add('active');
  mouseDown = true;
  beginDragX = pageX - items.offsetLeft;
};

const deactivate = () => {
  items.classList.remove('active');
  mouseDown = false;
};

items.addEventListener('mousedown', activate);
items.addEventListener('mouseup', deactivate);
items.addEventListener('mouseleave', deactivate);
items.addEventListener('mousemove', drag);
