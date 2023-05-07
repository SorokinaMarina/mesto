import {Popup} from '../components/Popup.js';

export class PopupConfirm extends Popup {
    constructor (popupSelector, {handleSubmit}) {
        super (popupSelector);
        this._handleSubmit = handleSubmit;
    }


    _handleSubmitForm = (event) => {
        event.preventDefault();
        this._handleSubmit (this._cardId);
        this._removeCardElement();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._handleSubmitForm);
    }

    open (cardId, removeCardElement) {
        super.open();
        this._cardId = cardId;
        this._removeCardElement = removeCardElement;
    }


    close () {
        super.close();
        this._popupForm.reset();
    }
}