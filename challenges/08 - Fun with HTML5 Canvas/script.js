'use strict';

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('draw'));
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

let mouseDown = false;
let last = {};
c.strokeStyle = 'gray';
c.lineJoin = 'round';
c.lineCap = 'round';
c.lineWidth = 20;

const paint = ({ x, y }) => {
  if (!mouseDown) return;
  c.beginPath();
  c.moveTo(last.x, last.y);
  c.lineTo(x, y);
  c.stroke();
  last = { x, y };
};

const setMouseDown = ({ x, y }) => {
  mouseDown = true;
  last = { x, y };
};

const unsetMouseDown = () => { mouseDown = false; };

canvas.addEventListener('mousedown', setMouseDown);
canvas.addEventListener('mouseup', unsetMouseDown);
canvas.addEventListener('mouseleave', unsetMouseDown);
canvas.addEventListener('mousemove', paint);
