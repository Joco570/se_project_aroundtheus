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

/*Elements*/
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#Profile-Edit-Modal");
const profileAddModal = document.querySelector("#Profile-Add-Modal");
const modalCloseButtons = document.querySelectorAll(".modal__close");
const profileTitle = document.querySelector(".js-profile-title");
const profileDescription = document.querySelector(".js-profile-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListElement = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");

/*Functions*/
function closePopUp(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");

  cardTitleElement.textContent = cardData.name;
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  return cardElement;
}

/*Event Handlers*/
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

/*Event Listeners*/
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const modal = e.target.closest(".modal");
    closePopUp(modal);
  });
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
});

addNewCardButton.addEventListener("click", () => {
  profileAddModal.classList.add("modal_opened");
});
