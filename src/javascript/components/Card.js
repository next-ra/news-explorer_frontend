import BaseComponent from './BaseComponent';

export default class Card extends BaseComponent {
  constructor(config, mainApi) {
    super();
    this.template = config.template;
    this.api = mainApi;
  }

  create() {
    return this.template.content.cloneNode(true);
  }

  saveCard(event) {
    this.article = event.target.closest('.card');

    const cardInfo = {
      keyword: sessionStorage.getItem('keyWord'),
      title: this.article.querySelector('.card__title').textContent,
      text: this.article.querySelector('.card__text').textContent,
      date: this.article.querySelector('.card__date').textContent,
      source: this.article.querySelector('.card__source').textContent,
      link: this.article.querySelector('.card__link').href,
      image: this.article.querySelector('.card__image').src,
    };

    if (this.article.id === 'not-saved') {
      this.api.createArticle(cardInfo)
        .then((res) => {
          console.log(res);
          this.article.id = res.data._id;
          this.article.querySelector('.card__path').classList.add('card__path_marked');
          this.article.querySelector('.card__tooltip-text').textContent = 'Убрать из сохраненных';
        })
        .catch((err) => console.log(err));
    } else {
      this.removeFromSaved();
    }
  }

  removeFromSaved() {
    this.api.deleteArticle(this.article.id)
      .then((res) => {
        console.log(res);
        this.article.id = 'not-saved';
        this.article.querySelector('.card__path').classList.remove('card__path_marked');
        this.article.querySelector('.card__tooltip-text').textContent = 'Сохранить';
      })
      .catch((err) => console.log(err));
  }
}
