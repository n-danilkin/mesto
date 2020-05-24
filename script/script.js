const profilePopupOpenButton = document.querySelector('.profile__info-edit-button');
const placePopupOpenButton = document.querySelector('.add-button');
const popupTemplate = document.querySelector('#popup-template').content;
const page = document.querySelector('.page');

const initialCards = [
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

function createPlace({ title, image }) {
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.cloneNode(true);
  element.querySelector('.element__description').textContent = title;
  element.querySelector('.element__image').src = image;

  element.querySelector('.element__like-button').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__like-button_active');
  });

  element.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.parentElement.remove();
  });

  element.querySelector('.element__image').addEventListener('click', function () {
    const popup = createPopup();
    const popupContent = popup.querySelector('.popup__content');

    popup.style.textAlign = 'center';
    popupContent.style.cssText = `
    max-width: 75vw;
    max-height: 75vh;
    display: inline-block;
    padding: 0;   
    color: white;
    background-color: transparent; 
    box-shadow: none;     
    `;

    popup.querySelector('.popup__title').remove();
    popup.querySelector('.popup-form').remove();

    const placeImage = document.createElement('img');
    const caption = document.createElement('p');
    caption.style.textAlign = 'left';
    placeImage.style.cssText = `
    max-width: 75vw;
    max-height: 75vh;                
    `;

    caption.textContent = title;
    placeImage.src = image;

    addCloseButtonListeners(popup);
    addOverlayListeners(popup);
    addEscListeners(popup);
    page.append(popup);
    popupContent.append(placeImage, caption);
    animationOpenPopup(popup);
  });

  return element
};

function appendPlaceToDom(place) {
  const elements = document.querySelector('.elements');

  elements.append(place);
}

initialCards.forEach(function (arrayElement) {
  const place = createPlace({
    title: arrayElement.name,
    image: arrayElement.link,
  });

  appendPlaceToDom(place);
});

function createPopup() {
  const popup = popupTemplate.cloneNode(true);
  return popup.firstElementChild
}

function closePopup(popup) {
  popup.remove();
}

function addCloseButtonListeners(popup) {
  popup.querySelector('.popup__close-button').addEventListener('click', function () {
    animatedPopupClosing(popup);
  });
}
function addOverlayListeners(popup) {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
      animatedPopupClosing(popup);
    }
  });
}

function addEscListeners(popup) {
  document.addEventListener('keydown', escapeKeydownEvent);

  function escapeKeydownEvent(evt) {
    if (evt.key === 'Escape') {
      animatedPopupClosing(popup);
      document.removeEventListener('keydown', escapeKeydownEvent);
    }
  }
}

function getPageProfileInfo() {
  const profileName = document.querySelector('.profile__info-name');
  const profileDescription = document.querySelector('.profile__info-description');

  return {
    name: profileName.innerHTML,
    description: profileDescription.innerHTML,
  };
}

function fillPageProfileInfo(profileInfo) {
  const profileName = document.querySelector('.profile__info-name');
  const profileDescription = document.querySelector('.profile__info-description');

  profileName.textContent = profileInfo.name;
  profileDescription.textContent = profileInfo.description;
}

function fillPopupProfileInfo(popup, profileInfo) {
  const profileName = popup.querySelector('#first-field-input');
  const profileDescription = popup.querySelector('#second-field-input');

  profileName.value = profileInfo.name;
  profileDescription.value = profileInfo.description;
}

function animationOpenPopup(popup) {
  popup.offsetHeight;
  popup.style.opacity = '1';
}

function animationClosePopup(popup) {
  popup.style.opacity = '0';
}

function animatedPopupClosing(popup) {
  animationClosePopup(popup);
  popup.addEventListener('transitionend', function () {
    closePopup(popup);
  });
}

function savePlaceInformation(popup) {
  const inputPlaceName = popup.querySelector('#first-field-input');
  const inputImageLink = popup.querySelector('#second-field-input');
  const place = createPlace({
    title: inputPlaceName.value,
    image: inputImageLink.value,
  });
  appendPlaceToDom(place);
  animatedPopupClosing(popup);
}

function saveProfileInformation(popup) {
  const inputProfileName = popup.querySelector('#first-field-input');
  const inputProfileDescriprion = popup.querySelector('#second-field-input');
  fillPageProfileInfo({
    name: inputProfileName.value,
    description: inputProfileDescriprion.value,
  });
  animatedPopupClosing(popup);
}

function profilePopupFiller(popup) {
  const profileInfo = getPageProfileInfo();
  fillPopupProfileInfo(popup, profileInfo);

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


function placePopupFiller(popup) {
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

function addSubmitListenters(popup, func) {
  popup.querySelector('.popup-form').addEventListener('submit', function (e) {
    e.preventDefault();
    func(popup);
  });
}

function addPopupOpenButtonOnclickListeners(button, filler, saveEvent) {
  button.addEventListener('click', function () {
    if (document.querySelector('.popup')) {
      return
    }
    const popup = createPopup();
    filler(popup);
    addCloseButtonListeners(popup);
    addSubmitListenters(popup, saveEvent);
    addEscListeners(popup);
    page.append(popup);
    addOverlayListeners(popup);
    enableValidation({
      formSelector: '.popup-form',
      fieldsetSelector: '.popup-form__set',
      inputSelector: '.popup-form__input',
      submitButtonSelector: '.popup-form__submit',
      inactiveButtonClass: 'button_inactive',
      inputErrorClass: 'popup-form__input_error',
      errorClass: 'popup-form__input-error_active'
    });
    animationOpenPopup(popup);
  });

}

addPopupOpenButtonOnclickListeners(profilePopupOpenButton, profilePopupFiller, saveProfileInformation);

addPopupOpenButtonOnclickListeners(placePopupOpenButton, placePopupFiller, savePlaceInformation);





