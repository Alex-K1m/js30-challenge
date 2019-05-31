'use strict';

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('draw'));
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

let mouseDown = false;
let last = {};
const r = 20;

const paintSegment = ({ x, y }) => {
  if (!mouseDown) return;
  c.beginPath();
  const angle = Math.atan2(last.y - y, last.x - x);
  const a1 = angle - Math.PI / 2;
  const a2 = angle + Math.PI / 2;
  c.arc(last.x, last.y, r, a1, a2);
  c.arc(x, y, r, a2, a1);
  c.fillStyle = 'gray';
  c.fill();
  last = { x, y };
};

const paintCircle = ({ x, y }) => {
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2);
  c.fillStyle = 'gray';
  c.fill();
  last = { x, y };
  mouseDown = true;
};

const unsetMouseDown = () => { mouseDown = false; };

canvas.addEventListener('mousedown', paintCircle);
canvas.addEventListener('mouseup', unsetMouseDown);
canvas.addEventListener('mouseleave', unsetMouseDown);
canvas.addEventListener('mousemove', paintSegment);
