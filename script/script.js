const popup = document.querySelector('.popup');
const formEdit = document.querySelector('.popup__form-edit');
const inputProfileName = formEdit.querySelector('.popup__input-name');
const inputProfileDescriprion = formEdit.querySelector('.popup__input-description');
const profileSaveButton = formEdit.querySelector('.popup__save-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupOpenButton = document.querySelector('.profile__info-edit-button');
const profileName = document.querySelector('.profile__info-name');
const profileDescription = document.querySelector('.profile__info-description');


function inputProfileFiller() {
  inputProfileName.value = profileName.innerHTML;
  inputProfileDescriprion.value = profileDescription.innerHTML;
}

function saveProfile() {
  profileName.innerHTML = inputProfileName.value;
  profileDescription.innerHTML = inputProfileDescriprion.value;
  closePopup();
}

function closePopup() {
  popup.style.display = 'none';
}

function openPopup() {
  popup.style.display = 'block';
  inputProfileFiller();
}


formEdit.addEventListener('submit', function (e) {
  e.preventDefault();
});

profileSaveButton.addEventListener('click', saveProfile);
popupCloseButton.addEventListener('click', closePopup);
popupOpenButton.addEventListener('click', openPopup);
inputProfileFiller();
