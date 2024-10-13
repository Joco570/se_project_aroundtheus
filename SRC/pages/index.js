import { initialCards, validationSettings } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

// Elements
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const cardListElement = document.querySelector(".cards__list");
const previewModal = document.querySelector("#Preview-Modal");
const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];

// Object for storing form validators
const formValidators = {};

// Enable validation for all forms
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

// Function to handle image click and open preview modal
function handleImageClick(name, link) {
  popupWithImage.open({ name, link });
}

// Create card function
function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.generateCard();
}

// Universal render function to append or prepend card
function renderCard(item, method = "addItem") {
  const cardElement = createCard(item);
  cardSection[method](cardElement);
}

// Section for managing cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list"
);
cardSection.renderItems();

// Event handler for adding a new card
function handleAddCardSubmit(data) {
  const newCardData = {
    name: data.title,
    link: data.link,
  };

  // Disable the submit button after form submission but before rendering
  formValidators[cardForm.getAttribute("name")].disableButton();

  renderCard(newCardData);
  popupWithAddCardForm.close();
}

// Event handler for profile form submission
function handleProfileFormSubmit(data) {
  userInfo.setUserInfo({ name: data.title, job: data.description });
  popupWithProfileForm.close();
}

// Popup instances
const popupWithProfileForm = new PopupWithForm(
  "#Profile-Edit-Modal",
  handleProfileFormSubmit
);
const popupWithAddCardForm = new PopupWithForm(
  "#Profile-Add-Modal",
  handleAddCardSubmit
);
const popupWithImage = new PopupWithImage("#Preview-Modal");

// Attach event listeners for popups
popupWithProfileForm.setEventListeners();
popupWithAddCardForm.setEventListeners();
popupWithImage.setEventListeners();

// UserInfo instance for managing profile information
const userInfo = new UserInfo({
  nameSelector: ".js-profile-title",
  jobSelector: ".js-profile-description",
});

// Edit Profile Modal: Clear validation errors and populate form with user info when opened
profileEditButton.addEventListener("click", () => {
  popupWithProfileForm.open();

  const userData = userInfo.getUserInfo();
  profileForm.elements["title"].value = userData.name;
  profileForm.elements["description"].value = userData.job;

  formValidators[profileForm.getAttribute("name")].resetValidation();
  formValidators[profileForm.getAttribute("name")].disableButton();
});

// Add Card Modal
addNewCardButton.addEventListener("click", () => {
  popupWithAddCardForm.open();
});
