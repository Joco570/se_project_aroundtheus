import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  open(data) {
    const { name, link } = data;
    const popupImage = this._popupElement.querySelector(".modal__image");
    const popupCaption = this._popupElement.querySelector("#modal-caption");

    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;

    super.open();
  }
}
