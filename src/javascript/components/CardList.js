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
    // добавить запятую перед годом?
    return new Date(date).toLocaleString('ru', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).slice(0, -2);
  }

  deleteCard(e) {
    if (e.target.classList.contains('bookmark')) {
      this.card.saveOrDelete(e);
    }
  }

  _addCard(article) {
    const clone = this.card.create();
    const user = sessionStorage.getItem('userName');
    if (user) {
      // если пользователь залогинен то подсказка меняется
      clone.querySelector('.card__tooltip-text').textContent = 'Сохранить статью';
    }
    // если у карточки есть иконка корзины подсказка меняется на другую
    if (clone.querySelector('.card__trash-path')) {
      clone.querySelector('.card__tooltip-text').textContent = 'Удалить статью';
    }
    // если есть лейба с ключевым словом
    if (clone.querySelector('.card__label-text')
    ) { clone.querySelector('.card__label-text').textContent = article.keyword; }
    clone.querySelector('.card__image').src = article.urlToImage || article.image || this.defaultImage;
    clone.querySelector('.card__source').textContent = article.source.name || article.source;
    clone.querySelector('.card__title').textContent = article.title;
    clone.querySelector('.card__text').textContent = article.description || article.text;
    clone.querySelector('.card__date').textContent = article.date || this._dateFormat(article.publishedAt);
    clone.querySelector('.card__link').href = article.url || article.link;
    clone.querySelector('.card').id = article._id || 'not-saved';

    this.container.appendChild(clone);
  }

  _renderArticles() {
    const news = JSON.parse(sessionStorage.getItem('articles'));
    const showNews = news.splice(0, 3);
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
