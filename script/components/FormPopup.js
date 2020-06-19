export default class FormPopup {
    _createPopup(popupTemplate) {
        const popup = popupTemplate.cloneNode(true);
        return popup.firstElementChild
    }
    _closePopup(popup) {
        popup.remove();
    }
    _addCloseButtonListeners(popup) {
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
    _addEscListeners(popup) {
        document.addEventListener('keydown', escapeKeydownEvent);

        function escapeKeydownEvent(evt) {
            if (evt.key === 'Escape') {
                animatedPopupClosing(popup);
                document.removeEventListener('keydown', escapeKeydownEvent);
            }
        }
    }
    _addSubmitListenters(popup, func) {
        popup.querySelector('.popup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            func(popup);
        });
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
    }
    open() {
        const popupTemplate = document.querySelector('#popup-template').content;
        this._container = this._createPopup(popupTemplate);
        this._addCloseButtonListeners(this._container);
        this._addEscListeners(this._container);
        document.querySelector('.page').append(this._container);
        this._addOverlayListeners(this._container);
        this._animationOpenPopup(this._container);
    }
}
