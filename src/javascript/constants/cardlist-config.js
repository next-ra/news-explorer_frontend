const button = document.querySelector('.cards__button');
const CARDLIST_CONFIG = {

  container: document.querySelector('.cards__wrapper'),
  section: document.querySelector('.cards'),
  button,
  buttonProps: [{
    element: button,
    className: 'cards__button_active',
  }],

};
export default CARDLIST_CONFIG;
