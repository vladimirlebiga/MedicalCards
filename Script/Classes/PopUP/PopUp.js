import { popupconfig } from "./popupconfig.js";

class PopUp {
  constructor() {
    this.popUp = document.createElement("div");
    this.popUpText = document.createElement("p");
  }
  renderPopUp(id) {
    const { title, className, icon } = popupconfig[id];
    this.popUpText.textContent = title;
    this.popUp.className = className;
    this.popUp.id = id;
    this.id = `#${id}`;
    this.popUp.append(this.popUpText, icon);
    this.removePopUp();
    return this.popUp;
  }
  removePopUp() {
    setTimeout(() => {
      document.querySelector(this.id).remove();
    }, 3000);
  }
}

export default PopUp;
