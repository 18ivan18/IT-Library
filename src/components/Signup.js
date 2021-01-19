import { html } from "lit-html";

import { decorateAsComponent } from "../utils/decorate-as-component.js";
import { decorateAsStateProperty } from "../utils/decorate-as-state-property.js";
import { Store } from "../utils/store/store";
import { redirect } from "../utils";

const signupTemplate = (context) => {
  if (!Store.getState().auth.isLoggedIn) {
    return html`<form id="register-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input id="username" value="" name="username" type="text" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" value="" name="password" type="password" />
      </div>
      <div class="form-group">
        <label for="repeatPassword">Repeat password</label>
        <input
          id="repeatPassword"
          value=""
          name="repeatPassword"
          type="password"
        />
      </div>
      <button>Register</button>
    </form>`;
  } else {
    redirect("/profile");
  }
};

export class Signup extends HTMLElement {
  static selector = "app-signup";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    decorateAsComponent(this, signupTemplate);

    decorateAsStateProperty(this, "isLoading", false);
  }
}

customElements.define(Signup.selector, Signup);
