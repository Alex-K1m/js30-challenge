'use strict';

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const initialUl = document
  .querySelector('.suggestions')
  .cloneNode(true);

const updateList = ul => document
  .querySelector('.suggestions')
  .replaceWith(ul);

const format = (str) => {
  if (str.length <= 3) return str;
  return `${format(str.slice(0, -3))},${str.slice(-3)}`;
};

const makeSpan = (text = '', cls = null) => {
  const span = document.createElement('span');
  if (cls) span.classList.add(cls);
  span.textContent = text;
  return span;
};

const highlight = (str, pattern) => {
  const regex = new RegExp(pattern, 'i');
  const parts = str.split(regex);
  const res = [parts[0], ...parts.slice(1)
    .reduce((acc, part) => [...acc, makeSpan(pattern, 'hl'), part], [])];
  const wrapper = makeSpan();
  wrapper.append(...res);
  return wrapper;
};

const filterCities = data => ({ target: { value } }) => {
  if (value === '') {
    updateList(initialUl);
    return;
  }

  const list = data
    .filter(({ city, state }) => {
      const pattern = new RegExp(value, 'gi');
      return pattern.test(city) || pattern.test(state);
    })
    .map(({ city, state, population }) => {
      const span = makeSpan(format(population), 'population');
      const li = document.createElement('li');
      li.append(highlight(`${city}, ${state}`, value));
      li.append(span);
      return li;
    });

  const ul = document.createElement('ul');
  ul.classList.add('suggestions');
  ul.append(...list);
  updateList(ul);
};

(async () => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    document
      .querySelector('.search')
      .addEventListener('input', filterCities(data));
  } catch (error) {
    const msg = 'Can\'t fetch cities list. Try reloading.';
    const searchField = document.querySelector('.search');
    searchField.style.fontSize = '27px';
    searchField.placeholder = msg;
    // eslint-disable-next-line no-console
    console.log(`${msg} Error: ${error}`);
  }
})();
