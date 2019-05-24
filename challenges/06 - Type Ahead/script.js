'use strict';

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const getData = async () => {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

const initialUl = document.querySelector('.suggestions').cloneNode(true);

getData().then((data) => {
  document
    .querySelector('.search')
    .addEventListener('input', ({ target }) => {
      if (target.value === '') {
        document
          .querySelector('.suggestions')
          .replaceWith(initialUl);
        return;
      }
      const list = data
        .filter(({ city }) => city.includes(target.value))
        .map(({ city }) => {
          const li = document.createElement('li');
          li.textContent = city;
          return li;
        });
      const ul = document.createElement('ul');
      ul.classList.add('suggestions');
      ul.append(...list);
      document
        .querySelector('.suggestions')
        .replaceWith(ul);
    });
});
