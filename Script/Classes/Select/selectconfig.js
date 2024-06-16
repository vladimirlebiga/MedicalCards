import Visit from "../Visit/Visit.js";
import VisitCardiologist from "../VisitCardiologist/VisitCardiologist.js";
import VisitTherapist from "../VisitTherapist/VisitTherapist.js";
import VisitDentist from "../VisitDentist/VisitDentist.js";
import Input from "../Input/Input.js";
import Textarea from "../Textarea/Textarea.js";
import Select from "./Select.js";
import cards from "../Cards/Cards.js";

export const selectconfig = {
  doctor: {
    options: ["Choose Doctor", "Dentist", "Therapist", "Cardiologist"],
    name: "doctor",
    value: ["", "dentist", "therapist", "cardiologist"],
    label: "Doctor",
    onchange: (e) => {
      const elementForDelete = e.target
        .closest("form")
        .querySelector("#form-wrapper");
      if (elementForDelete) {
        elementForDelete.remove();
      }
      const card = cards.card;
      const div = document.createElement("div");
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

      if (e.target.value === "cardiologist") {
        const parentCardiologist = new VisitCardiologist({
          inputs: {
            array: ["age", "pressure", "index", "diagnosis"],
            id: (elm, card) => new Input().render(elm, card),
          },
        }).renderFormVisit("inputs", div, card);
        e.target.closest("label").after(parentCardiologist);
      }
      if (e.target.value === "therapist") {
        const parentTherapist = new VisitTherapist({
          inputs: {
            array: ["age"],
            id: (elm, card) => new Input().render(elm, card),
          },
        }).renderFormVisit("inputs", div, card);
        e.target.closest("label").after(parentTherapist);
      }
      if (e.target.value === "dentist") {
        const parentDentist = new VisitDentist({
          inputs: {
            array: ["lastVisit"],
            id: (elm, card) => new Input().render(elm, card),
          },
        }).renderFormVisit("inputs", div, card);

        e.target.closest("label").after(parentDentist);
      }
    },
  },

  priority: {
    options: ["Choose Priority", "High", "Low", "Normal"],
    name: "priority",
    value: ["", "high", "low", "normal"],
    label: "Priority",
  },
};
