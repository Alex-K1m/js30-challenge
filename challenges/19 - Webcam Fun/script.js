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

const paintToCanvas = () => {
  const { videoWidth, videoHeight } = video;
  canvas.width = videoWidth;
  canvas.height = videoHeight;

  const render = () => { ctx.drawImage(video, 0, 0, videoWidth, videoHeight); };
  setInterval(render, 17);
};

video.addEventListener('canplay', paintToCanvas);

getVideo();
