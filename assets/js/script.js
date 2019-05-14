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
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = 4;
    this.dy = 4;
  }

  update() {
    if (this.x - this.radius > innerWidth || this.y - this.radius > innerHeight) {
      this.radius = Math.round(Math.random() * 200 + 100);
      this.x = -1 * this.radius;
      this.y = genRandomInt(-this.radius, innerHeight - 2 * this.radius);
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  draw() {
    this.update();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fill();
  }
}

const testCircle = new Circle(100, 100, 50);

const animate = () => {
  c.clearRect(0, 0, innerWidth, innerHeight);
  testCircle.draw();
  requestAnimationFrame(animate);
};

animate();
