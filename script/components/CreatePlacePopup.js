import FormPopup from './FormPopup.js';
import FormValidator from '../components/FormValidator.js';
import { initialForms } from '../utils/constants.js';
import Card from '../components/Card.js';
export default class CreatePlacePopup extends FormPopup {
  _savePlaceInformation(popup) {
    const inputPlaceName = popup.querySelector('#first-field-input');
    const inputImageLink = popup.querySelector('#second-field-input');

    const card = new Card({
      name: inputPlaceName.value,
      link: inputImageLink.value,
    }, '#element-template');
    card.generateCard();
    super.close();
  }
  _placePopupFiller(popup) {
    const placeName = popup.querySelector('#first-field-input');
    const placeUrl = popup.querySelector('#second-field-input');
    placeName.required = true;
    placeUrl.required = true;
    placeName.minLength = '1';
    placeName.maxLength = '30';
    placeUrl.type = 'url';
    popup.querySelector('#first-field-input').placeholder = 'Название';
    popup.querySelector('#second-field-input').placeholder = 'Ссылка на картинку';
    popup.querySelector('.popup__title').textContent = 'Новое место';
    popup.querySelector('.popup-form__submit').textContent = 'Создать';
  }
  open() {
    super.open();
    const formSelector = document.querySelectorAll('.popup-form');
    this._placePopupFiller(this._container);
    super._addSubmitListenters(this._container, () => { this._savePlaceInformation(this._container) });
    const validateForm = new FormValidator(initialForms, formSelector);
    validateForm.enableValidation();
  }
}
