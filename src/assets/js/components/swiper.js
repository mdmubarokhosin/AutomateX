import Swiper from 'swiper/bundle';

document.addEventListener('DOMContentLoaded', () => {
  new Swiper('.agents-swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: '.agents-next',
      prevEl: '.agents-prev',
    },
  });

  new Swiper('.security-swiper', {
    effect: 'creative',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    loop: true,
    creativeEffect: {
      prev: {
        translate: ['-20%', 0, -1],
        scale: 0.85,
        opacity: 0.8,
      },
      next: {
        translate: ['20%', 0, -1],
        scale: 0.85,
        opacity: 0.8,
      },
    },
    pagination: {
      el: '.security-pagination',
      clickable: true,
      bulletClass: 'w-2.5 h-2.5 rounded-full bg-gray-400 transition-colors cursor-pointer',
      bulletActiveClass: '!bg-gray-800',
    }
  });
});

