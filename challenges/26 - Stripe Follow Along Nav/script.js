'use strict';

const dropdownBg = document.querySelector('.dropdownBackground');
const triggers = document.querySelectorAll('.cool>li');
const nav = document.querySelector('.top');

const showSubmenu = ({ currentTarget }) => {
  currentTarget.classList.add('trigger-enter');
  setTimeout(() => currentTarget.classList.contains('trigger-enter')
      && currentTarget.classList.add('trigger-enter-active'), 150);
  dropdownBg.classList.add('open');

  const dropdown = currentTarget.querySelector('.dropdown');
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();

  const { width } = dropdownCoords;
  const { height } = dropdownCoords;
  const top = dropdownCoords.top - navCoords.top;
  const left = dropdownCoords.left - navCoords.left;

  dropdownBg.style.width = `${width}px`;
  dropdownBg.style.height = `${height}px`;
  dropdownBg.style.setProperty('transform', `translate(${left}px, ${top}px)`);
};

const hideSubmenu = ({ currentTarget }) => {
  currentTarget.classList.remove('trigger-enter', 'trigger-enter-active');
  dropdownBg.classList.remove('open');
};

triggers.forEach(li => li.addEventListener('mouseenter', showSubmenu));
triggers.forEach(li => li.addEventListener('mouseleave', hideSubmenu));
