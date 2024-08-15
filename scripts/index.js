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

// Functions
function closePopUp(modal) {
  modal.classList.remove("modal_opened");
}

function createCardElement(cardData) {
  // Create card elements
  const cardElement = document.createElement("li");
  cardElement.classList.add("card");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("card__delete-button");
  deleteButton.type = "button";

  const cardImageElement = document.createElement("img");
  cardImageElement.classList.add("card__image");
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;

  const cardDescriptionElement = document.createElement("div");
  cardDescriptionElement.classList.add("card__description");

  const cardTitleElement = document.createElement("h2");
  cardTitleElement.classList.add("card__title");
  cardTitleElement.textContent = cardData.name;

  const likeButton = document.createElement("button");
  likeButton.classList.add("card__like-button");
  likeButton.type = "button";

  // Append elements
  cardDescriptionElement.append(cardTitleElement, likeButton);
  cardElement.append(deleteButton, cardImageElement, cardDescriptionElement);

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    openPreviewModal(cardData);
  });

  return cardElement;
}

function openPreviewModal(cardData) {
  previewImage.src = cardData.link;
  previewImage.alt = cardData.name;
  previewCaption.textContent = cardData.name;
  previewModal.classList.add("modal_opened");
}

function addLikeButtonListeners() {
  const likeButtons = document.querySelectorAll(".card__like-button");
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });
  });
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

  const cardElement = createCardElement(newCardData);
  cardListElement.prepend(cardElement);

  // Reset form inputs
  cardForm.reset();

  // Add like button listeners to the new cards
  addLikeButtonListeners();

  closePopUp(profileAddModal);
}

// Attach event listeners to the forms
profileForm.addEventListener("submit", handleProfileEditSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

profileEditButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
});

addNewCardButton.addEventListener("click", () => {
  profileAddModal.classList.add("modal_opened");
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closePopUp(button.closest(".modal"));
  });
});

// Initialize Cards
initialCards.forEach((cardData) => {
  const cardElement = createCardElement(cardData);
  cardListElement.append(cardElement);
});

// Add like button listeners to initial cards
addLikeButtonListeners();
