import { textareaconfig } from "./textareaconfig.js";

class Textarea {
  constructor() {
    (this.textarea = document.createElement("textarea")),
      (this.label = document.createElement("label"));
  }

  render(id, card) {
    this.textarea.className = "textarea";

    const { placeholder, name, type, label } = textareaconfig[id];
    this.textarea.placeholder = placeholder;
    this.textarea.name = name;
    this.label.textContent = label;
    this.label.append(this.textarea);
    this.textarea.id = name;
    this.label.htmlFor = name;
    this.textarea.required = true;
    if (card) {
      this.textarea.value = card[name];
    }
    return this.label;
  }
}

export default Textarea;
