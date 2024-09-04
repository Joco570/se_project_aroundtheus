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
  checkInputValidity(cardTitleInput, cardTitleError);
  toggleSaveButtonState(cardForm, cardSaveButton);
});

cardLinkInput.addEventListener("input", () => {
  checkInputValidity(cardLinkInput, cardLinkError);
  toggleSaveButtonState(cardForm, cardSaveButton);
});

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
