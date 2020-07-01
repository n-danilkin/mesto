import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
        super(popupSelector);
    }
    open({ link, name }) {
        super.open();
        this._popupSelector.querySelector('.popup__caption').textContent = name;
        this._popupSelector.querySelector('.popup__image').src = link;
    }
}


