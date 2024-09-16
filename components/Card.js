export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  // Private method to get the card template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  // Method to initialize class fields for DOM elements
  _initializeFields() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._trashButton = this._element.querySelector(".card__delete-button");
  }

  // Private method to set event listeners
  _setEventListeners() {
    this._trashButton.addEventListener("click", () => this._handleDeleteCard());
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );
  }

  // Private method to handle card deletion
  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Private method to handle like button toggle
  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  // Public method to generate the card and attach data
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._initializeFields();
    this._setEventListeners();

    return this._element;
  }
}
