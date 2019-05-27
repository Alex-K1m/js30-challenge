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
      const span = document.createElement('span');
      span.classList.add('population');
      span.textContent = format(population);

      const li = document.createElement('li');
      li.textContent = `${city}, ${state}`;
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
    console.log(`${msg} Error: ${error}`);
  }
})();
