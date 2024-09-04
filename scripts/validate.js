// Function to check input validity
function checkInputValidity(inputElement, errorElement) {
  if (inputElement.validity.valueMissing) {
    showInputError(inputElement, errorElement, "Please fill out this field.");
  } else if (inputElement.validity.tooShort) {
    showInputError(
      inputElement,
      errorElement,
      `Please lengthen this text to ${inputElement.minLength} characters or more.`
    );
  } else if (
    inputElement.validity.typeMismatch &&
    inputElement.type === "url"
  ) {
    showInputError(inputElement, errorElement, "Please enter a valid URL.");
  } else {
    hideInputError(inputElement, errorElement);
  }
}

// Function to show input error by adding a class
function showInputError(inputElement, errorElement, errorMessage) {
  inputElement.classList.add("invalid"); // Add the invalid class to show the red border
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__input-error_active"); // Add class to display error message

  const wrapper = inputElement.closest(".modal__input-wrapper");
  if (errorMessage.length > 40) {
    // Arbitrary length check for long error messages
    wrapper.classList.add("error-visible");
  } else {
    wrapper.classList.remove("error-visible");
  }
}

// Function to hide input error by removing the class
function hideInputError(inputElement, errorElement) {
  inputElement.classList.remove("invalid"); // Remove the invalid class to hide the red border
  errorElement.textContent = "";
  errorElement.classList.remove("modal__input-error_active"); // Remove class to hide error message

  const wrapper = inputElement.closest(".modal__input-wrapper");
  wrapper.classList.remove("error-visible");
}

// Function to toggle the save button state
function toggleSaveButtonState(form, button) {
  if (form.checkValidity()) {
    button.classList.remove("modal__save_disabled");
    button.disabled = false;
  } else {
    button.classList.add("modal__save_disabled");
    button.disabled = true;
  }
}

// Event listeners for inputs in Profile Edit Form
profileTitleInput.addEventListener("input", () => {
  checkInputValidity(profileTitleInput, titleError);
  toggleSaveButtonState(profileForm, saveButton);
});

profileDescriptionInput.addEventListener("input", () => {
  checkInputValidity(profileDescriptionInput, descriptionError);
  toggleSaveButtonState(profileForm, saveButton);
});

// Event listeners for inputs in Add Card Form
cardTitleInput.addEventListener("input", () => {
  cardTitleInput.classList.add("invalid"); // Start showing validation styles after typing
  checkInputValidity(cardTitleInput, cardTitleError);
  toggleSaveButtonState(cardForm, cardSaveButton);
});

cardLinkInput.addEventListener("input", () => {
  cardLinkInput.classList.add("invalid"); // Start showing validation styles after typing
  checkInputValidity(cardLinkInput, cardLinkError);
  toggleSaveButtonState(cardForm, cardSaveButton);
});
