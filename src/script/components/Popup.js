export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._escapeKeydownEvent = this._escapeKeydownEvent.bind(this);
        this._overlayClickEvent = this._overlayClickEvent.bind(this);
        this.close = this.close.bind(this);
    }
    _overlayClickEvent(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }
    _escapeKeydownEvent(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    _addOverlayListeners(popup) {
        popup.addEventListener('mousedown', this._overlayClickEvent);
    }
    _addEscListeners() {
        document.addEventListener('keydown', this._escapeKeydownEvent);
    }
    setEventListeners(popup) {
        popup.querySelector('.popup__close-button').addEventListener('click', this.close);
    }
    close() {
        this._popupSelector.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._escapeKeydownEvent);
        this._popupSelector.querySelector('.popup__close-button').removeEventListener('click', this.close);
        this._popupSelector.removeEventListener('mousedown', this._overlayClickEvent);
    }
    open() {
        this._popupSelector.classList.add('popup_is-opened');
        this.setEventListeners(this._popupSelector);
        this._addEscListeners();
        this._addOverlayListeners(this._popupSelector);
    }
}
