import BaseComponent from './BaseComponent';

export default class Welcome extends BaseComponent {
  constructor(config, api) {
    super();
    this.api = api;
    this.keyWords = config.keyWords;
    this.title = config.title;
    this.container = config.cardsContainer;
  }

  render() {
    const name = sessionStorage.getItem('userName');
    const sortedKeyWords = JSON.parse(sessionStorage.getItem('sortedKeyWords'));
    const quantity = sessionStorage.getItem('quantityOfArticles');
    const cleanKeyWords = [];

    this.title.textContent = this._formatWordsEndings(name, quantity);
    if (quantity === 'нет') {
      this.keyWords.style.display = 'none';
      this.container.style.display = 'none';
    }

    if (sortedKeyWords !== null) {
      sortedKeyWords.forEach((e) => cleanKeyWords.push(e.slice(0, 1)));
      if (sortedKeyWords.length <= 3) {
        [...this.keyWords.children].forEach((element, index) => {
          const el = element;
          el.textContent = cleanKeyWords[index];
        });
      }

      if (sortedKeyWords.length > 3) {
        [...this.keyWords.children].forEach((element, index) => {
          if (index === 2) {
            const el = element;
            el.textContent = `и ${cleanKeyWords.length - 2} другим`;
          } else {
            const elWithComma = element;
            elWithComma.textContent = `${cleanKeyWords[index]}, `;
          }
        });
      }
    }
  }

  getSortedKeyWords() {
    this.api.getUsersArticles()
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } sessionStorage.setItem('quantityOfArticles', 'нет');
        return Promise.reject(res.status);
      })
      .then((res) => {
        sessionStorage.setItem('quantityOfArticles', res.data.length);
        const keywords = [];
        res.data.forEach((a) => {
          keywords.push(a.keyword);
        });
        const counts = {};
        keywords.forEach((keyword) => {
          counts[keyword] = (counts[keyword] || 0) + 1;
        });
        const sortedKeyWords = (Object.entries(counts).sort((a, b) => b[1] - a[1]));
        sessionStorage.setItem('sortedKeyWords', JSON.stringify(sortedKeyWords));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.render();
      });
  }

  _formatWordsEndings(name, number) {
    let num = Math.abs(number);
    num %= 100;
    if (num >= 5 && num <= 20) {
      return `${name}, у вас ${number} сохраненных статей`;
    }
    num %= 10;
    if (num === 1) {
      return `${name}, у вас ${number} сохраненная статья`;
    }
    if (num >= 2 && num <= 4) {
      return `${name}, у вас ${number} сохраненных статьи`;
    }
    return `${name}, у вас ${number} сохраненных статей`;
  }
}
