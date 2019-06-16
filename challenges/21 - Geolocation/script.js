'use strict';

const compass = document.querySelector('.arrow');
const speedometer = document.querySelector('.speed-value');

navigator.geolocation.watchPosition(({ coords: { speed, heading } }) => {
  speedometer.textContent = Math.round(speed * 3.6);
  compass.style.transform = `rotate(${heading}deg)`;
}, (err) => {
  console.log(err);
  alert('Geolocation is not working. See console for more info.')
});
