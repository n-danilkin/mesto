import Card from './components/Card.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import '../styles/index.css';
import {
  popupEditFormSelector,
  popupCreatePlaceSelector,
  popupWithImageSelector,
  initialCards,
  initialForms,
  elements,
  profileInfo
} from './utils/constants.js';
import UserInfo from './components/UserInfo.js';

const userInfo = new UserInfo(profileInfo);

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
          popupSelector: popupWithImageSelector
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
  const popup = new PopupWithForm({
    popupSelector: popupEditFormSelector,
    handleFormSubmit: (item) => {
      userInfo.setUserInfo(item);
    },
    validate: () => {
      const formSelector = document.querySelectorAll('.popup-form');
      const validateForm = new FormValidator(initialForms, formSelector);
      validateForm.enableValidation();
    }
  });
  popup.open();
  const profileName = document.querySelector('#first-field-input');
  const profileDescription = document.querySelector('#second-field-input');
  const profileValues = userInfo.getUserInfo();
  profileName.value = profileValues.name;
  profileDescription.value = profileValues.description;
});


placePopupOpenButton.addEventListener('click', function () {
  const popup = new PopupWithForm({
    popupSelector: popupCreatePlaceSelector,
    handleFormSubmit: (item) => {
      const card = new Card({
        data: item,
        cardSelector: '#element-template',
        handleCardClick: (item) => {
          const img = new PopupWithImage({
            popupSelector: popupWithImageSelector
          });
          img.open(item)
        }
      });
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
    validate: () => {
      const formSelector = document.querySelectorAll('.popup-form');
      const validateForm = new FormValidator(initialForms, formSelector);
      validateForm.enableValidation();
    }
  });
  popup.open();
});

cardsList.renderItems();
