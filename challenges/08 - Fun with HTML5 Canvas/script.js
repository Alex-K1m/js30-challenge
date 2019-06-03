'use strict';

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('draw'));
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

let mouseDown = false;
let last = {};
let hue = 0;
let size = 6;
let delta = 1;

c.lineJoin = 'round';
c.lineCap = 'round';

const paint = ({ x, y }) => {
  if (!mouseDown) return;
  c.beginPath();
  c.moveTo(last.x, last.y);
  c.lineTo(x, y);
  c.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  c.lineWidth = size;
  c.stroke();
  last = { x, y };
  hue = (hue + 1) % 360;
  if (size <= 5 || size >= 60) {
    delta *= -1;
  }
  size += delta;
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
