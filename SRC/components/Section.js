export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Render all items on page load
  renderItems() {
    this._items.forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element); // Add each element to the container
    });
  }

  // Add a single item to the container
  addItem(element) {
    this._container.prepend(element); // Adds the new card at the start of the container
  }
}
