import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, fillPopup, validate }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._fillPopup = fillPopup;
    this._validate = validate;
  }
  _getInputValues(popup) {
    this._inputList = popup.querySelectorAll('.popup-form__input');

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setEventListeners(popup) {
    super.setEventListeners(popup);
    popup.querySelector('.popup-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues(popup));
      console.log(this._getInputValues(popup))
      super.close();
    });
  }
  open() {
    super.open();
    this._fillPopup(this._container);
    this._validate();
  }
}
