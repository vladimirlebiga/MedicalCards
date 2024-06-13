import cards from "../Cards/Cards.js";

class API {
  constructor() {
    this.baseUrl = "https://ajax.test-danit.com/api/v2/cards";
    this.token = localStorage.getItem("token") || null;
  }
  async getCards() {
    try {
      const response = await fetch(this.baseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
          // Authorization: `Bearer 9c2c79d5-fb7f-46a8-9b77-f9cd80908f8c`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Failed to get Cards:", error);
    }
  }

  async logIn(formData) {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text(); //.json()

      this.token = data;
      localStorage.setItem("token", this.token);
      return this.token;
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  }

  async getByID(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      cards.card = data;

      return data;
    } catch (error) {
      console.error("Failed to to get ID:", error);
    }
  }

  async createCard(formData) {
    try {
      const response = await fetch(`${this.baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Failed to create Card:", error);
    }
  }

  async updateCard(formData, id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to update Card:", error);
    }
  }

  async deleteCard(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return { message: "Succesfull Deleted" };
    } catch (error) {
      console.error("Failed to delete Card:", error);
    }
  }

  logOut() {
    this.tokem = null;
    localStorage.removeItem("token");
  }
}

// 9c2c79d5-fb7f-46a8-9b77-f9cd80908f8c
// ll_vlad@hotmail.com
// vle129Ll%

export default new API();
