import { mainconfig } from "./mainconfig.js";

class Main {
  constructor() {
    this.main = document.createElement("main");
  }

  render(id) {
    const { id: elemID, element, text } = mainconfig[id];
    element.id = elemID;
    element.textContent = text;
    this.main.append(element);
    return this.main;
  }
}

export default Main;
