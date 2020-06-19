import Card from '../components/Card.js';
import FormEditPopup from '../components/FormEditPopup.js';
import CreatePlacePopup from '../components/CreatePlacePopup.js';
import { initialCards } from '../utils/constants.js';

const profilePopupOpenButton = document.querySelector('.profile__info-edit-button');
const placePopupOpenButton = document.querySelector('.add-button');
const popupTemplate = document.querySelector('#popup-template').content;




initialCards.forEach(function (item) {
  const card = new Card(item, '#element-template');
  card.generateCard();
});

function addPopupOpenButtonOnclickListeners(button, popupType) {
  button.addEventListener('click', function () {
    if (document.querySelector('.popup')) {
      return
    }
    const popup = new popupType;
    popup.open();
  });

}

addPopupOpenButtonOnclickListeners(profilePopupOpenButton, FormEditPopup);

addPopupOpenButtonOnclickListeners(placePopupOpenButton, CreatePlacePopup);





