const setEventListeners = (fieldSet, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) => {
  const inputList = Array.from(fieldSet.querySelectorAll(inputSelector));
  const buttonElement = fieldSet.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(fieldSet, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const checkInputValidity = (fieldSet, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(fieldSet, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(fieldSet, inputElement, inputErrorClass, errorClass);
  }
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {

  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const showInputError = (fieldSet, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = fieldSet.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
const hideInputError = (fieldSet, inputElement, inputErrorClass, errorClass) => {
  const errorElement = fieldSet.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const enableValidation = ({ formSelector, ...data }) => {
  const fieldsetSelector = data.fieldsetSelector
  const inputSelector = data.inputSelector;
  const inputErrorClass = data.inputErrorClass;
  const errorClass = data.errorClass;
  const submitButtonSelector = data.submitButtonSelector;
  const inactiveButtonClass = data.inactiveButtonClass;
  const saveEvent = data.saveEvent
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(fieldsetSelector));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass)
    });
  });
}