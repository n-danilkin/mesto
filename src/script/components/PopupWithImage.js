import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
        super(popupSelector);
    }
    open({ link, name }) {
        super.open();
        this._container.querySelector('.popup__caption').textContent = name;
        this._container.querySelector('.popup__image').src = link;
    }
}


