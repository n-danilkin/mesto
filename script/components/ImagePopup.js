import FormPopup from './FormPopup.js';
export default class ImagePopup extends FormPopup {
    _removeOldElements(popup) {
        popup.querySelector('.popup__title').remove();
        popup.querySelector('.popup-form').remove();
    }
    _changeStyle(popup) {
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
    open(link, name) {
        super.open();
        this._removeOldElements(this._container);
        this._changeStyle(this._container);
        this._addNewElements(link, name, this._container);
    }
}


