import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

console.log("index.js loaded");

// Data
const initialCards = [
  {
    name: `Yosemite Valley`,
    link: `https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg`,
  },
  {
    name: `Lake Louise`,
    link: `https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg`,
  },
  {
    name: `Bald Mountains`,
    link: `https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg`,
  },
  {
    name: `Latemar`,
    link: `https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg`,
  },
  {
    name: `Vanoise National Park`,
    link: `https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg`,
  },
  {
    name: `Lago di Braies`,
    link: `https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg`,
  },
];

// Elements
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#Profile-Edit-Modal");
const profileAddModal = document.querySelector("#Profile-Add-Modal");
const profileTitle = document.querySelector(".js-profile-title");
const profileDescription = document.querySelector(".js-profile-description");
const cardListElement = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");
const previewModal = document.querySelector("#Preview-Modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = document.querySelector("#modal-caption");

// Accessing forms using document.forms
const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];

// Validation settings
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_visible",
};

// Object for storing form validators
const formValidators = {};

// Enable validation function for all forms
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);

    // Use the name attribute of the form as the key
    const formName = formElement.getAttribute("name");

    // Store the validator instance using the form's name
    formValidators[formName] = validator;

    // Enable validation for this form
    validator.enableValidation();
  });
};

// Initialize validation
enableValidation(validationSettings);

console.log("FormValidators initialized");

// Universal functions
function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
  popup.addEventListener("mousedown", handleOverlayClick);
}

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
  modal.removeEventListener("mousedown", handleOverlayClick);
}

// Event listener to close modals by pressing ESC
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closePopUp(openModal);
    }
  }
}

// Event listener to close modals by clicking on the overlay
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closePopUp(evt.target);
  }
}

// Function to open preview modal
function handleImageClick(name, link) {
  previewImage.src = link;
  previewImage.alt = name;
  previewCaption.textContent = name;
  openPopup(previewModal);
}

// Function to render a card
function renderCard(item, method = "prepend") {
  console.log("Rendering card:", item);
  const card = new Card(item, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  cardListElement[method](cardElement);
}

// Event Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileForm.elements["title"].value;
  profileDescription.textContent = profileForm.elements["description"].value;
  closePopUp(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();

  const titleValue = cardForm.elements["title"].value;
  const linkValue = cardForm.elements["link"].value;

  const newCardData = {
    name: titleValue,
    link: linkValue,
  };

  renderCard(newCardData);

  // Clear the inputs only after submitting a card
  cardForm.reset();

  // Disable the button after submission
  formValidators[cardForm.getAttribute("name")].disableButton();

  // Fully reset validation and interaction state after submission
  formValidators[cardForm.getAttribute("name")].resetOnSubmit();

  closePopUp(profileAddModal);
}

// Attach event listeners to the forms
profileForm.addEventListener("submit", handleProfileEditSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

// Edit Profile Modal: Always clear validation errors and reset interaction flags when opened
profileEditButton.addEventListener("click", () => {
  openPopup(profileEditModal);

  // Set the form fields with current profile data
  profileForm.elements["title"].value = profileTitle.textContent;
  profileForm.elements["description"].value = profileDescription.textContent;

  // Always reset validation for the Edit Profile modal
  formValidators[profileForm.getAttribute("name")].resetValidation();

  // Disable the submit button until the form is valid
  formValidators[profileForm.getAttribute("name")].disableButton();
});

// Add Card Modal: Do not reset validation when reopening (retain errors)
addNewCardButton.addEventListener("click", () => {
  openPopup(profileAddModal);
  // Do not reset validation to retain error states on reopening
});

// Event Listeners for Close Buttons
const modalCloseButtons = document.querySelectorAll(".modal__close");
modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closePopUp(modal);
  });
});

// Initialize Cards
initialCards.forEach((cardData) => {
  renderCard(cardData, "append");
});
