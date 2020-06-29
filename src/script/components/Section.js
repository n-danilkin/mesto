export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }
  
  renderItems() {
    console.log(this._renderedItems)
    this._renderedItems.forEach((item) => {
      this._renderer(item)
      console.log(item)
    });
  }
}