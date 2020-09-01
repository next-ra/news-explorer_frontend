import BaseComponent from './BaseComponent';

export default class CardList extends BaseComponent {
  constructor(config, card) {
    super();
    this.container = config.container;
    this.section = config.section;
    this.card = card;
  }

  addCard(article) {
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
    this.section.style.display = 'block';
  }
}
