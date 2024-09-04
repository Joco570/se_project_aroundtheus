// Function to check input validity
function checkInputValidity(inputElement, errorElement, config) {
  if (inputElement.validity.valueMissing) {
    showInputError(
      inputElement,
      errorElement,
      "Please fill out this field.",
      config
    );
  } else if (inputElement.validity.tooShort) {
    showInputError(
      inputElement,
      errorElement,
      `Please lengthen this text to ${inputElement.minLength} characters or more.`,
      config
    );
  } else if (
    inputElement.validity.typeMismatch &&
    inputElement.type === "url"
  ) {
    showInputError(
      inputElement,
      errorElement,
      "Please enter a valid URL.",
      config
    );
  } else {
    hideInputError(inputElement, errorElement, config);
  }
}

// Function to show input error with specific styles and message
function showInputError(inputElement, errorElement, errorMessage, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// Function to hide input error and reset styles
function hideInputError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

// Function to toggle the save button state
function toggleSaveButtonState(form, button, config) {
  if (form.checkValidity()) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}

// Function to add validation event listeners to forms
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    const inputElements = form.querySelectorAll(config.inputSelector);
    const saveButton = form.querySelector(config.submitButtonSelector);

    inputElements.forEach((inputElement) => {
      const errorElement = form.querySelector(`#${inputElement.id}-error`);

      inputElement.addEventListener("input", () => {
        checkInputValidity(inputElement, errorElement, config);
        toggleSaveButtonState(form, saveButton, config);
      });
    });
  });
}

// Enable validation with the specified configuration
enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});
