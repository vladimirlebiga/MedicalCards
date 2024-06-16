import Modal from "../Modal/Modal.js";
import api from "../API/API.js";
import Button from "../Button/Button.js";
import searchbar from "../Search/Searchbar.js";
import cards from "../Cards/Cards.js";

export const buttonConfig = {
  header: {
    title: "Login",
    className: "btn header-btn",
    onclick: (e) => {
      const modal = new Modal().renderModal("login");
      document.getElementById("root").append(modal);
    },
  },

  login: {
    title: "Login",
    className: "btn log-in-btn",
    type: "submit",
  },

  cancel: {
    title: "Cancel",
    className: "btn cancel-btn",
    onclick: (e) => {
      const parent = e.target.closest(".modal");
      parent.remove();
    },
  },

  demoUser: {
    title: "Demo User",
    className: "btn demo-btn",
    onclick: async (e) => {
      await api.logIn({ email: "ll_vlad@hotmail.com", password: "vle129LL%" });
      const parent = e.target.closest(".modal");
      const btn = new Button().renderButton("createCard");
      document.querySelector(".header-btn").replaceWith(btn);
      const search = searchbar.renderSearchbar();
      document.querySelector("header").after(search);
      const medicalCards = await api.getCards();
      cards.formatData(medicalCards);
      cards.renderCards(medicalCards);
      parent.remove();
    },
  },

  createCard: {
    title: "Create Card",
    className: "btn log-in-btn",
    onclick: (e) => {
      const modal = new Modal().renderModal("createCard");
      document.getElementById("root").append(modal);
    },
  },

  createCardSubmit: {
    title: "Submit",
    className: "btn log-in-btn",
    type: "submit",
  },

  delete: {
    title: "Delete",
    className: "btn delete-btn",
    onclick: (e) => {
      const id = e.target.closest("li").id;
      const modal = new Modal().renderModal("deleteCard", id);
      document.getElementById("root").append(modal);
    },
  },

  // real delete
  deleteCardSubmit: {
    title: "Delete",
    className: "btn delete-submit-btn",
    type: "submit",
  },

  updateCard: {
    title: "Update Card",
    className: "btn update-btn",
    onclick: (e) => {
      const id = e.target.closest("li").id;
      const modal = new Modal().renderModal("updateCard", id);
      document.getElementById("root").append(modal);
    },
  },

  update: {
    title: "Update",
    className: "btn update-submit-btn",
    type: "submit",
  },

  showMore: {
    title: "Show More",
    className: "btn show-btn",
    onclick: async (e) => {
      const id = e.target.closest("li").id;
      const modal = await new Modal().renderModal("showMore", id);
      document.getElementById("root").append(modal);
    },
  },

  search: {
    title: "Search",
    className: "btn search-btn",
    type: "submit",
  },
};
