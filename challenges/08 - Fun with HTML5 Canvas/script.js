'use strict';

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('draw'));
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

let mouseDown = false;

const drawCircle = (x, y, r) => {
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2);
  c.fillStyle = 'Dodger Blue';
  c.fill();
};

const paint = ({ x, y }) => {
  if (mouseDown) {
    drawCircle(x, y, 20);
  }
};

canvas.addEventListener('mousedown', (e) => { mouseDown = true; paint(e); });
canvas.addEventListener('mouseup', () => { mouseDown = false; });
canvas.addEventListener('mouseleave', () => { mouseDown = false; });
canvas.addEventListener('mousemove', paint);
