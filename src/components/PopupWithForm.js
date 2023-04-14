import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor (popupSelector, { handleFormSubmit }) {
        super(popupSelector);

        this._handleFormSubmit = handleFormSubmit;
        this._element = document.querySelector('.popup__form');
        this._inputList = Array.from(this._element.querySelectorAll('.popup__input'));
    }

    _getInputValues () {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;
    }

    setInputValues ({name, profession}) {
        this._inputName = this._element.querySelector('#popup__input-name');
        this._inputProfession = this._element.querySelector('#popup__input-profession');
        this._inputName.value = name;
        this._inputProfession.value = profession;       
    }

    setEventListeners() {
        this._element.addEventListener('submit', (event) => {
            event.preventDefault();
        })

        this._handleFormSubmit(this._getInputValues());
    }

    close() {
        super.close();
        this._element.reset();
    }
}