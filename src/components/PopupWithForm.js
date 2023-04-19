import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor (popupSelector, { handleFormSubmit }) {
        super(popupSelector);

        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input')); 
    }

    _getInputValues () {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;
    }

    setInputValues (data) {
         this._inputList.forEach(item => {
            item.value = data[item.name] ?? '';
        })
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        })

        this._handleFormSubmit(this._getInputValues());
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}