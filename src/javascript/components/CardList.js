import BaseComponent from './BaseComponent';

export default class CardList extends BaseComponent {
  constructor(config, card) {
    super();
    this.container = config.container;
    this.section = config.section;
    this.card = card;
    this.buttonProps = config.buttonProps;
    this.defaultImage = config.defaultImage;
  }

  _dateFormat(date) {
    // добавить запятую перед годом
    return new Date(date).toLocaleString('ru', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).slice(0, -2);
  }

  _addCard(article) {
    const clone = this.card.create();
    const user = sessionStorage.getItem('userName');
    if (user) {
      clone.querySelector('.card__tooltip-text').textContent = 'Сохранить статью';
      this._addListener({
        element: clone.querySelector('.card__bookmark'),
        event: 'click',
        callback: (e) => this.card.saveCard(e),
      });
    }

    clone.querySelector('.card__image').src = article.urlToImage || this.defaultImage;
    clone.querySelector('.card__source').textContent = article.source.name;
    clone.querySelector('.card__title').textContent = article.title;
    clone.querySelector('.card__text').textContent = article.description;
    clone.querySelector('.card__date').textContent = this._dateFormat(article.publishedAt);
    clone.querySelector('.card__link').href = article.url;
    clone.querySelector('.card').id = article._id || 'not-saved';

    this.container.appendChild(clone);
  }

  _renderArticles() {
    const news = JSON.parse(sessionStorage.getItem('articles'));
    console.log(news);
    const showNews = news.splice(0, 3);
    console.log(showNews);
    this.section.style.display = 'block';
    sessionStorage.setItem('articles', JSON.stringify(news));
    showNews.forEach((article) => {
      this._addCard(article);
    });

    if (news.length !== 0) {
      this._show(this.buttonProps);
    } else {
      this._hide(this.buttonProps);
    }
  }
}
