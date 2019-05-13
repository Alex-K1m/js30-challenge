'use strict';

const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector('canvas.background'));
const { innerWidth } = window;
const { innerHeight } = window;
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');

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
    c.save();
    c.rotate((Math.PI * -0.1));
    c.translate(this.x, this.y);
    c.beginPath();
    for (let i = 0; i < 4; i += 1) {
      c.lineTo(0, this.size);
      c.translate(0, this.size);
      c.rotate((Math.PI * 0.2));
      c.lineTo(0, -this.size);
      c.translate(0, -this.size);
      c.rotate(-(Math.PI * 0.7));
    }
    c.closePath();
    c.fillStyle = `rgba(255, 255, 200, ${this.opacity})`;
    c.shadowBlur = 5;
    c.shadowColor = '#ff3';
    c.fill();
    c.restore();
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
  c.clearRect(0, 0, innerWidth, innerHeight);
  stars.forEach(star => star.draw());
  requestAnimationFrame(animate);
};

animate();
