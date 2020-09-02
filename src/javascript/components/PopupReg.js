import Popup from './Popup';

export default class PopupReg extends Popup {
  submit(e) {
    e.preventDefault();
    console.log('форма отправлена');
  }
}
