import BaseComponent from './BaseComponent';

export default class Search extends BaseComponent {
  constructor(config, NewsApi, cardList, validation) {
    super();
    this.preloaderProps = config.preloaderProps;
    this.notFoundProps = config.notFoundProps;
    this.notFoundText = config.notFoundText;
    this.cardsSection = config.cardsSection;
    this.container = config.container;
    this.form = config.form;
    this.input = config.input;
    this.api = NewsApi;
    this.cardList = cardList;
    this.validation = validation;
  }

  addListeners() {
    this.listeners = [{
      element: this.form,
      event: 'submit',
      callback: (e) => this._search(e),
    },
    {
      element: this.form,
      event: 'input',
      callback: (e) => this.validation.formValidate(e, this.form),
    },
    ];
    this._setListeners(this.listeners);
  }

  _search(e) {
    e.preventDefault();
    this._hide(this.notFoundProps);
    this._clearContainer();
    //  проверка  нужна для того чтобы вошедший пользователь не начинал автоматически поиск,
    //  если же он когда был не залогинен, что-то искал,
    //  а потом решил войти, чтобы сохранить найденные статьи, отобразится его последний поиск
    //  с уже активными кнопками
    if (this.input.value.length >= 2) {
      this.cardsSection.style.display = 'none';
      sessionStorage.removeItem('articles');
      this._disableInputs(this.form);
      this._toggle(this.preloaderProps);
      this.api
        .getArticles(this.input.value)
        .then((res) => {
          sessionStorage.setItem('articles', JSON.stringify(res.articles));
          sessionStorage.setItem('keyWord', this.input.value);
          res.articles.length > 0
            ? this.cardList._renderArticles()
            : this._show(this.notFoundProps);
        })
        .catch((err) => {
          this._show(this.notFoundProps);
          this.notFoundText.textContent = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
          console.log(err);
        })
        .finally(() => {
          this._activateInputs(this.form);
          this._toggle(this.preloaderProps);
        });
    }
  }

  _clearContainer() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }
}
