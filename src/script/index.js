import Card from './components/Card.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import '../styles/index.css';
import {
  popupSelector,
  initialCards,
  initialForms,
  elements,
  profileInfo
} from './utils/constants.js';
import {
  fillPopupImage,
  fillPopupPlace,
  fillPopupProfile
} from './utils/utils.js';
import UserInfo from './components/UserInfo.js';
export const userInfo = new UserInfo(profileInfo);

const profilePopupOpenButton = document.querySelector('.profile__info-edit-button');
const placePopupOpenButton = document.querySelector('.add-button');


const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      cardSelector: '#element-template',
      handleCardClick: (item) => {
        const img = new PopupWithImage({
          popupSelector: popupSelector,
          fillPopup: fillPopupImage,
        });
        img.open(item)
      }
    });
    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
  }
},
  elements
);

profilePopupOpenButton.addEventListener('click', function () {
  if (document.querySelector('.popup')) {
    return
  }
  const popup = new PopupWithForm({
    popupSelector: popupSelector,
    handleFormSubmit: (item) => {
      userInfo.setUserInfo(item);
    },
    fillPopup: fillPopupProfile,
    validate: () => {
      const formSelector = document.querySelectorAll('.popup-form');
      const validateForm = new FormValidator(initialForms, formSelector);
      validateForm.enableValidation();
    }
  });
  popup.open();
});


placePopupOpenButton.addEventListener('click', function () {
  if (document.querySelector('.popup')) {
    return
  }
  const popup = new PopupWithForm({
    popupSelector: popupSelector,
    handleFormSubmit: (item) => {
      console.log(1)
      const card = new Card({
        data: item,
        cardSelector: '#element-template',
        handleCardClick: (item) => {
          const img = new PopupWithImage({
            popupSelector: popupSelector,
            fillPopup: fillPopupImage,
          });
          img.open(item)
        }
      });
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
    fillPopup: fillPopupPlace,
    validate: () => {
      const formSelector = document.querySelectorAll('.popup-form');
      const validateForm = new FormValidator(initialForms, formSelector);
      validateForm.enableValidation();
    }
  });
  popup.open();
});

cardsList.renderItems();
