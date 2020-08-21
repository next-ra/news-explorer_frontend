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

const cards = document.querySelectorAll('.card');
cards.forEach((card) => {
  const button = card.querySelector('.card__bookmark');
  const svg = card.querySelector('.card__path');

  button.addEventListener('click', () => {
    const activeClassSvg = 'card__path_marked';

    svg.classList.toggle(activeClassSvg);
  });
});

const popupButton = document.querySelector('.header__button');
const popup = document.querySelector('#popup-sign-up');
const popupCLose = document.querySelector('#close');

// При клике на кнопку 'Грета' в хедере открывается попап регистрации
// на крестик закрывается
// Чтобы посмотреть другие попапы нужно в верстке добавить им класс popup_active
popupButton.onclick = () => popup.classList.add('popup_active');
popupCLose.onclick = () => popup.classList.remove('popup_active');
