import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor (popupSelector, { handleFormSubmit }) {
        super(popupSelector);

        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input')); 
        this._formButton = this._formElement.querySelector('.popup__button-save');
    }

    //Функция возвращает объект,в значения ключей которого внесены данные из инпутов
    _getInputValues () {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        })
        
        return this._formValues;
    }

    //Функция принимает объект, в котором хранятся данные со страницы и записывает их внутрь полей инпутов
    setInputValues (data) {
         this._inputList.forEach(item => {
            item.value = data[item.name] ?? '';
        })
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._formButton.textContent = 'Сохранение...'
        } else {
            if(this._formElement.classList.contains('popup__form-add-photo')) {
                this._formButton.textContent = `Создать`;
            } else {
                this._formButton.textContent = `Сохранить`;
            }
        }
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        })
        
        this.renderLoading(true);
        this._handleFormSubmit(this._getInputValues());
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}