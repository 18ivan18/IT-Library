import { html } from "lit-html";

import { decorateAsComponent } from "../utils/decorate-as-component.js";
import { decorateAsStateProperty } from "../utils/decorate-as-state-property.js";
import { Store } from "../utils/store/store";
import { redirect } from "../utils";

const profileTemplate = (context) => {
  if (context.auth.isLoggedIn) {
    return html`
      <style>
        .personal-info {
          background: white;
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
        }
        .personal-info h3 {
          text-align: center;
          text-transform: uppercase;
        }
        .stats {
          text-transform: uppercase;
          font-weight: bold;
        }
        .container {
          margin: 3% 7%;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2em;
        }
        .buttons {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .personal-info img {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .book-history {
          background: white;
        }
        .info {
          margin-top: 4%;
          margin-bottom: 4%;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .info p {
          padding: 10px 15%;
          margin: 0;
        }
      </style>
      <div class="container">
        <div class="personal-info">
          <h3>Personal details</h3>
          <img src=${context.auth.user.profilePicture} alt="Profile picture" />
          <div class="info">
            <p class="stats">Name</p>
            <p>${context.auth.user.name}</p>
            <p class="stats">Username</p>
            <p>${context.auth.user.username}</p>
            <p class="stats">Phone</p>
            <p>${context.auth.user.phone}</p>

            <p class="stats">Email</p>
            <p>${context.auth.user.email}</p>
            <p class="stats">Website</p>
            <p>${context.auth.user.website}</p>
            <p class="stats">Resources</p>
            <p>${context.auth.user.resources}</p>
          </div>
          <div class="buttons">
            <button @click=${() => redirect("/import")}>Upload books</button>
            <button>Do something else I guess 🍕</button>
          </div>
        </div>
        <div class="book-history">
          <p>
            You took Harry potter on the 1st of september and returned it on the
            31st of september
          </p>
        </div>
      </div>
    `;
  } else {
    redirect("/login");
  }
};

export class Profile extends HTMLElement {
  static selector = "app-profile";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    decorateAsComponent(this, profileTemplate);

    decorateAsStateProperty(this, "isLoading", false);
    decorateAsStateProperty(this, "auth", Store.getState().auth);

    Store.subscribe((action) => {
      if (action.type === "LOGIN" || action.type === "LOGOUT") {
        this.auth = Store.getState().auth;
      }
    });
  }
}

customElements.define(Profile.selector, Profile);
