class Visit {
  constructor(config) {
    this.formconfig = config;
    this.medCard = document.createElement("div");
  }

  renderFormVisit(id, parent, card) {
    this.formconfig[id].array.forEach((element) => {
      const elem = this.formconfig[id].id(element, card);

      parent.append(elem);
    });
    return parent;
  }

  renderShowMore(cardData) {
    const target = document.createElement("p");
    const description = document.createElement("p");
    const priority = document.createElement("p");
    const name = document.createElement("p");
    const doctor = document.createElement("p");
    const visit = document.createElement("p");
    target.textContent = `Target: ${cardData.target}`;
    description.textContent = `Description: ${cardData.description}`;
    priority.textContent = `Priority: ${cardData.priority}`;
    name.textContent = `Name: ${cardData.firstName + " " + cardData.lastName}`;
    doctor.textContent = `Doctor: ${cardData.doctor}`;
    visit.textContent = `Date of visit: ${cardData.dateVisit}`;
    this.medCard.append(name, doctor, priority, target, description, visit);

    return this.medCard;
  }
}

export default Visit;
