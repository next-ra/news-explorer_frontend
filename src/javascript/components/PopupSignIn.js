import Popup from './Popup';

export default class PopupSignIn extends Popup {
  _submit(e) {
    e.preventDefault();
    const { email, password } = this.form.elements;

    this._disableInputs(this.form);

    this.api
      .signIn(email.value, password.value)
      .then((res) => {
        console.log(res);
        if (res.message === 'авторизация успешна') {
          return this.api.getUser();
        }
        throw new Error(res.message);
      })
      .then((data) => {
        console.log(data);
        sessionStorage.setItem('userName', data.data.name);

        this.header.render(sessionStorage.getItem('userName'));
        // рендерим последний поиск, если пользователь решил войти, чтобы сохранить статью
        this.search._search(e);
        this.close();
      })
      .catch((err) => {
        // console.log(err);
        this.form.querySelector('#server-error').textContent = err.message;
      })
      .finally(() => {
        this._activateInputs(this.form);
      });
  }
}
