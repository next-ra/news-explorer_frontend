const SEARCH_CONFIG = {
  cardsSection: document.querySelector('.cards'),
  notFound: document.querySelector('.not-found'),
  container: document.querySelector('.cards__wrapper'),
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-form__input'),
  button: document.querySelector('.search-form__button'),

  preloaderProps: [{
    element: document.querySelector('#preloader'),
    className: 'preloader_active',
  }],

  notFoundProps: [{
    element: document.querySelector('.not-found'),
    className: 'not-found_active',
  }],
};
export default SEARCH_CONFIG;
