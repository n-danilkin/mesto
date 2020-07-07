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
/*
  Можно лучше: очень большая вложенность блоков кода, лучше воспользоваться 
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      api.getProfileInfo(),
      api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })

*/

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
            // if (document.getElementById(id).querySelector('.element__like-button').classList.contains('element__like-button_active')) {
            //   api.deleteLike(id)
            //     .then((res) => {

            //       /*
            //         Можно лучше: 
            //         document.getElementById(id).querySelector('.element__like-counter').textContent нарушает принцип единственной ответсвенности
            //         лучше передавать в handleLikeClick не id, а сам экземпляр класса карточки (this) и вызывать у него метод
            //         Например так: 
            //         handleLikeClick: (card) => {
            //           if (card.isLiked()) {
            //             api.deleteLike(id)
            //               .then((res) => {
            //                 card.updateData(res)
            //               }
            //         .............
            //       */
          });
        })
        .catch((err) => { console.log(err) })
        .finally(() => { popup.renderSaving(false) })
      popup.close()
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
          /*
            Надо исправить: для задания аватара нужно доработать класс UserInfo
            и использовать его метод т.к. именно он отвечает за отображение данных пользователя
          */
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

/*
  Хорошая работа, класс Api создан, запросы на сервер выполняются, код хорошо оформлен
  Но есть несколько замечаний:

  Надо исправить:
  - не описывать создание Section в двух местах, создавать его один раз при запуске программы, а
  данные передавать в renderItems как параметры, а не в конструктор класса
  - передавать адрес сервера и ключ авторизации как параметры в класс Api
  - для задания аватара использовать класс UserInfo
  Все изменения на странице должны происходить, только после того, как
  сервер ответил подтверждением. Если сервер не ответил, или ответил ошибкой, а
  данные на странице сохраняться, то это может ввести пользователя в заблуждение
  - попапы должны закрываться только если сервер ответил подтверждением
  - лайк у карточки должен ставиться только если сервер ответил подтверждением

  Можно лучше:
  - для запроса данных использовать Promise.all
  - вынести проверку ответа в отдельный метод класса Api
  - все взаимодействие с карточкой описать в классе карточки, например
  handleLikeClick: (id) => {
      if (document.getElementById(id).querySelector('.element__like-button').classList.contains('element__like-button_active')) {

  Информация о том как устроена карточка простекла вовне класса Card
  Лучше передавать в handleLikeClick не id, а сам экземпляр класса карточки (this) и вызывать у него метод

  - старайтесь не делать большую бложенность блоков кода, это затрудняет чтение
*/