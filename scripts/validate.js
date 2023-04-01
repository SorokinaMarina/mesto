import {popupCardImageFull, popupImageHeading, popupSpanError, popupInputError} from './index';

export const ValidateChart = (function () {
    class FormValidation {
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
    
    const formObject = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button-save',
        inactiveButtonClass: 'popup__button-save_inactive',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active'
    }
    
    const formValidationEdit = new FormValidation(formObject, '#popup__form-profile');
    formValidationEdit.enableValidation();
    const formValidationAddPhoto = new FormValidation(formObject, '#popup__form-add-photo');
    formValidationAddPhoto.enableValidation();
}) ();

//Валидация вариант второй с использованием объекта

 
// function showInputError (formElement, inputElement, errorMessage, object) {
//     const inputFormError = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(object.inputErrorClass);
//     inputFormError.classList.add(object.errorClass);
//     inputFormError.textContent = errorMessage;
// }

// function hideInputError (formElement, inputElement, object) {
//     inputElement.classList.remove(object.inputErrorClass);
//     const inputFormError = formElement.querySelector(`.${inputElement.id}-error`);
//     inputFormError.classList.remove(object.errorClass);
//     inputFormError.classList.remove(object.errorClass);
//     inputFormError.textContent = '';
// }

// function checkInputValidity (formElement, inputElement, object) {
//     if (!inputElement.validity.valid) {
//         showInputError(formElement, inputElement, inputElement.validationMessage, object);
//     } else {
//         hideInputError(formElement, inputElement, object);
//     }
// }

// function hasInvalidInput (inputList) {
//     return inputList.some(function (inputElement) {
//         return !inputElement.validity.valid;
//     })
// }

// function toggleButtonState (inputList, buttonElement, object) {
//     if(hasInvalidInput(inputList)) {
//         buttonElement.setAttribute('disabled', true);
//         buttonElement.classList.add(object.inactiveButtonClass);
//     } else {
//         buttonElement.removeAttribute('disabled');
//         buttonElement.classList.remove(object.inactiveButtonClass);
//     }
// }

// function buttonDisabled (formElement, object) {
//     const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
//     const buttonElement = formElement.querySelector(object.submitButtonSelector);

//     inputList.forEach(function (inputElement) {
//         hideInputError(formElement, inputElement, object);
//     })
//     toggleButtonState(inputList, buttonElement, object);
// }


// function setEventListeners (formElement, object) {
//     const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
//     const buttonElement = formElement.querySelector(object.submitButtonSelector);
    
//     toggleButtonState(inputList, buttonElement, object);

//     inputList.forEach(function (inputElement) {
//         inputElement.addEventListener('input', function () {
//             checkInputValidity(formElement, inputElement, object);
//             toggleButtonState(inputList, buttonElement, object);
//         })
//     })
// }

// function enableValidation (object) {
//     const formList = Array.from(document.querySelectorAll(object.formSelector));
    
//     formList.forEach(function (formElement) {
//         formElement.addEventListener('submit', function (event) {
//             event.preventDefault();
//         })  
//         setEventListeners(formElement, object);
//     }) 
// }


// const formObject = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button-save',
//     inactiveButtonClass: 'popup__button-save_inactive',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__input-error_active'
// }

// enableValidation(formObject); 



//Валидация вариант первый с переменными

// const formProfile = document.querySelector('#popup__form-profile');
// const formAddPhoto = document.querySelector('#popup__form-add-photo');
// const inputFormProfile = formProfile.querySelector('.popup__input');
// const inputFormAddPhoto = formAddPhoto.querySelector('.popup__input');
// const inputFormProfileError = formProfile.querySelector(`.${inputFormProfile.id}-error`);
// const inputFormAddPhotoError = formAddPhoto.querySelector(`.${inputFormProfile.id}-error`);
// const buttonProfile = formProfile.querySelector('.popup__button-save');


// function showInputError (formElement, inputElement, errorMessage) {
//     const inputFormError = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add('popup__input_type_error');
//     inputFormError.classList.add('popup__input-error_active');
//     inputFormError.textContent = errorMessage;
// }

// function hideInputError (formElement, inputElement) {
//     inputElement.classList.remove('popup__input_type_error');
//     const inputFormError = formElement.querySelector(`.${inputElement.id}-error`);
//     inputFormError.classList.remove('popup__input-error_active');
//     inputFormError.classList.remove('popup__input-error_active');
//     inputFormError.textContent = '';
// }

// function checkInputValidity (formElement, inputElement) {
//     if (!inputElement.validity.valid) {
//         showInputError(formElement, inputElement, inputElement.validationMessage);
//     } else {
//         hideInputError(formElement, inputElement);
//     }
// }

// function hasInvalidInput (inputList) {
//     return inputList.some(function (inputElement) {
//         return !inputElement.validity.valid;
//     })
// }

// function toggleButtonState (inputList, buttonElement) {
//     if(hasInvalidInput(inputList)) {
//         buttonElement.classList.add('popup__button-save_inactive');
//         buttonElement.setAttribute('disabled', true);
//     } else {
//         buttonElement.classList.remove('popup__button-save_inactive');
//         buttonElement.removeAttribute('disabled', true);
//     }
// }


// function setEventListeners (formElement) {
//     const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//     const buttonElement = Array.from(formElement.querySelectorAll('.popup__button-save'));
    
//     buttonElement.forEach(function (button) {
//         toggleButtonState(inputList, button);
//     })

//     inputList.forEach(function (inputElement) {
//         inputElement.addEventListener('input', function () {
//             checkInputValidity(formElement, inputElement);
//             buttonElement.forEach(function (button) {
//                 toggleButtonState(inputList, button);
//             })
//         })
//     })
// }

// function enableValidation () {
//     const formList = Array.from(document.querySelectorAll('.popup__form'));

//     formList.forEach(function (formElement) {
//         formElement.addEventListener('submit', function (event) {
//             event.preventDefault();
//         })  
//         setEventListeners(formElement);
//     }) 
// }

// enableValidation(formProfile, inputFormProfile, inputFormProfileError);
// enableValidation(formAddPhoto, inputFormAddPhoto, inputFormAddPhotoError);