import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, validate }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._validate = validate;
    this._saveEvent = this._saveEvent.bind(this)
    this._saveButtonText = this._popupSelector.querySelector('.popup-form__submit').textContent;
    this._saveButton = this._popupSelector.querySelector('.popup-form__submit')
  }
  renderSaving(isSaving) {
    if (isSaving) {
      this._saveButton.textContent = 'Сохранение...'
    }
    else {
      this._saveButton.textContent = this._saveButtonText;
    }
  }
  _getInputValues(popup) {
    this._inputList = popup.querySelectorAll('.popup-form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  _saveEvent(evt) {
    evt.preventDefault();
    this.renderSaving(true);
    this._handleFormSubmit(this._getInputValues(this._popupSelector));    
  }
  setEventListeners(popup) {
    super.setEventListeners(popup);
    popup.querySelector('.popup-form').addEventListener('submit', this._saveEvent);
  }
  open() {
    super.open();
    this._validate();
  }
  close() {
    super.close();
    document.forms.add.reset()
    document.forms.edit.reset()
    this._popupSelector.querySelector('.popup-form').removeEventListener('submit', this._saveEvent);
  }
}
