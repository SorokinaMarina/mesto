import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor (popupSelector, {cardImage, cardHeading}) {
        super(popupSelector);
        this._cardImage = cardImage;
        this._cardHeading = cardHeading;
    }

    open (name, link) {
        super.open();
        this._cardImage.src = link;
        this._cardImage.alt = name;
        this._cardHeading.textContent = name;
    }
}
