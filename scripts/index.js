import {Card} from './Сard.js';
import {initialCards} from './constants.js';
import {FormValidator} from './FormValidator.js';


const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('#popup-profile');
const photoPopup = document.querySelector('#popup-add-photo');
const popupContainerWithForm = document.querySelector('.popup__container');
const inputName = popupContainerWithForm.querySelector('.popup__input_type_name');
const inputProfession = popupContainerWithForm.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const photoButton = document.querySelector('.profile__add-button');
const photoPopupContainer = document.querySelector('#popup__container-add-photo');
const inputPictireTitle = photoPopup.querySelector('.popup__input_type_title');
const inputLink = photoPopup.querySelector('.popup__input_type_link');
const elements = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup');
const popupImages = document.querySelector('#popup-images');
const popupCardImageFull = popupImages.querySelector('.popup__image');
const popupImageHeading = popupImages.querySelector('.popup__heading');

//Объект для FormValidator
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
} 

//Функция, которая передаёт данные в созданную карточку
const handleCreateCard = (name, link) => {
    popupCardImageFull.src = link;
    popupCardImageFull.alt = name;
    popupImageHeading.textContent = name;
    openPopup(popupImages);
}

//Проходимся по массиву объектов
initialCards.forEach(function (data) {
    createCard(data.name, data.link, '.template-add-cards', handleCreateCard);
})


//Функция закрытия попап на кнопку "Сохранить"
function handleFormSubmitEdit (event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    closePopup(popupEditProfile);
}


//Функция добавления новой карточки на кнопку "Создать"
function handleFormSubmitAddPhoto (event) {
    event.preventDefault();
    createCard(inputPictireTitle.value, inputLink.value, '.template-add-cards', handleCreateCard);
    closePopup(photoPopup);
}

//Функция создания карточки
function createCard (name, link, templateSelector, handleCreateCard) {
    const card = new Card(name, link, templateSelector, handleCreateCard);
    const cardElement = card.generateCard();
    addCard(cardElement);
}


//Функция добавления карточки
function addCard(card) {
    elements.prepend(card);
}

//Функция открытия попапов
function openPopup (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', clickButtonEsc);
}

function addButtonClickHandler () { 
    inputPictireTitle.value = '';
    inputLink.value = '';
    formValidationAddPhoto.disableSubmitButton();
    openPopup(photoPopup);
}

function editButtonClickHandler () { 
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent; 
    formValidationEdit.disableSubmitButton();
    openPopup(popupEditProfile);
}

function openImage () {
    openPopup(popupImages);
}

//Закрытие попапа на Esc
function clickButtonEsc (event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
}

//Функция закрытия попапов на крестик и фон
popups.forEach(function (item) {
    item.addEventListener('mousedown', exitFromPopup);
})

function exitFromPopup (event) {
    if (event.target.classList.contains('popup__button-exit') || event.target.classList.contains('popup')){
        closePopup(event.currentTarget);
    }
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', clickButtonEsc);
}

//Вызовы функций
editButton.addEventListener('click', editButtonClickHandler);
photoButton.addEventListener('click', addButtonClickHandler);
popupContainerWithForm.addEventListener('submit', handleFormSubmitEdit);
photoPopupContainer.addEventListener('submit', handleFormSubmitAddPhoto);

const formValidationEdit = new FormValidator(validationConfig, '#popup__form-profile');
formValidationEdit.enableValidation();
const formValidationAddPhoto = new FormValidator(validationConfig, '#popup__form-add-photo');
formValidationAddPhoto.enableValidation();





