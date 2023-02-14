const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupButtonExit = document.querySelector('.popup__button-exit');
const popupForm = document.querySelector('.popup__container');
const inputName = popupForm.querySelector('.popup__input_type_name');
const inputProfession = popupForm.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

function handleFormSubmit (event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    closePopup();
}

function openPopup () {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
}

function closePopup () {
    popup.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', openPopup);
popupButtonExit.addEventListener('click', closePopup);




