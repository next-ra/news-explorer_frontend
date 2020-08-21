import './index.css';

const menuIcon = document.querySelector('#menu-icon');
const menu = document.querySelector('#mobile-menu');
const page = document.querySelector('#page');
const header = document.querySelector('#header');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('menu-icon__active');
  menu.classList.toggle('nav-box__mobile_active');
  page.classList.toggle('page_menu_active');
  header.classList.toggle('header__fixed');
};
