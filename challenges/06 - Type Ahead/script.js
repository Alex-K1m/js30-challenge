'use strict';

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const initialUl = document
  .querySelector('.suggestions')
  .cloneNode(true);

const updateList = ul => document
  .querySelector('.suggestions')
  .replaceWith(ul);

const filterCities = data => ({ target: { value } }) => {
  if (value === '') {
    updateList(initialUl);
    return;
  }

  const list = data
    .filter(({ city }) => city.includes(value))
    .map(({ city, population }) => {
      const span = document.createElement('span');
      span.classList.add('population');
      span.textContent = population;

      const li = document.createElement('li');
      li.textContent = city;
      li.append(span);
      return li;
    });

  const ul = document.createElement('ul');
  ul.classList.add('suggestions');
  ul.append(...list);
  updateList(ul);
};

(async () => {
  const response = await fetch(endpoint);
  const data = await response.json();
  document
    .querySelector('.search')
    .addEventListener('input', filterCities(data));
})();
