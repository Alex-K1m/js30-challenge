'use strict';

const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector('canvas.background'));
const c = canvas.getContext('2d');
const numOfCircles = 6;

const genRandomInt = (min = 0, max = 1) => Math.round(
  Math.random() * (max - min) + min,
);

class Circle {
  constructor() {
    this.init();
    this.x = genRandomInt(-200, window.innerWidth);
    this.y = genRandomInt(-200, window.innerHeight);
  }

  init() {
    const range = Math.round((window.innerWidth + window.innerHeight) / 5);
    this.radius = genRandomInt(2 * range, range);
    const delta = genRandomInt(5, 20) / 10;
    this.dx = delta;
    this.dy = delta;
    if (genRandomInt()) {
      this.x = -1 * this.radius;
      this.y = genRandomInt(0, window.innerHeight - 2 * this.radius);
    } else {
      this.x = genRandomInt(0, window.innerWidth - 2 * this.radius);
      this.y = -1 * this.radius;
    }
  }

  update() {
    if (this.x - this.radius > window.innerWidth
    || this.y - this.radius > window.innerHeight) {
      this.init();
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  draw() {
    this.update();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = 'rgba(255, 198, 0, 0.2)';
    c.fill();
  }
}

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener('resize', resizeCanvas);

const circles = new Array(numOfCircles)
  .fill(null)
  .map(() => new Circle());

const animate = () => {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circles.forEach(circle => circle.draw());
  requestAnimationFrame(animate);
};

resizeCanvas();
animate();
