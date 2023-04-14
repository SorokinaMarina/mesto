export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open () {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close () {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners () {
        this._popupSelector.addEventListener('mousedown', (event) => {
            if (event.target.classList.contains('popup__button-exit') || event.target.classList.contains('popup')){
                this.close(event.currentTarget);
            }
        })
    }
}
