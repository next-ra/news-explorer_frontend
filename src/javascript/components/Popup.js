import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor(config, MainApi, validation, header) {
    super();
    this.api = MainApi;
    this.validation = validation;
    this.header = header;
    this.popup = config.popup;
    this.button = config.button;
    this.form = config.form;
    this.popupProps = config.popupProps;
  }

  addListeners() {
    this.listeners = [{
      element: this.form,
      event: 'submit',
      callback: (e) => this._submit(e),
    },
    {
      element: this.form,
      event: 'input',
      callback: (e) => this.validation.formValidate(e, this.form),
    },
    ];
    this._setListeners(this.listeners);
  }

  open() {
    this._show(this.popupProps);
    this.form.reset();
    this._activateInputs(this.form);
    this._removeErrors();
    this._clearInputsShadow();
    this.disableSubmitButton();
    this.addListeners();
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

  _clearInputsShadow() {
    [...this.form.elements].forEach((e) => {
      if (e.className === 'popup__input') {
        e.setAttribute('style', 'box-shadow: none');
      }
    });
  }
}
