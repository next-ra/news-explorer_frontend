export default class Validation {
  formValidate(event, form) {
    const e = event.target;
    const button = form.querySelector('.button');
    const err = form.querySelector(`#${event.target.name}-error`);

    if (e.value === '') {
      err.textContent = 'Это поле не может быть пустым';
      e.setAttribute('style', 'box-shadow: 0 5px 15px rgba(245, 22, 22, 0.3)');
    }

    if (e.value.length < 8 && e.value.length > 0 && e.name === 'password') {
      err.textContent = 'Длина пароля не менее 8 символов';
    }

    if (!e.validity.valid && e.value.length > 0 && e.name === 'email') {
      err.textContent = 'Введите корректный адрес электронной почты';
    }

    if (e.value.length < 2 && e.value.length > 0 && (e.name === 'username' || 'search')) {
      err.textContent = 'Поле должно содержать не менее 2 символов';
    }

    if (e.validity.valid) {
      err.textContent = '';
      e.setAttribute('style', 'box-shadow: 0 5px 15px rgba(7, 235, 94, 0.3)');
    } else e.setAttribute('style', 'box-shadow: 0 3px 15px rgba(245, 22, 22, 0.3)');

    if (form.checkValidity()) {
      button.removeAttribute('disabled');
    } else button.setAttribute('disabled', true);
  }
}
