'use strict';

const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector('canvas.background'));
const { innerWidth } = window;
const { innerHeight } = window;
canvas.width = innerWidth;
canvas.height = innerHeight;
const context = canvas.getContext('2d');

class Star {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.opacity = Math.random();
    this.factor = 1;
    this.shift = Math.random() / 100;
  }

  update() {
    if (this.opacity >= 1) {
      this.factor = -1;
    } else if (this.opacity <= 0) {
      this.factor = 1;
      this.x = Math.floor(Math.random() * innerWidth);
      this.y = Math.floor(Math.random() * innerHeight);
    }
    this.opacity += this.shift * this.factor;
  }

  draw() {
    this.update();
    context.save();
    context.rotate((Math.PI * -1 / 10));
    context.translate(this.x, this.y);
    context.beginPath();

    for (let i = 0; i < 4; i += 1) {
      context.lineTo(0, this.size);
      context.translate(0, this.size);
      context.rotate((Math.PI * 2 / 10));
      context.lineTo(0, -this.size);
      context.translate(0, -this.size);
      context.rotate(-(Math.PI * 7 / 10));
    }
    context.closePath();

    context.fillStyle = `rgba(255, 255, 200, ${this.opacity})`;
    context.shadowBlur = 5;
    context.shadowColor = '#ff3';
    context.fill();
    context.restore();
  }
}

const stars = new Array(100)
  .fill(null)
  .map(() => {
    const x = Math.floor(Math.random() * innerWidth);
    const y = Math.floor(Math.random() * innerHeight);
    const size = 2 + Math.random() * 3;
    return new Star(x, y, size);
  });

const animate = () => {
  context.clearRect(0, 0, innerWidth, innerHeight);
  stars.forEach(star => star.draw());
  requestAnimationFrame(animate);
};

animate();
