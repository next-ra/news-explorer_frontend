export default class BaseComponent {
  _addListener(props) {
    const { element, event, callback } = props;
    element.addEventListener(event, callback);
  }

  _removeListener(props) {
    const { element, event, callback } = props;
    element.removeEventListener(event, callback);
  }

  _setListeners(props) {
    [...props].forEach((prop) => {
      this._addListener(prop);
    });
  }

  _unsetListeners(props) {
    [...props].forEach((prop) => {
      this._removeListener(prop);
    });
  }

  _open(props) {
    props.forEach((prop) => {
      const { element, className } = prop;
      element.classList.add(className);
    });
  }

  _close(props) {
    props.forEach((prop) => {
      const { element, className } = prop;
      element.classList.remove(className);
    });
  }

  _toggle(props) {
    props.forEach((prop) => {
      const { element, className } = prop;
      element.classList.toggle(className);
    });
  }
}
