import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

console.log("index.js loaded"); // Debugging Line

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
const modalCloseButtons = document.querySelectorAll(".modal__close");
const profileTitle = document.querySelector(".js-profile-title");
const profileDescription = document.querySelector(".js-profile-description");
const cardListElement = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");
const previewModal = document.querySelector("#Preview-Modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector("#modal-caption");

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

// Create a FormValidator instance for each form
const profileFormValidator = new FormValidator(validationSettings, profileForm);
const cardFormValidator = new FormValidator(validationSettings, cardForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

console.log("FormValidators initialized"); // Debugging Line

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

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closePopUp(openModal);
    }
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closePopUp(evt.target);
  }
}

function handleImageClick(name, link) {
  console.log("Image clicked:", name, link); // Debugging Line
  previewImage.src = link;
  previewImage.alt = name;
  previewCaption.textContent = name;
  openPopup(previewModal);
}

// Function to render a card
function renderCard(item, method = "prepend") {
  console.log("Rendering card:", item); // Debugging Line
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
  const linkValue = cardForm.elements["link"].value; // Updated name

  const newCardData = {
    name: titleValue,
    link: linkValue,
  };

  renderCard(newCardData);

  // Clear the inputs only after submitting a card
  cardForm.reset();
  cardFormValidator.resetValidation();
  closePopUp(profileAddModal);
}

// Attach event listeners to the forms
profileForm.addEventListener("submit", handleProfileEditSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

profileEditButton.addEventListener("click", () => {
  openPopup(profileEditModal);

  // Set the form fields with current profile data
  profileForm.elements["title"].value = profileTitle.textContent;
  profileForm.elements["description"].value = profileDescription.textContent;
});

addNewCardButton.addEventListener("click", () => {
  openPopup(profileAddModal);
});

// Initialize Cards
initialCards.forEach((cardData) => {
  renderCard(cardData, "append");
});
