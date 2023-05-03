export class Card {
    constructor (data, templateSelector, handleCardClick, cardId, {handleDeleteCard, addLike, deleteLike} ) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._image;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._userId = cardId;
        this._ownerId = data.owner._id;
        this._cardId = data._id;
        this._likes = data.likes;
        this._addLike = addLike;
        this._deleteLike = deleteLike;
    }

    like() {
        this._likeButton.classList.add('element__button-like_active');
    }

    dislike () {
        this._likeButton.classList.remove('element__button-like_active');
    }

    _userLike () {
        this._likes.forEach(element => {
            if (element._id === this._userId) {
                this._addLike();
            } else {
                this._deleteLike();
            }
        })
    }

    likesCount (res) {
        this._likesCount.textContent = res.likes.length;
    }

    //Функция, возвращающая разметку
    _getTemplate() {
        return document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
    }

    //Функция, генерирующая карточку
    generateCard () {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__image');
        this._image.src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        this._image.alt = this._name;

        this._deleteButtonTrash = this._element.querySelector('.element__button-trash');
        if(this._userId !== this._ownerId) {
            this._deleteButtonTrash.classList.add('element__button-trash_inactive');
        }

        this._likeButton = this._element.querySelector('.element__button-like');
        this._likesCount = this._element.querySelector('.element__like-length');
        this._likesCount.textContent = this._likes.length;

        this._userLike();
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners () {
        this._likeButton.addEventListener('click', () => {
           if(this._likeButton.classList.contains('element__button-like_active')){
            this._deleteLike();
           } else {
            this._addLike();
           }
          });
 
          this._deleteButtonTrash.addEventListener('click', () => {
            this._handleDeleteCard(this._cardId, this._element);
        })
        
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }

    _handleClickLike () {
        this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active'); 
    }

}



