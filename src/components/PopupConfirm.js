import {Popup} from '../components/Popup.js';

export class PopupConfirm extends Popup {
    constructor (popupSelector, {handleSubmit}) {
        super (popupSelector);
        this._handleSubmit = handleSubmit;
        this._popupForm = this._popupElement.querySelector('.popup__form');
    }


    _handleSubmitForm = (event) => {
        event.preventDefault();
        this._handleSubmit (this._cardId, this._cardEl);
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._handleSubmitForm);
    }

    open (cardId, cardEl) {
        super.open();
        this._cardId = cardId;
        this._cardEl = cardEl;
    }


    close () {
        super.close();
        this._popupForm.reset();
    }
}