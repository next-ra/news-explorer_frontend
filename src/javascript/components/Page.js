import BaseComponent from './BaseComponent';

export default class Page extends BaseComponent {
  constructor(config, props) {
    super();
    this.header = props.header;
    this.search = props.search;
    this.popupReg = props.popupReg;
    this.popupAuth = props.popupAuth;
    this.page = config.page;
    this.authButton = config.authButton;
    this.regRedirect = config.regRedirect;
    this.authRedirect = config.authRedirect;
  }

  initialRender() {
    const user = sessionStorage.getItem('userName');
    console.log(user);
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

  _redirectToAuth(e) {
    e.preventDefault();
    this.popupReg.close();
    this.popupAuth.open();
  }

  _redirectToReg(e) {
    e.preventDefault();
    this.popupReg.open();
    this.popupAuth.close();
  }

  _addListeners() {
    this.listeners = [{
      element: this.authButton,
      event: 'mousedown',
      callback: (e) => this._openPopup(e),
    },
    {
      element: this.page,
      event: 'click',
      callback: (e) => this._closePopup(e),
    },
    {
      element: this.page,
      event: 'keydown',
      callback: (e) => this._closePopup(e),
    },
    {
      element: this.regRedirect,
      event: 'click',
      callback: ((e) => {
        this._redirectToAuth(e);
      }),
    },
    {
      element: this.authRedirect,
      event: 'click',
      callback: ((e) => {
        this._redirectToReg(e);
      }),
    },

    ];
    this._setListeners(this.listeners);
  }
}
