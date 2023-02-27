const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('#popup-profile');
const photoPopup = document.querySelector('#popup-add-photo');
const popupImages = document.querySelector('#popup-images');
const popupButtonsExit = document.querySelectorAll('.popup__button-exit');
const popupForm = document.querySelector('.popup__container');
const inputName = popupForm.querySelector('.popup__input_type_name');
const inputProfession = popupForm.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const photoButton = document.querySelector('.profile__add-button');
const photoPopupContainer = document.querySelector('#popup__container-add-photo');
const inputPictireTitle = photoPopup.querySelector('.popup__input_type_title');
const inputLink = photoPopup.querySelector('.popup__input_type_link');
const elements = document.querySelector('.elements');
const templateCards = document.querySelector('#template-add-cards').content;
const popupImage = popupImages.querySelector('.popup__image');
const popupHeading = popupImages.querySelector('.popup__heading');
const elementImage = elements.querySelector('.element__image');
const elementHeading = elements.querySelector('.element__title');


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 


initialCards.forEach(function (item) {
    addCard(createCard(item.name, item.link));
})

function createCard (name, link) {

    const cardElement = templateCards.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardHeading = cardElement.querySelector('.element__title');
    const elementButtonTrash = cardElement.querySelector('.element__button-trash');
    const elementButtonLike = cardElement.querySelector('.element__button-like');

    cardHeading.textContent = name;
    cardImage.setAttribute('alt', name);
    cardImage.setAttribute('src', link);
    inputLink.src = cardImage.src;

    elementButtonTrash.addEventListener('click', handleDeleteButtonClick);
    elementButtonLike.addEventListener('click', clickLike);

    cardImage.addEventListener('click', function (event) {
            openPopup(popupImages);
            popupImage.src = link;
            popupImage.alt = name;
            popupHeading.textContent = name;
     });

    return cardElement;
}


//Функция добавления новой карточки
function addCard(item) {
    elements.prepend(item);
}

//Функция закрытия попапа с профилем на кнопку "Сохранить" и "Создать"
function handleFormSubmitEdit (event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    closePopup(popupEditProfile);
}

function handleFormSubmitAddPhoto (event) {
    event.preventDefault();
    closePopup(photoPopup);
    addCard(createCard(inputPictireTitle.value, inputLink.value));
}

//Функция удаления карточек для кнопки "корзина"
function handleDeleteButtonClick (event) {
    const deleteButton = event.target;
    const deleteButtonParent = deleteButton.closest('.element');
    deleteButtonParent.remove();
}

//Функция активации лайка
function clickLike (event) {
    const buttonLike = event.target;
    buttonLike.classList.toggle('element__button-like_active');
}


//Функция закрытия попапа на крестик
popupButtonsExit.forEach(function (item) {
    item.addEventListener('click', clickButtonExit);
})


function clickButtonExit (event) {
    const clickButton = event.target.closest('.popup');
    closePopup(clickButton);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}


//Функция открытия попап
function openPopup (popup) {
    popup.classList.add('popup_opened');
}

function addButtonClickHandler () { 
    openPopup(photoPopup);
    inputPictireTitle.value = '';
    inputLink.value = '';
}

function editButtonClickHandler () { 
    openPopup(popupEditProfile);
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent; 
}

function openImage () {
    openPopup(popupImages);
}

//Вызовы функций
popupForm.addEventListener('submit', handleFormSubmitEdit);
photoButton.addEventListener('click', addButtonClickHandler);
editButton.addEventListener('click', editButtonClickHandler);
photoPopupContainer.addEventListener('submit', handleFormSubmitAddPhoto);







