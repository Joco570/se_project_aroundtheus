import { initialCards, validationSettings } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import "../pages/index.css";

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

// Object for storing form validators
const formValidators = {};

// Enable validation function for all forms
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);

    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;

    validator.enableValidation();
  });
};

// Initialize validation
enableValidation(validationSettings);

// Function to render a card
function renderCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement); // Use Section's method to add the card
}

// Section instance for managing cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      renderCard(item);
    },
  },
  ".cards__list"
);

// Call renderItems once on page load
cardSection.renderItems();

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
  formValidators[cardForm.getAttribute("name")].resetValidation();

  closePopUp(profileAddModal);
}

// Attach event listeners to the forms
profileForm.addEventListener("submit", handleProfileEditSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

// Edit Profile Modal: Always clear validation errors and reset interaction flags when opened
profileEditButton.addEventListener("click", () => {
  openPopup(profileEditModal);

  profileForm.elements["title"].value = profileTitle.textContent;
  profileForm.elements["description"].value = profileDescription.textContent;

  formValidators[profileForm.getAttribute("name")].resetValidation();

  formValidators[profileForm.getAttribute("name")].disableButton();
});

// Add Card Modal: Do not reset validation when reopening (retain errors)
addNewCardButton.addEventListener("click", () => {
  openPopup(profileAddModal);
});

// Event Listeners for Close Buttons
const modalCloseButtons = document.querySelectorAll(".modal__close");
modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closePopUp(modal);
  });
});
