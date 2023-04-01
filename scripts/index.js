import {ArrChart} from './array';
import {ValidateChart} from './validate';
import {CardChart} from './card';

    const editButton = document.querySelector('.profile__edit-button');
    const popupEditProfile = document.querySelector('#popup-profile');
    const photoPopup = document.querySelector('#popup-add-photo');
    const popupImages = document.querySelector('#popup-images');
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
    const popupCardImageFull = popupImages.querySelector('.popup__image');
    const popupImageHeading = popupImages.querySelector('.popup__heading');
    const popups = document.querySelectorAll('.popup');
    const popupSpanError = document.querySelectorAll('.popup__input-error');
    const popupInputError = document.querySelectorAll('.popup__input-error');
    const popupFormEditProfile = document.querySelector('#popup__form-profile');
    const popupFormAddPhoto = document.querySelector('#popup__form-add-photo');

//Проходимся по массиву объектов
initialCards.forEach(function (data) {
    const card = new Card(data, '.template-add-cards');
    const cardElement = card.generateCard();
    addCard(cardElement);
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

    const card = new createCard(inputPictireTitle.value, inputLink.value, '.template-add-cards');
    const cardElement = card.generateCard();

    addCard(cardElement);
    closePopup(photoPopup);
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
    formValidationAddPhoto.buttonDisabled(popupFormAddPhoto);
    openPopup(photoPopup);
}

function editButtonClickHandler () { 
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent; 
    formValidationEdit.buttonDisabled(popupFormEditProfile);
    openPopup(popupEditProfile);
}

//Закрытие попапа на Esc
function clickButtonEsc (event) {
    if (event.key === 'Escape') {
        popups.forEach(function (popup) {
            closePopup(popup);
        })
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



// initialCards.forEach(function (card) {
//     addCard(createCard(card));
// })

// function createCard (card) {

//     const cardElement = templateCards.querySelector('.element').cloneNode(true);
//     const cardImage = cardElement.querySelector('.element__image');
//     const cardHeading = cardElement.querySelector('.element__title');
//     const elementButtonTrash = cardElement.querySelector('.element__button-trash');
//     const elementButtonLike = cardElement.querySelector('.element__button-like');

//     cardHeading.textContent = card.name;
//     cardImage.setAttribute('alt', card.name);
//     cardImage.setAttribute('src', card.link);
//     inputLink.src = cardImage.src;

//     elementButtonTrash.addEventListener('click', handleDeleteButtonClick);
//     elementButtonLike.addEventListener('click', handleClickLike);

//     cardImage.addEventListener('click', () => addLinkAndNameToPopupImage(card.name, card.link));
    
//     return cardElement;
// }

// // Функция передачи параметров в попап с картинкой
// function addLinkAndNameToPopupImage (name, link) {
//     popupCardImageFull.src = link;
//     popupCardImageFull.alt = name;
//     popupImageHeading.textContent = name;
//     openPopup(popupImages);
// }


// //Функция добавления новой карточки
// function addCard(card) {
//     elements.prepend(card);
// }

// //Функция закрытия попапа с профилем на кнопку "Сохранить" и "Создать"
// function handleFormSubmitEdit (event) {
//     event.preventDefault();
//     profileName.textContent = inputName.value;
//     profileProfession.textContent = inputProfession.value;
//     closePopup(popupEditProfile);
// }

// function handleFormSubmitAddPhoto (event) {
//     event.preventDefault();

//     const newCard = {
//         name: inputPictireTitle.value,
//         link: inputLink.value
//     }
    
//     addCard(createCard(newCard));
//     closePopup(photoPopup);
// }

// //Функция удаления карточек для кнопки "корзина"
// function handleDeleteButtonClick (event) {
    // const deleteButton = event.target;
    // const deleteButtonParent = deleteButton.closest('.element');
    // deleteButtonParent.remove();
// }

//Функция активации лайка
// function handleClickLike (event) {
//     const buttonLike = event.target;
//     buttonLike.classList.toggle('element__button-like_active');
// }

// //Закрытие попапа на Esc
// function clickButtonEsc (event) {
//     if (event.key === 'Escape') {
//         popups.forEach(function (popup) {
//             closePopup(popup);
//         })
//     }  
// }

// //Функция закрытия попапов на крестик и фон
// popups.forEach(function (item) {
//     item.addEventListener('mousedown', exitFromPopup);
// })

// function exitFromPopup (event) {
//     if (event.target.classList.contains('popup__button-exit') || event.target.classList.contains('popup')){
//         closePopup(event.currentTarget);
//     }
// }

// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', clickButtonEsc);
// }

// //Функция открытия попап
// function openPopup (popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', clickButtonEsc);
// }

// function addButtonClickHandler () { 
//     inputPictireTitle.value = '';
//     inputLink.value = '';
//     buttonDisabled(popupFormAddPhoto, formObject);
//     openPopup(photoPopup);
// }

// function editButtonClickHandler () { 
//     inputName.value = profileName.textContent;
//     inputProfession.value = profileProfession.textContent; 
//     buttonDisabled(popupFormEditProfile, formObject);
//     openPopup(popupEditProfile);
// }

// function openImage () {
//     openPopup(popupImages);
// }


// //Вызовы функций
// popupContainerWithForm.addEventListener('submit', handleFormSubmitEdit);
// photoButton.addEventListener('click', addButtonClickHandler);
// editButton.addEventListener('click', editButtonClickHandler);
// photoPopupContainer.addEventListener('submit', handleFormSubmitAddPhoto);

//Функция закрытия попапа на крестик
// popupButtonsExit.forEach(function (item) {
//     item.addEventListener('click', clickButtonExit);
// })


// function clickButtonExit (event) {
//     const clickButton = event.target.closest('.popup');
//     closePopup(clickButton);
// }

// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
// }





