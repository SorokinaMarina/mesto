import {Card} from '../components/Сard.js';
import {editButton, popupContainerWithForm, profileName, profileAvatar, popupAvatar, profileEditAvatar, profileProfession, photoButton, photoPopupContainer, inputPictireTitle, inputLink, elements, popupCardImageFull, popupImageHeading, initialCards} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {Popup} from '../components/Popup.js';
import {PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Api } from '../components/Api.js';
import { PopupConfirm } from '../components/PopupConfirm.js'

//Импорт картинок
import JackImage from '../image/Жак.jpg';
import addButtonImage from '../image/КнопкаДобавить.png';
import addButtonImageSvg from '../image/add-button.svg';
import editButtonImage from '../image/edit.svg';
import buttonLikeActiveImage from '../image/like-active.svg';
import buttonLikeImage from '../image/like.svg';
import buttonTrashImage from '../image/trash.svg';
import buttonVectorImage from '../image/Vector.svg';
import editPencil from '../image/editPencil.svg'

const images = {
    name: 'Jack', image: JackImage,
    name: 'КнопкаДобавить', image: addButtonImage,
    name: 'ДобавитьSvg', image: addButtonImageSvg,
    name: 'ЗакрытьSvg', image: editButtonImage,
    name: 'ЛайкАктивный', image: buttonLikeActiveImage,
    name: 'Лайк', image: buttonLikeImage,
    name: 'Удалить', image: buttonTrashImage,
    name: 'Вектор', image: buttonVectorImage,
    name: 'Карандаш', image: editPencil
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

//Переменная с API
const api = new Api('https://nomoreparties.co/v1/cohort-65', {authorization: 'b15bc02e-ae06-46a3-b490-b1ce7ba85320', "content-type": 'application/json; charset=UTF-8'});

//Класс, отвечающий за информацию о пользователе
const userInfo = new UserInfo ({profileName: profileName, profileProfession: profileProfession, profileAvatar: profileAvatar});

//Класс, отвечающий за редактирование полей формы
const popupWithFormEdit = new PopupWithForm ('#popup-profile', { handleFormSubmit: (formData) => {
    api.editUserInfo(formData).then(data => {
        userInfo.setUserInfo(data);
    }).catch(error => console.log(`Ошибка ${error}`))
    .finally(() => {
        popupWithFormEdit.renderLoading(false);
    })
}});

const popupWithFormPhoto = new PopupWithForm ('#popup-add-photo', { handleFormSubmit: (formData) => {
    api.addCard(formData).then(card => {
        createCard(card, '.template-add-cards', handleCardClick, userId);  
    }).catch(error => console.log(`Ошибка ${error}`))
    .finally(() => {
        popupWithFormPhoto.renderLoading(false);
    })
}});

const popupWithFormAvatar = new PopupWithForm ('#popup-avatar', {handleFormSubmit: (formData) => {
    api.editAvatar(formData).then(data => {
        userInfo.setUserInfo(data);
    }).catch(error => console.log(`Ошибка ${error}`))
    .finally(() => {
        popupWithFormAvatar.renderLoading(false);
    })
}})

//Запускаем одновременно метод получения карточки и метод получения информации о пользователе, достаём id пользователя
let userId;

api.getInitialInfo().then(data => {
    const infoUser = data[0];
    const cards = data[1];
    userId = infoUser._id;
    userInfo.setUserInfo(infoUser);
    cardList.renderItems(cards);
}).catch((error) => {
    console.log(`Ошибка ${error}`);
})

//Удаление карточки
const popupConfirm = new PopupConfirm('#popup-confirm', {handleSubmit: (cardId, cardElement) => {
    api.deleteCard(cardId).then(() => {
        cardElement.remove();
        popupConfirm.close();
    }).catch((error) => {
        console.log(`Ошибка ${error}`);
    })
}})
popupConfirm.setEventListeners();

//Класс, отвечающий за открытие картинки карточки
const popupWithImage = new PopupWithImage ('#popup-images', {cardImage: popupCardImageFull, cardHeading: popupImageHeading});
popupWithImage.setEventListeners();

//Функция, которая передаёт данные в созданную карточку
const handleCardClick = (name, link) => {  
    popupWithImage.open(name, link); 
}

const cardList = new Section ({ renderer: (item) => {
    createCard(item, '.template-add-cards', handleCardClick, userId);
}}, elements);

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

//Функция добавления аватара
function handleFormSubmitAvatar () {
    popupWithFormAvatar.setEventListeners();
    popupWithFormAvatar.close();
}

//Функция создания карточки
function createCard (data, templateSelector, handleCardClick, cardId) {
    const card = new Card(data, templateSelector, handleCardClick, cardId, {handleDeleteCard: (cardId, cardEl) => {
        popupConfirm.open(cardId, cardEl);
    }, addLike: () => {
        api.addLike(data._id)
        .then(response => {
            card.like();
            card.likesCount(response);
        }).catch((error) => console.log(`Ошибка ${error}`))
    }, deleteLike: () => {
        api.deleteLike(data._id)
        .then(response => {
          card.dislike();
          card.likesCount(response);
        })
        .catch((error) => console.log(`Ошибка ${error}`))
    }});
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
    openPopup('#popup-add-photo');
}

function editButtonClickHandler () {  
    popupWithFormEdit.setInputValues(userInfo.getUserInfo());
    formValidationEdit.disableSubmitButton();
    openPopup('#popup-profile');
}

function avatarButtonClickHandler () {
    openPopup('#popup-avatar');
    formValidationAvatar.disableSubmitButton();
}

//Вызовы функций
editButton.addEventListener('click', editButtonClickHandler);
photoButton.addEventListener('click', addButtonClickHandler);
popupContainerWithForm.addEventListener('submit', handleFormSubmitEdit);
photoPopupContainer.addEventListener('submit', handleFormSubmitAddPhoto);
profileEditAvatar.addEventListener('click', avatarButtonClickHandler);
popupAvatar.addEventListener('submit', handleFormSubmitAvatar);


const formValidationEdit = new FormValidator(validationConfig, '#popup__form-profile');
formValidationEdit.enableValidation();
const formValidationAddPhoto = new FormValidator(validationConfig, '#popup__form-add-photo');
formValidationAddPhoto.enableValidation();
const formValidationAvatar = new FormValidator(validationConfig, '#popup-avatar-form');
formValidationAvatar.enableValidation();

