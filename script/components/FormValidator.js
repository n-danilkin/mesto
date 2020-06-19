export default class FormValidator {
  constructor(data, formSelector) {
    this._formSelector = formSelector;
    this._fieldsetSelector = data.fieldsetSelector;
    this._inputSelector = data.inputSelector;
    this._errorClass = data.errorClass;
    this._inputErrorClass = data.inputErrorClass;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._saveEvent = data.saveEvent;
  }


  _setEventListeners = (fieldSet) => {
    const inputList = Array.from(fieldSet.querySelectorAll(this._inputSelector));
    const buttonElement = fieldSet.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(fieldSet, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  _checkInputValidity = (fieldSet, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(fieldSet, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(fieldSet, inputElement);
    }
  };

  _toggleButtonState = (inputList, buttonElement) => {

    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  _showInputError = (fieldSet, inputElement, errorMessage) => {
    const errorElement = fieldSet.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  _hideInputError = (fieldSet, inputElement) => {
    const errorElement = fieldSet.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  enableValidation() {
    const formList = Array.from(this._formSelector);
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });

      const fieldsetList = Array.from(formElement.querySelectorAll(this._fieldsetSelector));
      fieldsetList.forEach((fieldSet) => {
        this._setEventListeners(fieldSet)
      });
    });
  }
}