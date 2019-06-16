'use strict';

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

const words = document.querySelector('.words');

const addParagraph = (parent) => {
  const p = document.createElement('p');
  parent.appendChild(p);
};

recognition.addEventListener('result', ({ results: resList }) => {
  const transcript = [...resList]
    .map(list => list[0])
    .map(result => result.transcript)
    .join('');

  const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
  words.querySelector(':last-child').textContent = poopScript;

  if (resList[0].isFinal) {
    addParagraph(words);
  }
});

recognition.addEventListener('end', recognition.start);

addParagraph(words);
recognition.start();
