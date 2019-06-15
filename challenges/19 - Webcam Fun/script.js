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
