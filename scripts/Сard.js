
export class Card {
    constructor (data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardTemplate = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardTemplate;
    }

    generateCard () {
        this._element = this._getTemplate();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__image').alt = this._name;
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners () {
        this._element.querySelector('.element__button-like').addEventListener('click', () => {
            this._handleClickLike();
          });
 
        this._element.querySelector('.element__button-trash').addEventListener('click', () => {
            this._handleDeleteButtonClick();
        })
        
        this._element.querySelector('.element__image').addEventListener('click', () => {
            const popupImages = document.querySelector('#popup-images');
            const popupCardImageFull = popupImages.querySelector('.popup__image');
            const popupImageHeading = popupImages.querySelector('.popup__heading');
            popupCardImageFull.src = this._link;
            popupCardImageFull.alt = this._name;
            popupImageHeading.textContent = this._name;
            popupImages.classList.add('popup_opened');
        })
    }

    _handleClickLike () {
        this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active'); 
    }

    _handleDeleteButtonClick () {
        this._element.querySelector('.element__button-trash').closest('.element').remove();
    }

}


export class CreateCard extends Card {
    constructor (name, link, templateSelector) {
        super(templateSelector);
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
    }

    generateCard () {
        this._element = super._getTemplate();
        super._setEventListeners();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__image').alt = this._name;
        return this._element;
    }
}

