import {userInfo} from '../index.js';
export const fillPopupPlace = (popup) => {
    const placeName = popup.querySelector('#first-field-input');
    const placeUrl = popup.querySelector('#second-field-input');
    placeName.required = true;
    placeUrl.required = true;
    placeName.name = 'name';
    placeUrl.name = 'link';
    placeName.minLength = '1';
    placeName.maxLength = '30';
    placeUrl.type = 'url';
    placeName.placeholder = 'Название';
    placeUrl.placeholder = 'Ссылка на картинку';
    popup.querySelector('.popup__title').textContent = 'Новое место';
    popup.querySelector('.popup-form__submit').textContent = 'Создать';
  }
  
  export const fillPopupProfile = (popup) => {
    const profileName = popup.querySelector('#first-field-input');
    const profileDescription = popup.querySelector('#second-field-input');
    profileName.name = 'name';
    profileName.required = true;
    profileName.minLength = '2';
    profileName.maxLength = '40';
    profileName.type = 'text';
    profileName.pattern = '[a-zA-ZА-ЯЁа-яё\s\-]+[^\s\-]+';
    profileDescription.name = 'description';
    profileDescription.required = true;
    profileDescription.minLength = '2';
    profileDescription.maxLength = '200';
    popup.querySelector('.popup__title').textContent = 'Редактировать профиль';
    popup.querySelector('.popup-form__submit').textContent = 'Сохранить';
    const profileValues = userInfo.getUserInfo();
    console.log(userInfo)
    profileName.value = profileValues.name;
    profileDescription.value = profileValues.description;
  }
  
  export const fillPopupImage = (popup) => {
    
    popup.querySelector('.popup__title').remove();
    popup.querySelector('.popup-form').remove();
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
  
  }