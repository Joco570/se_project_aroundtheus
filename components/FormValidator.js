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
    // Store interaction status for each input
    this._isInputInteracted = new Map();
    this._isFirstOpen = true; // Track if the modal is opened for the first time
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
    const isInteracted = this._isInputInteracted.get(inputElement);

    // If it's the first time opening, don't show errors until interaction
    if (!inputElement.validity.valid && isInteracted) {
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
      // Initialize the interaction flag as false for each input
      this._isInputInteracted.set(inputElement, false);

      inputElement.addEventListener("input", () => {
        // Mark the input as interacted when the user types
        this._isInputInteracted.set(inputElement, true);

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
      const errorElement = this._formElement.querySelector(
        `#${inputElement.id}-error`
      );

      // Clear the error message and the input error class
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._settings.errorClass);

      // Reset the interaction flag for each input (specific to Add Card behavior)
      this._isInputInteracted.set(inputElement, false);
    });

    // Disable the submit button until valid input is provided
    this._toggleButtonState();
  }

  // New method to disable the submit button
  disableButton() {
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  // Call this on successful submit to reset the modal fully
  resetOnSubmit() {
    this.resetValidation();
    this._isFirstOpen = true;
  }
}
