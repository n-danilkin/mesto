import ImagePopup from "./ImagePopup.js";
export default class Card {
    constructor(data, cardSelector) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
    }
    _getTemplate() {
        const placeElement = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);
        return placeElement;
    }
    _appendPlaceToDom(place) {
        const elements = document.querySelector('.elements');
        elements.append(place);
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__description').textContent = this._name;
        this._element.querySelector('.element__image').src = this._link;
        this._appendPlaceToDom(this._element);
    }
    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', function (evt) {
            const eventTarget = evt.target;
            eventTarget.classList.toggle('element__like-button_active');
        });

        this._element.querySelector('.element__delete-button').addEventListener('click', function (evt) {
            const eventTarget = evt.target;
            eventTarget.parentElement.remove();
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            const img = new ImagePopup;
            img.open(this._link, this._name)
        });

    }
}
