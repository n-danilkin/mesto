let popup = document.querySelector('.popup');
let formEdit = document.querySelector('.popup__form-edit');
let inputProfileName = formEdit.querySelector('.popup__input-name');
let inputProfileDescriprion = formEdit.querySelector('.popup__input-description');
let profileSaveButton = formEdit.querySelector('.popup__save-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupOpenButton = document.querySelector('.profile__info-edit-button');
let profileName = document.querySelector('.profile__info-name');
let profileDescription = document.querySelector('.profile__info-description');

function inputProfileFiller () {    
  inputProfileName.value = profileName.innerHTML;
  inputProfileDescriprion.value = profileDescription.innerHTML;
}

function saveProfile () {
  profileName.innerHTML = inputProfileName.value;
  profileDescription.innerHTML = inputProfileDescriprion.value;
  closePopup ();
}

function closePopup () {
  popup.style.display = 'none';
}

function openPopup () {
  popup.style.display = 'block';
  inputProfileFiller ();
}


document.querySelector('.popup__form-edit').addEventListener('submit', function(e) {
  e.preventDefault();
});

profileSaveButton.addEventListener('click', saveProfile);
popupCloseButton.addEventListener('click', closePopup);
popupOpenButton.addEventListener('click', openPopup);
inputProfileFiller ();
