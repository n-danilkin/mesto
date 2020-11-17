import Card from './components/Card.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import Api from './components/Api.js';
import '../styles/index.css';
import {
  popupEditFormSelector,
  popupCreatePlaceSelector,
  popupWithImageSelector,
  popupWithConfirm,
  popupChangeAvatar,
  initialForms,
  elements,
  profileInfo
} from './utils/constants.js';
import UserInfo from './components/UserInfo.js';


const userInfo = new UserInfo(profileInfo);
const api = new Api({
  baseURL: 'https://mesto.nomoreparties.co/v1/cohort-12',
  key: 'cb60a489-6ec1-4e08-8c6a-5f804e99b68e'
});
const cardsList = new Section(elements)

const profilePopupOpenButton = document.querySelector('.profile__info-edit-button');
const placePopupOpenButton = document.querySelector('.add-button');
const editAvatarPopupButton = document.querySelector('.profile__avatar-container');

function cardRenderer(item) {
  const card = new Card({
    data: item,
    cardSelector: '#element-template',
    handleCardClick: (item) => {
      const img = new PopupWithImage({
        popupSelector: popupWithImageSelector
      });
      img.open(item)
    },
    handleDeleteButtonClick: (item) => {
      const confim = new PopupWithForm({
        popupSelector: popupWithConfirm,
        handleFormSubmit: () => {
          api.deleteCard(item)
            .then(() => {
              document.getElementById(item).remove();
              confim.close();
            })
            .catch((err) => { console.log(err) })
            .finally(() => { confim.renderSaving(false) })
        },
        validate: () => { }
      })
      confim.open()
    },
    handleLikeClick: (card) => {
      if (card.isLiked()) {
        api.deleteLike(card.id)
          .then((res) => { card.updateLikeData(res.likes) })
          .catch((err) => { console.log(err) });
      } else {
        api.putLike(card.id)
          .then((res) => { card.updateLikeData(res.likes) })
          .catch((err) => { console.log(err) });
      }
    }
  });
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement); 
}

function validateCard() {
  const formSelector = document.querySelectorAll('.popup-form');
  const validateForm = new FormValidator(initialForms, formSelector);
  validateForm.enableValidation();
}

Promise.all([
  api.getProfileInfo(),
  api.getInitialCards()
])
  .then((values) => {
    const [userData, initialCards] = values;
    userInfo.setUserInfo(userData);
    document.querySelector('.profile__avatar').src = userData.avatar;
    document.querySelector('.profile').id = userData._id;

    cardsList.renderItems({
      data: initialCards,
      renderer: cardRenderer
    });
  })
  .catch((err) => {
    console.log(err);
  })

profilePopupOpenButton.addEventListener('click', function () {
  const popup = new PopupWithForm({
    popupSelector: popupEditFormSelector,
    handleFormSubmit: (item) => {
      api.patchProfileInfo(item)
        .then((res) => {
          userInfo.setUserInfo(res)
          popup.close();
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          popup.renderSaving(false)
        });
    },
    validate: validateCard
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
      api.postNewCard(item)
        .then((data) => {
          cardsList.renderItems({
            data: [data],
            renderer: cardRenderer
          });
          popup.close()
        })
        .catch((err) => { console.log(err) })
        .finally(() => { popup.renderSaving(false) })          
    },
    validate: validateCard
  });
  popup.open();
});

editAvatarPopupButton.addEventListener('click', () => {
  const editAvatar = new PopupWithForm({
    popupSelector: popupChangeAvatar,
    handleFormSubmit: (item) => {
      api.patchAvatar(item.link)
        .then((res) => {
          userInfo.setUserAvatar(res.avatar)
          editAvatar.close()
        })
        .catch((err) => { console.log(err) })
        .finally(() => { editAvatar.renderSaving(false) });
    },
    validate: validateCard
  })
  editAvatar.open()
})
