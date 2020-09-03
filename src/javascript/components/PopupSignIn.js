import Popup from './Popup';

export default class PopupSignIn extends Popup {
  _submit(e) {
    e.preventDefault();
    const { email, password } = this.form.elements;
    this._disableInputs(this.form);

    this.api.signIn(email.value, password.value)
      .then((res) => {
        if (res.message === 'авторизация успешна') {
          this.api.getUser()
            .then((data) => {
              sessionStorage.setItem('userName', data.data.name);

              this.header.render(sessionStorage.getItem('userName'));

              this.close();
            });
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
