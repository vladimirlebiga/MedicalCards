import Visit from "../Visit/Visit.js";

class VisitTherapist extends Visit {
  constructor(config) {
    super(config);
  }

  renderShowMore(cardData) {
    const age = document.createElement("p");
    age.textContent = `Age: ${cardData.age}`;
    this.medCard.append(age);
    return this.medCard;
  }
}

export default VisitTherapist;
