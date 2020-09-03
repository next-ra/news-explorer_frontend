import BaseComponent from './BaseComponent';

export default class Search extends BaseComponent {
  constructor(config, NewsApi, cardList) {
    super();
    this.preloaderProps = config.preloaderProps;
    this.notFoundProps = config.notFoundProps;
    this.cardsSection = config.cardsSection;
    this.container = config.container;
    this.form = config.form;
    this.input = config.input;
    this.api = NewsApi;
    this.cardList = cardList;
    this.listeners = [{
      element: this.form,
      event: 'submit',
      callback: (e) => this._search(e),
    }];
  }

  addListeners() {
    this._setListeners(this.listeners);
  }

  _search(e) {
    e.preventDefault();
    this._hide(this.notFoundProps);
    this._clearContainer();
    this.cardsSection.style.display = 'none';
    sessionStorage.clear('articles');
    this._disableInputs(this.form);
    this._toggle(this.preloaderProps);

    this.api
      .getArticles(this.input.value)
      .then((res) => {
        sessionStorage.setItem('articles', JSON.stringify(res.articles));
        sessionStorage.setItem('keyWord', this.input.value);
        res.articles.length > 0
          ? this.cardList.renderArticles()
          : this._show(this.notFoundProps);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this._activateInputs(this.form);
        this._toggle(this.preloaderProps);
      });
  }

  _clearContainer() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }
}
