export default class Card {
    constructor({ data, cardSelector, handleCardClick, handleDeleteButtonClick, handleLikeClick }) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this.id = data._id;
        this._cardOwnerId = data.owner;
        this._likes = data.likes;
        this._handleCardClick = handleCardClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._handleLikeClick = handleLikeClick;
        this._profileId = document.querySelector('.profile').id;
    }
    _getTemplate() {
        const placeElement = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);
        return placeElement.children[0];
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this.updateLikeData(this._likes)
        this._element.querySelector('.element__description').textContent = this._name;
        this._cardImage = this._element.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardImage.parentElement.id = this.id;

        return this._element
    }
    _isOwner() {
        return this._profileId === this._cardOwnerId._id

    }
    isLiked() {
        return this._likes.some((element) => element._id === this._profileId)
    }
    updateLikeData(likes) {
        this._likes = likes;
        const likeButtonElem = this._element.querySelector('.element__like-button');
        const likeCounterElem = this._element.querySelector('.element__like-counter')

        if (this.isLiked()) {
            likeButtonElem.classList.add('element__like-button_active');
        } else {
            likeButtonElem.classList.remove('element__like-button_active');
        }        
        
        likeCounterElem.textContent = this._likes.length;
    }
    _likeCard() {
        /*
            Надо исправить: лайк должен ставиться только если запрос на сервер выполнился успешно
            Все изменения на странице должны происходить, только после того, как
            сервер ответил подтверждением. Если сервер не ответил, или ответил ошибкой, а
            данные на странице сохраняться, то это может ввести пользователя в заблуждение
        */
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._handleLikeClick(this);
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

