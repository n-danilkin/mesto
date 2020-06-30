export default class Card {
    constructor({ data, cardSelector, handleCardClick }) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
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
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        return this._element
    }
    _likeCard() {
        this._element.querySelector('.element__like-button').addEventListener('click', function (evt) {
            const eventTarget = evt.target;
            eventTarget.classList.toggle('element__like-button_active');
        });
    }
    _deleteCard() {
        this._element.querySelector('.element__delete-button').addEventListener('click', function (evt) {
            const eventTarget = evt.target;
            eventTarget.parentElement.remove();
        });
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

