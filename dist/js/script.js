"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger'),
          menu = document.querySelector('.header__menu'),
          link = document.querySelectorAll('.header__menu-item');
          
          hamburger.addEventListener('click', () => {
            menu.classList.toggle('header__menu--active');
          });

          link.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.click();
            });
          });



    


});