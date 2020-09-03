import Popup from './Popup';

export default class PopupSuccess extends Popup {
  constructor(config) {
    super(config);

    this.popupProps = config.popupProps;
  }

  open() {
    this._show(this.popupProps);
  }
}
