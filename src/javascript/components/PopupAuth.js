import Popup from './Popup';

export default class PopupAuth extends Popup {
  submit(e) {
    e.preventDefault();
    console.log(this);
  }
}
