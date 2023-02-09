const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupButtonExit = document.querySelector('.popup__button-exit');

editButton.addEventListener('click', function () {
   popup.classList.remove('popup_opened');
})

popupButtonExit.addEventListener('click', function () {
    popup.classList.add('popup_opened');
})