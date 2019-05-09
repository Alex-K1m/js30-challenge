'use strict';

const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector('canvas.background'));

const { innerWidth } = window;
const { innerHeight } = window;
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');

class Circle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    if (this.x + this.radius > innerWidth
    || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight
    || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

const circles = new Array(20)
  .fill(null)
  .map(() => {
    const radius = Math.random() * 40 + 20;
    const x = Math.random() * (innerWidth - radius * 2) + radius;
    const y = Math.random() * (innerHeight - radius * 2) + radius;
    const dx = Math.random() * 5 + 1;
    const dy = Math.random() * 5 + 1;
    return new Circle(x, y, dx, dy, radius, 'rgba(160, 160, 255, 0.5)');
  });

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  circles.forEach(circle => circle.update());
}

animate();
