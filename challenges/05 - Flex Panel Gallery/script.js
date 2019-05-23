'use strict';

const togglePanel = ({ target }) => {
  const panelToClose = document.querySelector('.panel.open');
  if (panelToClose && panelToClose !== target) {
    panelToClose.classList.remove('open');
  }
  target.classList.toggle('open');
};

const toggleText = ({ propertyName, target }) => {
  if (propertyName === 'flex-grow') {
    target.classList.toggle('open-active');
  }
};

document
  .querySelectorAll('.panel')
  .forEach((panel) => {
    panel.addEventListener('click', togglePanel);
    panel.addEventListener('transitionend', toggleText);
  });
