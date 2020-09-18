import BaseComponent from './BaseComponent';

export default class ArticlesPage extends BaseComponent {
  constructor(config, props) {
    super();
    this.api = props.mainApi;
    this.header = props.header;
    this.cardList = props.cardList;
    this.welcome = props.welcome;
    this.page = config.page;
    this.authButton = config.authButton;
    this.showMoreButton = config.showMoreButton;
  }

  initialRender() {
    this._getUser();
    this._getUserArticles();
    this.header.render(sessionStorage.getItem('userName'));
    this.header.addListeners();
    this._addListeners();
    this.welcome.getSortedKeyWords();
  }

  _getUser() {
    this.api.getUser()
      .then((res) => {
        sessionStorage.setItem('userName', res.data.name);
      })
      .catch((err) => {
        console.log(err);
        document.location.href = '../';
      });
  }

  _getUserArticles() {
    this.api.getUsersArticles()
      .then((res) => {
        if (res.ok) {
          return res.json();
        } return Promise.reject(res.status);
      })
      .then((res) => {
        sessionStorage.setItem('articles', JSON.stringify(res.data));
        this.cardList._renderArticles();
      })
      .catch((err) => console.log(err));
  }

  _setInitialListeners() {
    this.header.addListeners();
  }

  _addListeners() {
    this.listeners = [{
      element: this.showMoreButton,
      event: 'click',
      callback: (e) => this.cardList._renderArticles(e),
    },
    {
      element: this.page,
      event: 'click',
      callback: (e) => this.cardList.deleteCard(e),
    }];
    this._setListeners(this.listeners);
  }
}
