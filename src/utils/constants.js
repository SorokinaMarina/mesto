export const initialCards = [
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


export const editButton = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('#popup-profile');
export const photoPopup = document.querySelector('#popup-add-photo');
export const profileEditAvatar = document.querySelector('.profile__avatar-wrapper');
export const popupContainerWithForm = document.querySelector('.popup__container');
export const profileName = '.profile__name';
export const profileProfession = '.profile__profession';
export const profileAvatar = '.profile__avatar';
export const photoButton = document.querySelector('.profile__add-button');
export const photoPopupContainer = document.querySelector('#popup__container-add-photo');
export const inputPictireTitle = photoPopup.querySelector('.popup__input_type_title');
export const inputLink = photoPopup.querySelector('.popup__input_type_link');
export const elements = '.elements';
export const popupImages = document.querySelector('#popup-images');
export const popupCardImageFull = popupImages.querySelector('.popup__image');
export const popupImageHeading = popupImages.querySelector('.popup__heading');
export const popupAvatar = document.querySelector('#popup__container-avatar');
