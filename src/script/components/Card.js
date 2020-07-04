export default class Card {
    constructor({ data, cardSelector, handleCardClick, handleDeleteButtonClick, handleLikeClick }) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._cardOwnerId = data.owner;
        this._likes = data.likes; // записывать +id  атрибут брать like.length        
        this._handleCardClick = handleCardClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._handleLikeClick = handleLikeClick;
        this._profileId = document.querySelector('.profile').id
    }
    _getTemplate() {
        const placeElement = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);
        return placeElement;
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__description').textContent = this._name;
        this._cardImage = this._element.querySelector('.element__image');
        this._element.querySelector('.element__like-counter').textContent = this._likes.length;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardImage.parentElement.id = this._id;

        return this._element
    }
    _isOwner() {
        if (this._profileId == this._cardOwnerId._id) {
            return true
        } else {
            return false
        }
    }
    _isLiked() {
        if (this._likes.some((element) => { return element._id == this._profileId })) {
            return true
        } else {
            return false
        }
    }
    _likeCard() {
        if (this._isLiked()) {
            this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
        }
        this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
            const eventTarget = evt.target;
            this._handleLikeClick(this._id, this._isLiked())
            eventTarget.classList.toggle('element__like-button_active');
        });
    }
    _deleteCard() {
        if (this._isOwner()) {
            this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
                const eventTarget = evt.target;
                this._handleDeleteButtonClick(eventTarget.parentElement.id)
            });
        } else {
            this._element.querySelector('.element__delete-button').remove()
        }

    }
    _handleImageClick() {
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick({
                link: this._link,
                name: this._name
            })
        });
    }
    _setEventListeners() {
        this._likeCard();
        this._deleteCard();
        this._handleImageClick();
    }
}

