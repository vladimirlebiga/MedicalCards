import { selectconfig } from "./selectconfig.js";

class Select {
  constructor() {
    this.select = document.createElement("select");
  }

  render(id, card) {
    const { options, name, value, label, onchange } = selectconfig[id];
    const newLabel = document.createElement("label");
    newLabel.htmlFor = name;
    newLabel.textContent = label;
    this.select.id = name;
    this.select.name = name;
    this.select.addEventListener("change", onchange);

    options.forEach((item, i) => {
      const option = document.createElement("option");
      option.textContent = item;

      if (i > 0) {
        option.value = value[i];
      }
      if (!i) {
        option.disabled = true;
      }
      this.select.append(option);
    });

    this.select.value = card ? card[name] : value[0];
    newLabel.append(this.select);
    return newLabel;
  }
}

export default Select;
