import BaseComponent from './BaseComponent';

export default class Card extends BaseComponent {
  constructor(config) {
    super();
    this.config = config;
    this.template = config.template;
  }

  create() {
    return this.template.content.cloneNode(true);
  }
}
