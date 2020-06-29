import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor({ popupSelector, fillPopup }) {
        super(popupSelector);
        this._fillPopup = fillPopup;
    }
    _addNewElements(link, name, container) {
        const placeImage = document.createElement('img');
        const caption = document.createElement('p');
        caption.style.textAlign = 'left';
        placeImage.style.cssText = `
        max-width: 75vw;
        max-height: 75vh;
        `;
        caption.textContent = name;
        placeImage.src = link;
        container.querySelector('.popup__content').append(placeImage, caption);
    }
    open({ link, name }) {
        super.open();
        this._fillPopup(this._container);
        this._addNewElements(link, name, this._container);
    }
}


