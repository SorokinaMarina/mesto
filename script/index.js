const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupButtonExit = document.querySelector('.popup__button-exit');

editButton.addEventListener('click', function () {
   popup.classList.remove('popup_opened');
})

popupButtonExit.addEventListener('click', function () {
    popup.classList.add('popup_opened');
})

const popupForm = document.querySelector('.popup__container');
const inputName = popupForm.querySelector('.popup__input-name');
const inputProfession = popupForm.querySelector('.popup__input-profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const inputButtonSave = popupForm.querySelector('.popup__button-save');

const userName = 'Жак-Ив Кусто';
profileName.textContent = userName;
inputName.value = userName;


const userProfession = 'Исследователь океана';
profileProfession.textContent = userProfession;
inputProfession.value = userProfession;

inputButtonSave.addEventListener('click', function () {
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    popup.classList.add('popup_opened');
})

function handleFormSubmit (event) {
    event.preventDefault();
    inputButtonSave.addEventListener('click', function () {
        profileName.textContent = inputName.value;
        profileProfession.textContent = inputProfession.value;
        popup.classList.add('popup_opened');
    })
}


popupForm.addEventListener('submit', handleFormSubmit);


