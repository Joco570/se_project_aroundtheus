// Function to show input error
function showInputError(inputElement, errorElement, errorMessage, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// Function to hide input error
function hideInputError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

// Function to check input validity
function checkInputValidity(inputElement, config) {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
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
      `Please lengthen this text to ${inputElement.minLength} characters or more. You are currently using only ${inputElement.value.length} characters.`,
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

// Function to toggle the state of the submit button
function toggleButtonState(inputList, buttonElement, config) {
  const isValid = inputList.every(
    (inputElement) => inputElement.validity.valid
  );
  if (isValid) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  }
}

// Function to set event listeners on form inputs
function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

// Function to enable validation on all forms
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

// Exporting the functions to be used in other modules like index.js
export {
  showInputError,
  hideInputError,
  checkInputValidity,
  toggleButtonState,
  setEventListeners,
  enableValidation,
};
