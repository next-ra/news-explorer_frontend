const HEADER_CONFIG = {
  header: document.querySelector('.header'),
  authButton: document.querySelector('.header__button'),
  articlesLink: document.querySelector('#saved-articles'),
  menuIcon: document.querySelector('#menu-icon'),
  svg: document.querySelector('.svg-template'),

  menuProps: [
    {
      element: document.querySelector('#page'),
      className: 'page_menu__active',
    },
    {
      element: document.querySelector('#menu-icon'),
      className: 'menu-icon__active',
    },
    {
      element: document.querySelector('.header'),
      className: 'header__fixed',
    },
    {
      element: document.querySelector('#mobile-menu'),
      className: 'nav-box__mobile_active',
    },
  ],

};
export default HEADER_CONFIG;
