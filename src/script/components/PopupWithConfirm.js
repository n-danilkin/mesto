import Popup from './Popup.js';
export default class PopupWithConfirm extends Popup {
    constructor({PopupSelector, handleFormSubmit}) {
        super(PopupSelector)
        this._handleFormSubmit = handleFormSubmit;
        this._saveEvent = this._saveEvent.bind(this)
    }
    _saveEvent(evt) {
        evt.preventDefault();
        this._handleFormSubmit();
        this.close();
      }
      setEventListeners(popup) {
        super.setEventListeners(popup);
        popup.querySelector('.popup-form').addEventListener('submit', this._saveEvent);
      }      
      close() {
        super.close();        
        this._popupSelector.querySelector('.popup-form').removeEventListener('submit', this._saveEvent);
      }
}