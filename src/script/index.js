import Card from './components/Card.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithConfirm from './components/PopupWithConfirm.js';
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
const api = new Api();

const profilePopupOpenButton = document.querySelector('.profile__info-edit-button');
const placePopupOpenButton = document.querySelector('.add-button');
const editAvatarPopupButton = document.querySelector('.profile__avatar-container');

api.getProfileInfo().then((res) => {
  userInfo.setUserInfo(res);
  document.querySelector('.profile__avatar').src = res.avatar;
  document.querySelector('.profile').id = res._id
})
  .then(() => {
    api.getInitialCards()
      .then((data) => {
        const cardsList = new Section({
          data: data,
          renderer: (item) => {
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
                        document.getElementById(item).remove()
                      })
                      .catch((err) => {
                        console.log(err)
                      })
                      .finally(() => {
                        confim.renderSaving(false)
                      })
                  },
                  validate: () => {
                  }
                })
                confim.open()
              },
              handleLikeClick: (id) => {
                if (document.getElementById(id).querySelector('.element__like-button').classList.contains('element__like-button_active')) {
                  api.deleteLike(id)
                    .then((res) => {
                      document.getElementById(id).querySelector('.element__like-counter').textContent = res.likes.length;
                    })
                    .catch((err) => {
                      console.log(err)
                    });
                } else {
                  api.putLike(id)
                    .then((res) => {
                      document.getElementById(id).querySelector('.element__like-counter').textContent = res.likes.length;
                    })
                    .catch((err) => {
                      console.log(err)
                    });
                }
              }
            });
            const cardElement = card.generateCard();
            cardsList.addItem(cardElement);
          }
        },
          elements
        );
        cardsList.renderItems();
      })
      .catch((err) => {
        console.log(err)
      });
  })
  .catch((err) => {
    console.log(err)
  });

profilePopupOpenButton.addEventListener('click', function () {
  const popup = new PopupWithForm({
    popupSelector: popupEditFormSelector,
    handleFormSubmit: (item) => {
      api.patchProfileInfo(item)
        .then((res) => {
          userInfo.setUserInfo(res)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          popup.renderSaving(false)
        });
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
      api.postNewCard(item)
        .then((data) => {
          const newCard = new Section({
            data: [data],
            renderer: (item) => {
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
                          document.getElementById(item).remove()
                        })
                        .catch((err) => {
                          console.log(err)
                        })
                        .finally(() => {
                          confim.renderSaving(false)
                        })
                    },
                    validate: () => {
                    }
                  })
                  confim.open()
                },
                handleLikeClick: (id) => {
                  if (document.getElementById(id).querySelector('.element__like-button').classList.contains('element__like-button_active')) {
                    api.deleteLike(id)
                      .then((res) => {
                        document.getElementById(id).querySelector('.element__like-counter').textContent = res.likes.length;
                      })
                      .catch((err) => {
                        console.log(err)
                      });
                  } else {
                    api.putLike(id)
                      .then((res) => {
                        document.getElementById(id).querySelector('.element__like-counter').textContent = res.likes.length;
                      })
                      .catch((err) => {
                        console.log(err)
                      });
                  }
                }
              });
              const newcardElement = card.generateCard();
              newCard.addItem(newcardElement);
            }
          },
            elements
          );
          newCard.renderItems();
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          popup.renderSaving(false)
        })
    },
    validate: () => {
      const formSelector = document.querySelectorAll('.popup-form');
      const validateForm = new FormValidator(initialForms, formSelector);
      validateForm.enableValidation();
    }
  });
  popup.open();
});

editAvatarPopupButton.addEventListener('click', () => {
  const editAvatar = new PopupWithForm({
    popupSelector: popupChangeAvatar,
    handleFormSubmit: (item) => {
      api.patchAvatar(item.link)
        .then((res) => {
          document.querySelector('.profile__avatar').src = res.avatar;
        }).catch((err) => {
          console.log(err)
        })
        .finally(() => {
          editAvatar.renderSaving(false)
        });
    },
    validate: () => {
      const formSelector = document.querySelectorAll('.popup-form');
      const validateForm = new FormValidator(initialForms, formSelector);
      validateForm.enableValidation();
    }
  })
  editAvatar.open()
})
