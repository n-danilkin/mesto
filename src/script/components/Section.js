export default class Section {
  constructor(containerSelector) {    
    this._container = document.querySelector(containerSelector);
  }
  addItem(element) {    
    this._container.append(element);
  }
  renderItems({ data, renderer }) {
    data.forEach((item) => {
      renderer(item)
    });
  }
}