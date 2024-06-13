import Main from "../Main/Main.js";
import Button from "../Button/Button.js";

class Cards {
  constructor() {
    this.cards = {};
    this.parent = document.querySelector("#root");
    this.filtered = [];
    this.card = null;
  }

  formatData(cards) {
    this.cards = cards.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }

  renderCards(cards) {
    const empty = document.querySelector("#empty");
    if (empty) {
      empty.closest("main").remove();
    }

    const cardsMain = document.querySelector("#cards");
    if (cardsMain) {
      cardsMain.closest("main").remove();
    }

    if (!cards.length) {
      this.parent.append(new Main().render("empty"));
      return;
    }

    const ul = document.createElement("ul");
    cards.forEach((item) => {
      ul.insertAdjacentElement("beforeend", this.renderCard(item));
    });

    const mainElem = new Main().render("withCards");

    mainElem.append(ul);
    this.parent.append(mainElem);
  }
  renderCard(card) {
    this.cards[card.id] = card;
    const li = document.createElement("li");
    li.id = card.id;
    const subtitle = document.createElement("h4");
    subtitle.textContent = card.firstName + " " + card.lastName;
    const paragraf = document.createElement("p");
    paragraf.textContent = card.doctor;
    const btnDetele = new Button().renderButton("delete");
    const btnUpdate = new Button().renderButton("updateCard");
    const btnShowMore = new Button().renderButton("showMore");
    li.append(subtitle, paragraf, btnDetele, btnShowMore, btnUpdate);
    return li;
  }
  deleteCard(id) {
    delete this.cards[id];
  }

  filterCard(searchParams) {
    const cards = Object.values(this.cards);
    let filteredCards = null;
    if (
      searchParams.search &&
      !searchParams.priority &&
      (searchParams.pastVisit || searchParams.pastVisit === false)
    ) {
      filteredCards = this.filterBySearchPastVisit(searchParams, cards);
      this.renderCards(filteredCards);
      return;
    }

    if (
      searchParams.priority &&
      !searchParams.search &&
      (searchParams.pastVisit || searchParams.pastVisit === false)
    ) {
      filteredCards = this.filterCardByPriorityAndPastVisit(
        searchParams,
        cards
      );
      this.renderCards(filteredCards);
      return;
    }
    if (
      searchParams.priority &&
      searchParams.search &&
      (searchParams.pastVisit || searchParams.pastVisit === false)
    ) {
      filteredCards = this.filterCardByAll(searchParams, cards);
      this.renderCards(filteredCards);
      return;
    }
    if (searchParams.pastVisit || searchParams.pastVisit === false) {
      filteredCards = this.filterCardByDate(searchParams.pastVisit, cards);
      this.renderCards(filteredCards);
      return;
    }
    if (searchParams.priority || searchParams.search) {
      const searchParameter = searchParams.priority || searchParams.search;
      filteredCards = this.filterCardBy(searchParameter, cards);
      this.renderCards(filteredCards);
      return;
    }
  }
  filterCardBy(searchParameter, cards) {
    this.filtered = cards.filter((item) => {
      if (
        item.firstName.toLowerCase().includes(searchParameter.toLowerCase()) ||
        item.lastName.toLowerCase().includes(searchParameter.toLowerCase()) ||
        item.target.toLowerCase().includes(searchParameter.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(searchParameter.toLowerCase()) ||
        item.priority.toLowerCase().includes(searchParameter.toLowerCase()) ||
        item.age === +searchParameter ||
        item.index === +searchParameter ||
        item.doctor.toLowerCase().includes(searchParameter.toLowerCase()) ||
        item.diagnosis?.toLowerCase().includes(searchParameter.toLowerCase())
      ) {
        return item;
      }
    });
    return this.filtered;
  }
  filterCardByDate(searchParameter, cards) {
    this.filtered = cards.filter((item) => {
      const today = new Date();
      const dateVisit = new Date(item.dateVisit);
      const time = today.getHours();

      if (
        time < 20 &&
        today.getDate() === dateVisit.getDate() &&
        today.getMonth() === dateVisit.getMonth() &&
        today.getFullYear() === dateVisit.getFullYear()
      ) {
        if (searchParameter) {
          return item;
        }
      } else {
        return searchParameter ? dateVisit > today : today > dateVisit;
      }
    });
    return this.filtered;
  }

  filterCardByAll(searchParams, cards) {
    const filtered = this.filterCardByDate(searchParams.pastVisit, cards);

    const filteredByPrioryty = this.filterCardBy(
      searchParams.priority,
      filtered
    );
    return this.filterCardBy(searchParams.search, filteredByPrioryty);
  }

  filterCardByPriorityAndPastVisit(searchParams, cards) {
    const filtered = this.filterCardByDate(searchParams.pastVisit, cards);
    return this.filterCardBy(searchParams.priority, filtered);
  }

  filterBySearchPastVisit(searchParams, cards) {
    const filtered = this.filterCardByDate(searchParams.pastVisit, cards);
    return this.filterCardBy(searchParams.search, filtered);
  }
}

export default new Cards();
