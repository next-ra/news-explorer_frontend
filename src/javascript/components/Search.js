import BaseComponent from './BaseComponent';

export default class Search extends BaseComponent {
  constructor(config, api, cardList) {
    super();
    this.preloader = config.preloader;
    this.notFound = config.notFound;
    this.api = api;
    this.cardList = cardList;
  }

  _search(e) {
    e.preventDefault();
  }
}
