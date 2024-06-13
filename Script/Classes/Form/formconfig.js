import api from "../API/API.js";
import Button from "../Button/Button.js";
import cards from "../Cards/Cards.js";
import PopUp from "../PopUP/PopUp.js";
import searchbar from "../Search/Searchbar.js";

export const formconfig = {
  login: {
    inputs: ["email", "password"],
    buttons: ["login", "cancel", "demoUser"],
    handleSubmit: async (e) => {
      e.preventDefault();
      const inputs = e.target.querySelectorAll("input");
      const formData = [...inputs].reduce((acc, ele) => {
        acc[ele.name] = ele.value;
        return acc;
      }, {});
      const token = await api.logIn(formData);
      if (token) {
        e.target.closest(".modal").remove();
        const btn = new Button().renderButton("createCard");
        document.querySelector(".header-btn").replaceWith(btn);
        const search = searchbar.renderSearchbar();
        document.querySelector("header").after(search);
        const medicalCards = await api.getCards();
        cards.formatData(medicalCards);
        cards.renderCards(medicalCards);
      }
    },
  },
  createCard: {
    buttons: ["createCardSubmit", "cancel"],
    select: ["doctor"],
    handleSubmit: async (id, e) => {
      e.preventDefault();
      const inputs = e.target.querySelectorAll("input");
      const formDataInputs = [...inputs].reduce((acc, ele) => {
        acc[ele.name] = ele.value;
        return acc;
      }, {});
      const select = e.target.querySelectorAll("select");
      const formDataSelect = [...select].reduce((acc, ele) => {
        acc[ele.name] = ele.value;
        return acc;
      }, {});
      const textarea = e.target.querySelectorAll("textarea");
      const formDataTextarea = [...textarea].reduce((acc, ele) => {
        acc[ele.name] = ele.value;
        return acc;
      }, {});
      const formData = {
        ...formDataInputs,
        ...formDataSelect,
        ...formDataTextarea,
      };
      if (Object.keys(formData).length <= 1) {
        return;
      }
      const medicalCard = await api.createCard(formData);
      if (!medicalCard) {
        return;
      }
      const newCard = cards.renderCard(medicalCard);
      const ul = document.querySelector("ul");
      ul.append(newCard);
      e.target.closest(".modal").remove();
    },
  },
  deleteCard: {
    buttons: ["deleteCardSubmit", "cancel"],
    handleSubmit: async (cardID, e) => {
      e.preventDefault();
      const deleted = await api.deleteCard(cardID);
      if (deleted) {
        e.target.closest(".modal").remove();
        document.getElementById(cardID).remove();
        const popUp = new PopUp().renderPopUp("deleted");
        const root = document.getElementById("root");
        root.append(popUp);
        cards.deleteCard(cardID);
      }
    },
  },

  updateCard: {
    buttons: ["update", "cancel"],
    handleSubmit: async (cardID, e) => {
      e.preventDefault();

      const input = e.target.querySelectorAll("input");
      const select = e.target.querySelectorAll("select");
      const textarea = e.target.querySelectorAll("textarea");
      const inputData = [...input].reduce((acc, cur) => {
        acc[cur.name] = cur.value;
        return acc;
      }, {});
      const selectData = [...select].reduce((acc, cur) => {
        acc[cur.name] = cur.value;
        return acc;
      }, {});
      const textareaData = [...textarea].reduce((acc, cur) => {
        acc[cur.name] = cur.value;
        return acc;
      }, {});
      const data = { ...inputData, ...selectData, ...textareaData };
      const medicalCard = await api.updateCard(data, cardID);

      if (medicalCard) {
        const card = cards.renderCard(medicalCard);

        const oldCard = document.getElementById(cardID);
        oldCard.replaceWith(card);
        e.target.closest(".modal").remove();
      }
    },
  },

  search: {
    buttons: ["search"],
    inputs: ["search", "checkbox"],
    select: ["priority"],
    handleSubmit: (id, e) => {
      e.preventDefault();

      const input = e.target.querySelectorAll("input");
      const select = e.target.querySelectorAll("select");
      const searchData = [...input].reduce((acc, cur) => {
        if (cur.type === "checkbox") {
          // Set the value to true or false based on whether it is checked
          acc[cur.name] = cur.checked;
        } else {
          // For other inputs, use the value directly
          acc[cur.name] = cur.value;
        }
        return acc;
      }, {});
      const searchSelect = [...select].reduce((acc, cur) => {
        acc[cur.name] = cur.value;
        return acc;
      }, {});
      const searchParams = { ...searchData, ...searchSelect };
      cards.filterCard(searchParams);
    },
  },
};
