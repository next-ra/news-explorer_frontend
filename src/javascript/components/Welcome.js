import BaseComponent from './BaseComponent';

export default class Welcome extends BaseComponent {
  constructor(config, api) {
    super();
    this.api = api;
  }
}
