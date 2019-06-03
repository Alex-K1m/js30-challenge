'use strict';

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('draw'));
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');

function makeDrawingEvent(element) {
  let mouseDown = false;
  let recipients = [];

  const setMouseDown = () => { mouseDown = true; };

  const unsetMouseDown = () => { mouseDown = false; };

  const dispatch = (e) => {
    if (!mouseDown) return;
    recipients.forEach(async rec => rec(e));
  };

  const subscribe = (...rest) => {
    recipients = [...recipients, ...rest];
  };

  const unSubscribe = (...rest) => {
    recipients = recipients.filter(rec => !rest.includes(rec));
  };

  element.addEventListener('mousedown', setMouseDown);
  element.addEventListener('mouseup', unsetMouseDown);
  element.addEventListener('mouseleave', unsetMouseDown);
  element.addEventListener('mousemove', dispatch);

  return { subscribe, unSubscribe };
}

function makeBrush(c) {
  let last = {};
  let hue = 0;
  let size = 6;
  let delta = 1;

  const paint = ({ x, y }) => {
    c.beginPath();
    c.moveTo(last.x, last.y);
    c.lineTo(x, y);

    c.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    c.lineWidth = size;
    c.lineJoin = 'round';
    c.lineCap = 'round';
    c.stroke();

    last = { x, y };
    hue = (hue + 1) % 360;
    if (size <= 5 || size >= 60) {
      delta *= -1;
    }
    size += delta;
  };

  const moveTo = ({ x, y }) => {
    last = { x, y };
  };

  return { paint, moveTo };
}

const brush = makeBrush(context);
const drawingEvent = makeDrawingEvent(canvas);
drawingEvent.subscribe(brush.paint);
canvas.addEventListener('mousedown', brush.moveTo);
