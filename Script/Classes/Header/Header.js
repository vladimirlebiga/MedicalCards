import Button from "../Button/Button.js";
import api from "../API/API.js";

class Header {
  constructor() {
    this.header = document.createElement("header");
  }

  renderHeader() {
    this.header.className = "header";
    const container = document.createElement("div");
    container.className = "container";
    const nav = document.createElement("div");
    nav.className = "nav";
    const img = document.createElement("img");
    img.src = "./Content/IMG/new_logo_med.jpg";
    img.className = "logo--img";
    const headerButton = !api.token
      ? new Button().renderButton("header")
      : new Button().renderButton("createCard");
    const anchor = document.createElement("a");
    // const btnWraper = document.createElement("div");

    // this.parent.append(this.header);
    this.header.append(container);
    container.append(nav);
    nav.append(anchor, headerButton);
    anchor.append(img);
    return this.header;
  }
}

export default new Header();

// #00ACDC
