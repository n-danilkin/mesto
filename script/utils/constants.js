
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const popupSelector = document.querySelector('#popup-template');

export const elements = '.elements';

export const initialForms = {
  fieldsetSelector: '.popup-form__set',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup-form__input_error',
  errorClass: 'popup-form__input-error_active'
}



export const profileInfo = {
  profileName: '.profile__info-name',
  profileDescription: '.profile__info-description'
}