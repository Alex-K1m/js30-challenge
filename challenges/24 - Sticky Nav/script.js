'use strict';

const nav = document.getElementById('main');
const logo = nav.querySelector('.logo');
const navOffset = nav.offsetTop;

const fixNav = () => {
  if (window.scrollY >= navOffset) {
    document.body.style.paddingTop = `${nav.offsetHeight}px`;
    nav.classList.add('fixed');
    logo.style.maxWidth = '100%';
  } else {
    document.body.style.paddingTop = 0;
    nav.classList.remove('fixed');
    logo.style.maxWidth = 0;
  }
};

window.addEventListener('scroll', fixNav);
