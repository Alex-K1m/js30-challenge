'use strict';

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const getVideo = async () => {
  try {
    const localMediaStream = await navigator.mediaDevices
      .getUserMedia({ video: true, audio: false });
    video.srcObject = localMediaStream;
    video.play();
  } catch (err) {
    console.log('No camera access', err);
  }
};

const redEffect = (pixels) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] += 100;
  }
  return pixels;
};

const rgbSplit = (pixels) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i];
    pixels.data[i + 500] = pixels.data[i + 1];
    pixels.data[i - 550] = pixels.data[i + 2];
  }
  return pixels;
};

const greenScreen = (pixels) => {
  const levels = {};
  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });
  for (let i = 0; i < pixels.data.length; i += 4) {
    const red = pixels.data[i + 0];
    const green = pixels.data[i + 1];
    const blue = pixels.data[i + 2];
    // const alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {

      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}

const paintToCanvas = () => {
  const { videoWidth, videoHeight } = video;
  canvas.width = videoWidth;
  canvas.height = videoHeight;

  const render = () => {
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    let pixels = ctx.getImageData(0, 0, videoWidth, videoHeight);
    pixels = greenScreen(pixels);
    ctx.putImageData(pixels, 0, 0);
  };
  setInterval(render, 17);
};

const takePhoto = () => {
  snap.currentTime = 0;
  snap.play();

  const pic = canvas.toDataURL('image/jpeg');
  const img = document.createElement('img');
  img.src = pic;
  img.alt = 'your photo';
  const link = document.createElement('a');
  link.href = pic;
  link.setAttribute('download', 'picture');
  link.append(img);
  strip.prepend(link);
};

video.addEventListener('canplay', paintToCanvas);

getVideo();
