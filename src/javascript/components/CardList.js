import BaseComponent from './BaseComponent';

export default class CardList extends BaseComponent {
  constructor(config, card) {
    super();
    this.container = config.container;
    this.section = config.section;
    this.card = card;
    this.button = config.button;
    this.buttonProps = config.buttonProps;
    this.listeners = [{
      element: this.button,
      event: 'click',
      callback: (e) => this.renderArticles(e),
    }];
  }

  _addListeners() {
    this._setListeners(this.listeners);
  }

  _removeListeners() {
    this._unsetListeners(this.listeners);
  }

  _addCard(article) {
    const clone = this.card.create();

    clone.querySelector('.card__image').src = article.urlToImage;
    clone.querySelector('.card__source').textContent = article.source.name;
    clone.querySelector('.card__title').textContent = article.title;
    clone.querySelector('.card__text').textContent = article.description;
    clone.querySelector('.card__date').textContent = article.date;
    clone.querySelector('.card__link').href = article.url;
    clone.querySelector('.card').id = article._id || 'not-saved';

    this.container.appendChild(clone);
  }

  renderArticles() {
    const news = JSON.parse(sessionStorage.getItem('articles'));
    const showNews = news.splice(0, 3);

    this.section.style.display = 'block';
    sessionStorage.setItem('articles', JSON.stringify(news));
    showNews.forEach((article) => {
      this._addCard(article);
    });

    if (news.length !== 0) {
      this._show(this.buttonProps);
      this._addListeners();
    } else {
      this._hide(this.buttonProps);
      this._removeListeners();
    }
  }
}
