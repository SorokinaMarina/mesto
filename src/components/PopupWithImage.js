import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor (popupSelector, {imageFull, imageHeading, name, link}) {
        super(popupSelector);
        this._imageFull = imageFull;
        this._imageHeading = imageHeading;
        this._name = name;
        this._link = link;
    }

    open () {
        super.open();
        this._imageFull.src = this._link;
        this._imageFull.alt = this._name;
        this._imageHeading.textContent = this._name;
    }
}
