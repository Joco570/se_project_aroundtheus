// Configuration object for validation
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "invalid",
  errorClass: "modal__input-error_active",
};

// Function to enable validation for all forms
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

// Function to set event listeners for each form
function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, form, config);
      toggleSaveButtonState(form, button, config);
    });
  });

  toggleSaveButtonState(form, button, config);
}

// Function to check input validity
function checkInputValidity(inputElement, form, config) {
  const errorElement = form.querySelector(`#${inputElement.id}-error`);

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

// Function to show input error
function showInputError(inputElement, errorElement, errorMessage, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// Function to hide input error
function hideInputError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

// Function to toggle save button state
function toggleSaveButtonState(form, button, config) {
  if (!form.checkValidity()) {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  }
}

// Initialize validation
enableValidation(config);
