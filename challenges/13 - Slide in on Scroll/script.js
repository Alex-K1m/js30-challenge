'use strict';

function debounce(fn, ms = 20) {
  let timer = null;
  return (...args) => {
    const onComplete = () => {
      fn.apply(this, args);
      timer = null;
    };
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(onComplete, ms);
  };
}

const images = document.querySelectorAll('.slide-in');

const watchScroll = () => {
  images.forEach((image) => {
    const slideInAt = window.scrollY + window.innerHeight - image.height / 2;
    const imageBottom = image.offsetTop + image.height;
    const isHalfShown = slideInAt > image.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      image.classList.add('active');
    } else {
      image.classList.remove('active');
    }
  });
};

window.addEventListener('scroll', debounce(watchScroll));
