'use strict';

const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector('canvas.background'));
const { innerWidth } = window;
const { innerHeight } = window;
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');

const genRandomInt = (min = 0, max = 1) => Math.round(
  Math.random() * (max - min) + min,
);

class Circle {
  constructor() {
    this.init();
    this.x = genRandomInt(-200, innerWidth);
    this.y = genRandomInt(-200, innerHeight);
  }

  init() {
    this.radius = genRandomInt(100, 200);
    const delta = genRandomInt(5, 20) / 10;
    this.dx = delta;
    this.dy = delta;
    if (genRandomInt()) {
      this.x = -1 * this.radius;
      this.y = genRandomInt(0, innerHeight - 2 * this.radius);
    } else {
      this.x = genRandomInt(0, innerWidth - 2 * this.radius);
      this.y = -1 * this.radius;
    }
  }

  update() {
    if (this.x - this.radius > innerWidth
    || this.y - this.radius > innerHeight) {
      this.init();
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  draw() {
    this.update();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = 'rgba(128, 128, 128, 0.5)';
    c.fill();
  }
}

const circles = new Array(8)
  .fill(null)
  .map(() => new Circle());

const animate = () => {
  c.clearRect(0, 0, innerWidth, innerHeight);
  circles.forEach(circle => circle.draw());
  requestAnimationFrame(animate);
};

animate();
