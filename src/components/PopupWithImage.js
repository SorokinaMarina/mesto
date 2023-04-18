import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor (popupSelector, {name, link}) {
        super(popupSelector);
        this._name = name;
        this._link = link;
    }

    open (cardImage, cardHeading) {
        super.open();
        cardImage.src = this._link;
        cardImage.alt = this._name;
        cardHeading.textContent = this._name;
    }
}
