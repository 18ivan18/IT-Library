import { html } from "lit-html";

import {
  decorateAsComponent,
  decorateAsStateProperty,
  redirect,
  parse,
} from "../utils/";
import { Store } from "../utils/store/store";

const signupTemplate = (context) => {
  if (!Store.getState().auth.isLoggedIn) {
    return html`<form id="register-form" @submit=${context.handleSubmit}>
      <div class="form-group">
        <label for="username">Username</label>
        <input id="username" value="" name="username" type="text" />
      </div>
      <div class="form-group">
        <label for="firstName">First name</label>
        <input id="firstName" value="" name="firstName" type="text" />
      </div>
      <div class="form-group">
        <label for="lastName">Last name</label>
        <input id="lastName" value="" name="lastName" type="text" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" value="" name="password" type="password" />
      </div>
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

  handleSubmit = (e) => {
    e.preventDefault();
    const inputs = Array.from(
      this.shadowRoot
        .getElementById("register-form")
        .getElementsByTagName("input")
    );
    let formData = new FormData();
    for (const input of inputs) {
      let { value, name } = input;
      formData.append(name, value);
    }
    fetch(parse("signup"), {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.success) {
          Store.dispatch({
            type: "LOGIN",
            payload: {
              user: resp.user,
            },
          });
          redirect();
        }
      })
      .catch((err) => console.log(err));
  };
}

customElements.define(Signup.selector, Signup);
