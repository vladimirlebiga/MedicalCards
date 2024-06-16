import Form from "../Form/Form.js";

class Searchbar {
  constructor() {
    this.section = document.createElement("section");
  }

  renderSearchbar() {
    const form = new Form().renderForm("search");
    this.section.append(form);
    return this.section;
  }
}
export default new Searchbar();
