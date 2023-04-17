import {Card} from '../components/Сard.js';
import {editButton, popupEditProfile, photoPopup, popupContainerWithForm, profileName, profileProfession, photoButton, photoPopupContainer, inputPictireTitle, inputLink, elements, popupImages, popupCardImageFull, popupImageHeading, initialCards} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {Popup} from '../components/Popup.js';
import {PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

//Импорт картинок
import JackImage from '../image/Жак.jpg';
import addButtonImage from '../image/КнопкаДобавить.png';
import addButtonImageSvg from '../image/add-button.svg';
import editButtonImage from '../image/edit.svg';
import buttonLikeActiveImage from '../image/like-active.svg';
import buttonLikeImage from '../image/like.svg';
import buttonTrashImage from '../image/trash.svg';
import buttonVectorImage from '../image/Vector.svg';

const images = {
    name: 'Jack', image: JackImage,
    name: 'КнопкаДобавить', image: addButtonImage,
    name: 'ДобавитьSvg', image: addButtonImageSvg,
    name: 'ЗакрытьSvg', image: editButtonImage,
    name: 'ЛайкАктивный', image: buttonLikeActiveImage,
    name: 'Лайк', image: buttonLikeImage,
    name: 'Удалить', image: buttonTrashImage,
    name: 'Вектор', image: buttonVectorImage
}

//Импортируем css
import './index.css';

//Объект для FormValidator
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
} 

//Класс, отвечающий за информацию о пользователе
const userInfo = new UserInfo ({profileName: profileName, profileProfession: profileProfession});

//Класс, отвечающий за редактирование полей формы
const popupWithFormEdit = new PopupWithForm (popupEditProfile, { handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
}});

const popupWithFormPhoto = new PopupWithForm (photoPopup, { handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    createCard(inputPictireTitle.value, inputLink.value, '.template-add-cards', handleCardClick);
}});


//Функция, которая передаёт данные в созданную карточку
const handleCardClick = (name, link) => {
    const popupWithImage = new PopupWithImage (popupImages, {imageFull: popupCardImageFull, imageHeading: popupImageHeading, name: name, link: link});
    popupWithImage.setEventListeners();  
    popupWithImage.open(); 
}

//Добавляем карточку с помощью Section
const cardList = new Section ({items: initialCards, renderer: (item) => {
    createCard(item.name, item.link, '.template-add-cards', handleCardClick);
}}, elements);
cardList.renderItems();


//Функция закрытия попап на кнопку "Сохранить"
function handleFormSubmitEdit () {
    popupWithFormEdit.setEventListeners();
    popupWithFormEdit.close();
}


//Функция добавления новой карточки на кнопку "Создать"
function handleFormSubmitAddPhoto () {
    popupWithFormPhoto.setEventListeners();
    popupWithFormPhoto.close();
}

//Функция создания карточки
function createCard (name, link, templateSelector, handleCardClick) {
    const card = new Card(name, link, templateSelector, handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
}

//Функция открытия попапа
function openPopup (popupElement) {
    const popup = new Popup (popupElement);
    popup.open();
    popup.setEventListeners();
}

function addButtonClickHandler () { 
    inputPictireTitle.value = '';
    inputLink.value = '';
    formValidationAddPhoto.disableSubmitButton();
    openPopup(photoPopup);
}

function editButtonClickHandler () {  
    popupWithFormEdit.setInputValues(userInfo.getUserInfo());
    formValidationEdit.disableSubmitButton();
    openPopup(popupEditProfile);
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

