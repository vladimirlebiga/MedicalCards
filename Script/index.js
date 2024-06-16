import api from "./Classes/API/API.js";
import header from "./Classes/Header/Header.js";
import cards from "./Classes/Cards/Cards.js";
import searchbar from "./Classes/Search/Searchbar.js";

const parent = document.querySelector("#root");

const init = async () => {
  const newHeader = header.renderHeader();

  parent.append(newHeader);
  if (api.token) {
    const search = searchbar.renderSearchbar();
    parent.append(search);
    const medicalCards = await api.getCards();
    cards.formatData(medicalCards);
    cards.renderCards(medicalCards);
  }
};

init();
