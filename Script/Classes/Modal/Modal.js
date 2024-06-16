import Form from "../Form/Form.js";
import { modalConfig } from "./modalconfig.js";
import api from "../API/API.js";
import Visit from "../Visit/Visit.js";
import VisitCardiologist from "../VisitCardiologist/VisitCardiologist.js";
import VisitDentist from "../VisitDentist/VisitDentist.js";
import VisitTherapist from "../VisitTherapist/VisitTherapist.js";

class Modal {
  constructor() {
    this.modal = document.createElement("div");
  }

  renderModal(id, cardId) {
    const { title, className } = modalConfig[id];
    this.modal.className = className;
    // create h2 for title and add this to this modal
    // this.modal.title = title;
    //
    const content = document.createElement("div");
    content.className = "modal-content";
    const close = document.createElement("div");
    close.className = "close";
    close.textContent = "X";
    close.addEventListener("click", this.handleClose.bind(this));
    this.modal.addEventListener("click", this.handleClose.bind(this));
    content.append(close);
    this.modal.append(content);
    if (id === "showMore") {
      api.getByID(cardId).then((card) => {
        const {
          firstName,
          lastName,
          target,
          description,
          priority,
          doctor,
          dateVisit,
          ...rest
        } = card;
        const visit = new Visit().renderShowMore({
          firstName,
          lastName,
          target,
          description,
          priority,
          doctor,
          dateVisit,
        });
        content.append(visit);
        switch (card.doctor) {
          case "dentist":
            const visitDentist = new VisitDentist().renderShowMore(rest);
            content.append(visitDentist);
            break;
          case "therapist":
            const visitTherapist = new VisitTherapist().renderShowMore(rest);
            content.append(visitTherapist);
            break;
          case "cardiologist":
            const visitCardiologist = new VisitCardiologist().renderShowMore(
              rest
            );
            content.append(visitCardiologist);
            break;
          default:
            "";
        }
      });
      return this.modal;
    }
    if (id !== "showMore") {
      const form = new Form().renderForm(id, cardId);
      content.append(form);
      return this.modal;
    }
    // if (id === "updateCard") {
    // }
  }

  handleClose(e) {
    if (
      e.target.classList.contains("close") ||
      e.target.classList.contains("modal")
    ) {
      this.modal.remove();
    }
  }
}

export default Modal;
