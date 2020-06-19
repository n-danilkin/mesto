import FormPopup from './FormPopup.js';
import FormValidator from '../components/FormValidator.js';
import { initialForms } from '../utils/constants.js';
export default class FormEditPopup extends FormPopup {
  _getPageProfileInfo() {
    const profileName = document.querySelector('.profile__info-name');
    const profileDescription = document.querySelector('.profile__info-description');
    return {
      name: profileName.innerHTML,
      description: profileDescription.innerHTML,
    };
  }

  _fillPageProfileInfo(profileInfo) {
    const profileName = document.querySelector('.profile__info-name');
    const profileDescription = document.querySelector('.profile__info-description');

    profileName.textContent = profileInfo.name;
    profileDescription.textContent = profileInfo.description;
  }

  _fillPopupProfileInfo(popup, profileInfo) {
    const profileName = popup.querySelector('#first-field-input');
    const profileDescription = popup.querySelector('#second-field-input');

    profileName.value = profileInfo.name;
    profileDescription.value = profileInfo.description;
  }
  _saveProfileInformation(popup) {
    const inputProfileName = popup.querySelector('#first-field-input');
    const inputProfileDescriprion = popup.querySelector('#second-field-input');
    this._fillPageProfileInfo({
      name: inputProfileName.value,
      description: inputProfileDescriprion.value,
    });
    super.close();
  }
  _profilePopupFiller(popup) {
    const profileInfo = this._getPageProfileInfo();
    this._fillPopupProfileInfo(popup, profileInfo);

    const profileName = popup.querySelector('#first-field-input');
    const profileDescription = popup.querySelector('#second-field-input');
    profileName.required = true;
    profileName.minLength = '2';
    profileName.maxLength = '40';
    profileName.type = 'text';
    profileName.pattern = '[a-zA-ZА-ЯЁа-яё\s\-]+[^\s\-]+';
    profileDescription.required = true;
    profileDescription.minLength = '2';
    profileDescription.maxLength = '200';

    popup.querySelector('.popup__title').textContent = 'Редактировать профиль';
    popup.querySelector('.popup-form__submit').textContent = 'Сохранить';
  }
  open() {
    super.open();
    const formSelector = document.querySelector('.popup-form');
    this._profilePopupFiller(this._container);
    const validateForm = new FormValidator(initialForms, formSelector);
    validateForm.enableValidation();
    super._addSubmitListenters(this._container, () => { this._saveProfileInformation(this._container) });
  }
}
