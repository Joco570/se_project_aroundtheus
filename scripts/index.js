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
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Elements for validation
const profileTitleInput = profileForm.elements["title"];
const profileDescriptionInput = profileForm.elements["description"];
const saveButton = profileForm.querySelector(".modal__save");
const titleError = document.querySelector("#profile-title-input-error");
const descriptionError = document.querySelector(
  "#profile-description-input-error"
);
// Add Card Form elements for validation
const cardTitleInput = cardForm.elements["title"];
const cardLinkInput = cardForm.elements["description"];
const cardSaveButton = cardForm.querySelector(".modal__save");
const cardTitleError = document.querySelector("#modal-add-title-error");
const cardLinkError = document.querySelector("#modal-add-link-error");

// Universal functions
function openPopup(popup) {
  popup.classList.add("modal_opened");

  // Add esc key handler only when a modal is opened
  document.addEventListener("keydown", handleEscClose);

  // Reset all input fields and error messages for the modal being opened
  const form = popup.querySelector("form");
  if (form) {
    form.reset();

    const inputs = form.querySelectorAll(".modal__input");
    const errorMessages = form.querySelectorAll(".modal__input-error");

    inputs.forEach((input) => {
      const errorElement = form.querySelector(`#${input.id}-error`);
      hideInputError(input, errorElement, config);
    });

    const saveButton = form.querySelector(".modal__save");
    toggleSaveButtonState(form, saveButton, config);
  }
}

function closePopUp(modal) {
  modal.classList.remove("modal_opened");

  // Remove esc key handler when the modal is closed
  document.removeEventListener("keydown", handleEscClose);
}

// Function to close the popup on ESC key press
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closePopUp(openModal);
    }
  }
}

// Function to close the popup when clicking on the overlay
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closePopUp(evt.target);
  }
}

// Attach event listeners for closing modals
modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closePopUp(button.closest(".modal"));
  });
});

function createCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;

  // Set up event listeners
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    openPreviewModal(cardData);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  return cardElement;
}

function openPreviewModal(cardData) {
  previewImage.src = cardData.link;
  previewImage.alt = cardData.name;
  previewCaption.textContent = cardData.name;
  openPopup(previewModal);
}

// Universal function to render a card
function renderCard(item, method = "prepend") {
  const cardElement = createCardElement(item);
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
  const linkValue = cardForm.elements["description"].value;
  if (!titleValue || !linkValue) {
    console.log("Both title and link are required.");
    return;
  }
  const newCardData = {
    name: titleValue,
    link: linkValue,
  };

  renderCard(newCardData);

  cardForm.reset();

  closePopUp(profileAddModal);
}

// Attach event listeners to the forms
profileForm.addEventListener("submit", handleProfileEditSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

profileEditButton.addEventListener("click", () => {
  openPopup(profileEditModal);
  profileForm.elements["title"].value = profileTitle.textContent;
  profileForm.elements["description"].value = profileDescription.textContent;
  toggleSaveButtonState(profileForm, saveButton, config);
});

addNewCardButton.addEventListener("click", () => {
  openPopup(profileAddModal);

  // Reset the form inputs and errors
  cardForm.reset();

  // Reset styles for inputs and error messages
  hideInputError(cardTitleInput, cardTitleError, config);
  hideInputError(cardLinkInput, cardLinkError, config);

  // Ensure spacing around save button is reset
  cardSaveButton.classList.add("modal__save_disabled");
  cardSaveButton.disabled = true;

  // Run validation to set button state on opening
  toggleSaveButtonState(cardForm, cardSaveButton, config);
});

// Add event listener to document for ESC key
document.addEventListener("keydown", handleEscClose);

// Add event listener to all modals for overlay click
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", handleOverlayClick);
});

// Initialize Cards
initialCards.forEach((cardData) => {
  renderCard(cardData, "append");
});
