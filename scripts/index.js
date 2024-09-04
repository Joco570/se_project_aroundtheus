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

// Function to show input error with specific styles and message
function showInputError(inputElement, errorElement, errorMessage) {
  inputElement.style.borderBottomColor = "rgba(255, 0, 0, 1)";
  errorElement.textContent = errorMessage;
  errorElement.style.color = "rgba(255, 0, 0, 1)";
  errorElement.style.fontFamily = "'Inter', sans-serif";
  errorElement.style.fontWeight = "400";
  errorElement.style.fontSize = "12px";
  errorElement.style.lineHeight = "14.52px";

  // Specific margin adjustments for Add Card modal inputs
  if (inputElement.id === "modal-add-title") {
    inputElement.style.marginTop = "5px";
    inputElement.style.marginBottom = "13px";
    errorElement.style.marginTop = "5px";
    errorElement.style.marginBottom = "13px";
  } else if (inputElement.id === "modal-add-link") {
    inputElement.style.marginBottom = "0";
    errorElement.style.marginTop = "5px";
    errorElement.style.marginBottom = "31.34px";
  } else {
    errorElement.style.marginTop = "5px";
  }
}

// Function to hide input error and reset styles
function hideInputError(inputElement, errorElement) {
  inputElement.style.borderBottomColor = "rgba(0, 0, 0, 0.2)";
  errorElement.textContent = "";
  // Reset margins
  inputElement.style.marginTop = "";
  inputElement.style.marginBottom = "";
  errorElement.style.marginTop = "";
  errorElement.style.marginBottom = "";
}

// Function to open the popup and add ESC key event listener
function openPopup(popup) {
  popup.classList.add("modal_opened");
  // Add ESC key event listener
  document.addEventListener("keydown", handleEscClose);
}

// Function to close the popup and remove ESC key event listener
function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  // Remove ESC key event listener
  document.removeEventListener("keydown", handleEscClose);
}

// Function to handle ESC key press
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closePopUp(openModal);
    }
  }
}

// Function to handle overlay click
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closePopUp(evt.target);
  }
}

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
});

addNewCardButton.addEventListener("click", () => {
  openPopup(profileAddModal);

  // Reset the form inputs and errors
  cardForm.reset();

  // Reset styles for inputs and error messages
  hideInputError(cardTitleInput, cardTitleError);
  hideInputError(cardLinkInput, cardLinkError);

  // Ensure spacing around save button is reset
  cardSaveButton.classList.add("modal__save_disabled");
  cardSaveButton.disabled = true;

  // Reset input margins to default
  cardTitleInput.style.marginBottom = "29.74px";
  cardLinkInput.style.marginBottom = "48px";
});

// Attach event listeners for closing modals
modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closePopUp(button.closest(".modal"));
  });
});

// Add event listener to document for ESC key
// It will be added and removed in `openPopup` and `closePopUp` functions

// Add event listener to all modals for overlay click
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", handleOverlayClick);
});

// Initialize Cards
initialCards.forEach((cardData) => {
  renderCard(cardData, "append");
});
