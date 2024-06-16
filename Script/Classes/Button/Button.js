import { buttonConfig } from "./buttonconfig.js";

class Button {
  constructor() {
    this.button = document.createElement("button");
  }

  renderButton(id) {
    const { title, onclick, className, type } = buttonConfig[id];
    this.button.className = className;
    this.button.type = type || "button";
    this.button.textContent = title;
    this.button.addEventListener("click", onclick);
    return this.button;
  }
}

export default Button;
