'use strict';

const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const state = { items: [] };

const makeLi = (idx, text, checked = false) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('id', `item${idx}`);
  input.setAttribute('data-index', `${idx}`);
  if (checked) input.setAttribute('checked');

  const label = document.createElement('label');
  label.setAttribute('for', `item${idx}`);
  label.textContent = text;

  const li = document.createElement('li');
  li.append(input, label);
  return li;
};

const populateList = (listItems = [], list) => {
  const renderedLis = [...list.querySelectorAll('input[data-index]')]
    .map(input => Number(input.dataset.index));
  list.append(...listItems
    .filter(({ idx }) => !renderedLis.includes(idx))
    .map(({ idx, text, done }) => makeLi(idx, text, done)));
};

const addItem = (e) => {
  e.preventDefault();
  const form = e.target;
  const text = form.querySelector('input[name=item]').value;
  const { items } = state;
  state.items = [...items, { idx: items.length, text, done: false }];
  populateList(state.items, itemsList);
  form.reset();
};

addItems.addEventListener('submit', addItem);
