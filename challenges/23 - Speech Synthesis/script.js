'use strict';

const msg = new SpeechSynthesisUtterance();
let voices = [];
let selectedOpt = 0;
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

const populateVoices = ({ target }) => {
  voices = target.getVoices();
  voicesDropdown.innerHTML = '';
  voicesDropdown.append(...voices
    // .filter(({ lang }) => lang.includes('en'))
    .map(({ name, lang }) => {
      const opt = document.createElement('option');
      opt.setAttribute('value', name);
      opt.textContent = `${name} ${lang}`;
      return opt;
    }));
  voicesDropdown.selectedIndex = selectedOpt;
};

const toggle = (startOver = true) => () => {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
};

const setVoice = ({ target: { value } }) => {
  msg.voice = voices.find(({ name }) => name === value);
  toggle();
};

const setOption = ({ target }) => {
  selectedOpt = voicesDropdown.selectedIndex;
  msg[target.name] = target.value;
  toggle();
};

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle());
stopButton.addEventListener('click', toggle(false));
