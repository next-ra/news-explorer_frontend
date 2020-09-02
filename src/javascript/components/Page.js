import BaseComponent from './BaseComponent';

export default class Page extends BaseComponent {
  constructor(config, props) {
    super();
    this.header = props.header;
    this.search = props.search;
    this.popupReg = props.popupReg;
    this.page = config.page;
    this.authButton = config.authButton;
    this.listeners = [
      {
        element: this.authButton,
        event: 'click',
        callback: (e) => this._openPopup(e),
      },
      {
        element: this.page,
        event: 'click',
        callback: (e) => this._closePopup(e),
      },
    ];
  }

  initialRender() {
    const user = sessionStorage.getItem('userName');
    this._setInitialListeners();
    this._addListeners();
    this.header.render(user);
  }

  _setInitialListeners() {
    this.header.addListeners();
    this.search.addListeners();
  }

  _openPopup(e) {
    if (e.target.classList.contains('logged-out')) {
      this.popupReg.open();
    }
  }

  _closePopup(e) {
    if (
      e.target.classList.contains('popup')
      || e.target.classList.contains('popup__close')
      || e.key === 'Escape'
    ) {
      this.popupReg.close();
    }
  }

  _addListeners() {
    this._setListeners(this.listeners);
  }
}
