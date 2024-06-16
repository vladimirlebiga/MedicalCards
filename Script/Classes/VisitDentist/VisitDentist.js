import Visit from "../Visit/Visit.js";

class VisitDentist extends Visit {
  constructor(config) {
    super(config);
  }
  renderShowMore(cardData) {
    const lastVisit = document.createElement("p");
    lastVisit.textContent = `Last visit: ${cardData.lastVisit}`;
    this.medCard.append(lastVisit);
    return this.medCard;
  }
}
export default VisitDentist;
