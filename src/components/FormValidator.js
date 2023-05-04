export class FormValidator {
    constructor (config, form) {
        this._form = form;
        this._formElement = document.querySelector(this._form);
        this._formSelector = config.formSelector;
        this._input = config.inputSelector;
        this._submit = config.submitButtonSelector;
        this._inactiveButton = config.inactiveButtonClass;
        this._inputError = config.inputErrorClass;
        this._error = config.errorClass;
        this._buttonElement = document.querySelector(this._form).querySelector(this._submit);
        this._inputList = Array.from(document.querySelector(this._form).querySelectorAll(this._input));
    }

    _showInputError (inputElement, errorMessage) {
        const inputFormError = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputError);
        inputFormError.textContent = errorMessage;
        inputFormError.classList.add(this._error);
    }

    _hideInputError (inputElement) {
        inputElement.classList.remove(this._inputError);
        const inputFormError = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputFormError.classList.remove(this._error);
        inputFormError.classList.remove(this._error);
        inputFormError.textContent = '';
    }

    _hasInvalidInput () {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }
    
    _toggleButtonState () {
        if(this._hasInvalidInput (this._inputList)) {
            this._buttonElement.setAttribute('disabled', true);
            this._buttonElement.classList.add(this._inactiveButton);
        } else {
            this._buttonElement.removeAttribute('disabled');
            this._buttonElement.classList.remove(this._inactiveButton);
        }
    }

    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    disableSubmitButton () {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        })
        this._toggleButtonState();
    }

    _setEventListener () {

        this._toggleButtonState();
        
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity (inputElement);
                this._toggleButtonState();
            })
        })
    }

    enableValidation () { 
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        })
        this._setEventListener();
    }
}
