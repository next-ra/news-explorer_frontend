import BaseComponent from './BaseComponent';

export default class Card extends BaseComponent {
  constructor(config, mainApi, welcome) {
    super();
    this.template = config.template;
    this.api = mainApi;
    this.welcome = welcome;
  }

  create() {
    return this.template.content.cloneNode(true);
  }

  saveOrDelete(event) {
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
      // у карточки есть иконка корзины - удаляем из базы и из разметки
    } else if (this.article.querySelector('.card__trash-path')) {
      this.deleteCard();
    } else this.removeFromSaved();
  }

  // Метод удаляет метку на карточке на главной странице
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

  // Этот удаляет карточку и разметку
  deleteCard() {
    this.api.deleteArticle(this.article.id)
      .then((res) => {
        console.log(res);
        this.article.parentNode.removeChild(this.article);
        this.welcome.getSortedKeyWords();
      })
      .catch((err) => console.log(err));
  }
}
