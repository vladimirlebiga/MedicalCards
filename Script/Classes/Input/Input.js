import { inputconfig } from "./inputconfig.js";

class Input {
  constructor() {
    this.input = document.createElement("input");
    this.label = document.createElement("label");
  }

  render(id, card) {
    this.input.className = "input";
    const { placeholder, name, type, label, req } = inputconfig[id];

    this.input.placeholder = placeholder;
    this.input.name = name;
    this.input.type = type;
    this.label.textContent = label;
    this.label.append(this.input);
    this.input.id = name;
    this.label.htmlFor = name;
    this.input.required = req;
    if (card && card[name]) {
      if (type === "date") {
        const date = new Date(card[name]);
        const formattedDate = date.toISOString().substring(0, 10); // Format date to YYYY-MM-DD
        this.input.value = formattedDate;
      } else {
        this.input.value = card[name];
      }
    }

    return this.label;
  }
}

export default Input;
