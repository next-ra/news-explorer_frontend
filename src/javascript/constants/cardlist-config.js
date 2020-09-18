const CARDLIST_CONFIG = {

  container: document.querySelector('.cards__wrapper'),
  section: document.querySelector('.cards'),
  defaultImage: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',

  buttonProps: [{
    element: document.querySelector('.cards__button'),
    className: 'cards__button_active',
  }],

};
export default CARDLIST_CONFIG;
