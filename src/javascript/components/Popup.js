import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor(config, MainApi) {
    super();
    this.api = MainApi;
    this.popup = config.popup;
    this.button = config.button;
    this.form = config.form;
    this.popupProps = config.popupProps;
    this.listeners = [{
      element: this.form,
      event: 'submit',
      callback: this.submit.bind(this),
    }];
  }

  open() {
    this._show(this.popupProps);
    this.form.reset();
    this._activateInputs(this.form);
    this._removeErrors();
    this.disableSubmitButton();
    this._setListeners(this.listeners);
  }

  close() {
    this._hide(this.popupProps);
    this._unsetListeners(this.listeners);
  }

  disableSubmitButton() {
    this.button.setAttribute('disabled', true);
  }

  _removeErrors() {
    this.form.querySelectorAll('.popup__error').forEach((e) => {
      e.textContent = '';
    });
  }
}
