export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._escapeKeydownEvent = this._escapeKeydownEvent.bind(this)
    }
    _createPopup(popupTemplate) {
        const popup = popupTemplate.content.cloneNode(true);
        return popup.firstElementChild
    }
    _closePopup(popup) {
        popup.remove();
    }
    setEventListeners(popup) {
        popup.querySelector('.popup__close-button').addEventListener('click', () => {
            this.close();
        });
    }
    _addOverlayListeners(popup) {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup')) {
                this.close();
            }
        });
    }
    _escapeKeydownEvent(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    _addEscListeners() {
        document.addEventListener('keydown', this._escapeKeydownEvent);
    }
    _animationOpenPopup(popup) {
        popup.offsetHeight;
        popup.style.opacity = '1';
    }
    _animationClosePopup(popup) {
        popup.style.opacity = '0';
    }
    close() {
        this._animationClosePopup(this._container);
        this._container.addEventListener('transitionend', () => {
            this._closePopup(this._container);
        });
        document.removeEventListener('keydown', this._escapeKeydownEvent);
    }
    open() {
        this._container = this._createPopup(this._popupSelector);
        this.setEventListeners(this._container);
        this._addEscListeners();
        document.querySelector('.page').append(this._container);
        this._addOverlayListeners(this._container);
        this._animationOpenPopup(this._container);
    }
}
