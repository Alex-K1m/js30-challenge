'use strict';

const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

const removeArticles = str => str
  .match(/(?:^(?:the|a|an)\s)?(.*)/i)[1]
  .toLowerCase();

document.getElementById('bands').append(...bands
  .sort((str1, str2) => (removeArticles(str1) < removeArticles(str2) ? -1 : 1))
  .map((str) => {
    const li = document.createElement('li');
    li.textContent = str;
    return li;
  }));
