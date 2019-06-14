'use strict';

const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

document.getElementById('bands').append(...bands
  .map((str, i) => [str.match(/(?:^(?:the|a|an)\s)?(.*)/i)[1].toLowerCase(), i])
  .sort(([str1], [str2]) => (str1 < str2 ? -1 : 1))
  .map(([, i]) => {
    const li = document.createElement('li');
    li.textContent = bands[i];
    return li;
  }));
