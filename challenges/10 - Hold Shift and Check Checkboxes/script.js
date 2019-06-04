'use strict';

let lastCheckboxClicked = null;
const checkboxes = [...document.querySelectorAll('input')];

const onClick = ({ target, shiftKey }) => {
  if (lastCheckboxClicked && shiftKey) {
    const lastIdx = checkboxes.indexOf(lastCheckboxClicked);
    const currentIdx = checkboxes.indexOf(target);
    const stateToSet = target.checked;
    checkboxes
      .slice(Math.min(lastIdx, currentIdx), Math.max(lastIdx, currentIdx) + 1)
      .forEach((checkbox) => { checkbox.checked = stateToSet; });
  }
  lastCheckboxClicked = target;
};

checkboxes.forEach(checkbox => checkbox.addEventListener('click', onClick));
