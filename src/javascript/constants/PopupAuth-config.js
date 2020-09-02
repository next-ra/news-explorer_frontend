const popup = document.querySelector('#popup-sign-in');

const POPUP_AUTHENTICATION_CONFIG = {
  popup,
  form: document.querySelector('#form-sign-in'),
  button: document.querySelector('#button-sign-in'),
  popupProps: [{
    element: popup,
    className: ('popup_active'),
  }],
};
export default POPUP_AUTHENTICATION_CONFIG;
