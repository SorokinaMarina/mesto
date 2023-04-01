export class FormValidator {
    constructor (object, form) {
        this._form = form;
        this._formSelector = object.formSelector;
        this._input = object.inputSelector;
        this._submit = object.submitButtonSelector;
        this._inactiveButton = object.inactiveButtonClass;
        this._inputError = object.inputErrorClass;
        this._error = object.errorClass;
    }

    _showInputError (formElement, inputElement, errorMessage) {
        const inputFormError = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputError);
        inputFormError.textContent = errorMessage;
        inputFormError.classList.add(this._error);
    }

    _hideInputError (formElement, inputElement) {
        inputElement.classList.remove(this._inputError);
        const inputFormError = formElement.querySelector(`.${inputElement.id}-error`);
        inputFormError.classList.remove(this._error);
        inputFormError.classList.remove(this._error);
        inputFormError.textContent = '';
    }

    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }
    
    _toggleButtonState (inputList, buttonElement) {
        if(this._hasInvalidInput (inputList)) {
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(this._inactiveButton);
        } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(this._inactiveButton);
        }
    }

    _checkInputValidity (formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    }

    buttonDisabled (formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._input));
        const buttonElement = formElement.querySelector(this._submit);
    
        inputList.forEach((inputElement) => {
            this._hideInputError(formElement, inputElement);
        })
        this._toggleButtonState(inputList, buttonElement);
    }

    _setEventListener (formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._input));
        const buttonElement = formElement.querySelector(this._submit);

        this._toggleButtonState(inputList, buttonElement);
        
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity (formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement);
            })
        })
    }

    enableValidation () {
        const formElement = document.querySelector(this._form);
        
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        })
        this._setEventListener(formElement);
    }
}
