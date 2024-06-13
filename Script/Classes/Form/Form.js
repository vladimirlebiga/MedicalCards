import { formconfig } from "./formconfig.js";
import Input from "../Input/Input.js";
import Button from "../Button/Button.js";
import Select from "../Select/Select.js";
import Textarea from "../Textarea/Textarea.js";
import api from "../API/API.js";
import Visit from "../Visit/Visit.js";
import VisitCardiologist from "../VisitCardiologist/VisitCardiologist.js";
import VisitTherapist from "../VisitTherapist/VisitTherapist.js";
import VisitDentist from "../VisitDentist/VisitDentist.js";

class Form {
  constructor() {
    this.form = document.createElement("form");
  }

  renderForm(id, cardID) {
    this.form.className = "form";
    const {
      inputs,
      buttons,
      handleSubmit,
      select: selectInputs,
      textarea,
    } = formconfig[id];

    if (id === "updateCard") {
      const card = api.getByID(cardID);
      card.then((card) => {
        const {
          firstName,
          lastName,
          target,
          description,
          priority,
          doctor,
          ...rest
        } = card;

        const div = document.createElement("div");
        const select = new Select().render("doctor", card);

        div.id = "form-wrapper";
        const parent = new Visit({
          inputs: {
            array: ["firstName", "lastName", "target", "dateVisit"],
            id: (elm, card) => new Input().render(elm, card),
          },
          textarea: {
            array: ["description"],
            id: (elm, card) => new Textarea().render(elm, card),
          },
          select: {
            array: ["priority"],
            id: (elm, card) => new Select().render(elm, card),
          },
        });
        parent.renderFormVisit("inputs", div, card);
        parent.renderFormVisit("textarea", div, card);
        parent.renderFormVisit("select", div, card);

        if (card.doctor === "cardiologist") {
          const parentCardiologist = new VisitCardiologist({
            inputs: {
              array: ["age", "pressure", "index", "diagnosis"],
              id: (elm, card) => new Input().render(elm, card),
            },
          }).renderFormVisit("inputs", div, card);
          this.form.prepend(parentCardiologist);
        }
        if (card.doctor === "therapist") {
          const parentTherapist = new VisitTherapist({
            inputs: {
              array: ["age"],
              id: (elm, card) => new Input().render(elm, card),
            },
          }).renderFormVisit("inputs", div, card);
          this.form.prepend(parentTherapist);
        }
        if (card.doctor === "dentist") {
          const parentDentist = new VisitDentist({
            inputs: {
              array: ["lastVisit"],
              id: (elm, card) => new Input().render(elm, card),
            },
          }).renderFormVisit("inputs", div, card);

          this.form.prepend(parentDentist);
        }
        this.form.prepend(select);
      });
    }

    if (inputs) {
      inputs.forEach((element) => {
        const input = new Input().render(element);
        this.form.append(input);
      });
    }
    if (selectInputs) {
      selectInputs.forEach((element) => {
        const select = new Select().render(element);
        this.form.append(select);
      });
    }
    if (textarea) {
      textarea.forEach((element) => {
        const textarea = new Textarea().render(element);
        this.form.append(textarea);
      });
    }
    let cardId = cardID || null;
    this.form.addEventListener("submit", handleSubmit.bind(this, cardId));

    buttons.forEach((element) => {
      const button = new Button().renderButton(element);
      this.form.append(button);
    });

    return this.form;
  }
}

export default Form;
