import BaseComponent from './BaseComponent';

export default class MainPage extends BaseComponent {
  constructor(config, props) {
    super();
    this.header = props.header;
    this.search = props.search;
    this.popupSignUp = props.popupSignUp;
    this.popupSignIn = props.popupSignIn;
    this.popupSuccess = props.popupSuccess;
    this.cardList = props.cardList;
    this.page = config.page;
    this.authButton = config.authButton;
    this.regRedirect = config.regRedirect;
    this.authRedirect = config.authRedirect;
    this.successRedirect = config.successRedirect;
    this.showMoreButton = config.showMoreButton;
  }

  initialRender() {
    const user = sessionStorage.getItem('userName');
    console.log('user =', user);
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
      this.popupSignIn.open();
    }
  }

  _closePopup(e) {
    this.popupSignIn._closeOnEvent(e);
    this.popupSignUp._closeOnEvent(e);
    this.popupSuccess._closeOnEvent(e);
  }

  _redirectToAuth(e) {
    e.preventDefault();
    this.popupSignUp.close();
    this.popupSuccess.close();
    this.popupSignIn.open();
  }

  _redirectToReg(e) {
    e.preventDefault();
    this.popupSignUp.open();
    this.popupSignIn.close();
  }

  _addListeners() {
    this.listeners = [
      {
        element: this.page,
        event: 'click',
        callback: (e) => this.cardList.deleteCard(e),
      },
      {
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
        callback: (e) => {
          this._redirectToAuth(e);
        },
      },
      {
        element: this.authRedirect,
        event: 'click',
        callback: (e) => {
          this._redirectToReg(e);
        },
      },
      {
        element: this.successRedirect,
        event: 'click',
        callback: (e) => {
          this._redirectToAuth(e);
        },
      },
      {
        element: this.showMoreButton,
        event: 'click',
        callback: (e) => {
          this.cardList._renderArticles(e);
        },
      },
    ];
    this._setListeners(this.listeners);
  }
}
