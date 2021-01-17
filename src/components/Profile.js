import { html } from "lit-html";

import { decorateAsComponent } from "../utils/decorate-as-component.js";
import { decorateAsStateProperty } from "../utils/decorate-as-state-property.js";
import { Store } from "../utils/store/store";
import { redirect } from "../utils";

const profileTemplate = (context) => {
  if (context.auth.isLoggedIn) {
    return html` <p>Name: ${context.auth.user.name}</p>
      <p>Username: ${context.auth.user.username}</p>
      <p>Phone: ${context.auth.user.phone}</p>
      <p>Email: ${context.auth.user.email}</p>
      <p>Website: ${context.auth.user.website}</p>`;
  } else {
    redirect("/signup");
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
  }
}

customElements.define(Profile.selector, Profile);
