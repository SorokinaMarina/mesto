
export class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._popupForm = this._popupElement.querySelector('.popup__form');
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    open () {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close () {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }


    setEventListeners () {
        this._popupElement.addEventListener('mousedown', (event) => {
            if (event.target.classList.contains('popup__button-exit') || event.target.classList.contains('popup')){
                this.close();
            }
        })
    }
}

