import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._formElement = this._popupElement.querySelector(".modal__form");
  }

  _getInputValues() {
    const inputList = this._formElement.querySelectorAll(".modal__input");
    const inputValues = {};

    inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputData = this._getInputValues();
      this._submitCallback(inputData);
      this.close();
      this._formElement.reset();
    });
  }

  open() {
    super.open();
    this._formElement.reset();
  }
}
