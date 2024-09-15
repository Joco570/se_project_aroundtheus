export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._settings.errorClass);
    } else {
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._settings.errorClass);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._toggleButtonState();
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
    });
    this._toggleButtonState();
  }
}
