export class Card {
    constructor (name, link, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._image;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        return document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
    }


    generateCard () {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__image');
        this._image.src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        this._image.alt = this._name;
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
        
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }

    _handleClickLike () {
        this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active'); 
    }

    _handleDeleteButtonClick () {
        this._element.querySelector('.element__button-trash').closest('.element').remove();
    }

}



