import Visit from "../Visit/Visit.js";

class VisitCardiologist extends Visit {
  constructor(config) {
    super(config);
  }
  renderShowMore(cardData) {
    const age = document.createElement("p");
    const index = document.createElement("p");
    const pressure = document.createElement("p");
    const diagnosis = document.createElement("p");
    age.textContent = `Age: ${cardData.age}`;
    index.textContent = `Index: ${cardData.index}`;
    pressure.textContent = `Pressure: ${cardData.pressure}`;
    diagnosis.textContent = `Diagnosis: ${cardData.diagnosis}`;
    this.medCard.append(age, index, pressure, diagnosis);
    return this.medCard;
  }
}

export default VisitCardiologist;
