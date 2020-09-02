import Popup from './Popup';

export default class PopupReg extends Popup {
  _submit(e) {
    e.preventDefault();
    const { email, password, username } = this.form.elements;
    this._disableInputs(this.form);

    this.api.createUser(email.value, password.value, username.value)
      .then((res) => {
        if (res.message === 'пользователь создан') {
          console.log('пользователь создан');
          this.close();
        } else throw new Error(res.message);
      })
      .catch((err) => {
        this.form.querySelector('#server-error').textContent = err.message;
      })
      .finally(() => {
        this._activateInputs(this.form);
      });
  }
}
