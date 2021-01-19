import { html } from "lit-html";

import { decorateAsComponent } from "../../utils/decorate-as-component.js";
import { decorateAsStateProperty } from "../../utils/decorate-as-state-property.js";
import { redirect } from "../../utils/index.js";
import { Store } from "../../utils/store/store";
import { config } from "../../../config";

const loginTemplate = (context) => html`
  <form @submit="${context.submitHandler}" id="login-form">
    <div class="form-group">
      <label for="email">Email:</label>
      <input id="email" type="text" name="email" value="" />
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input id="password" type="text" name="password" value="" />
    </div>
    <button>Login</button>
  </form>
`;

export class Login extends HTMLElement {
  static selector = "app-login";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    decorateAsComponent(this, loginTemplate);
    decorateAsStateProperty(this, "isLoading", false);
  }

  submitHandler = (e) => {
    e.preventDefault();
    const inputs = Array.from(
      this.shadowRoot.getElementById("login-form").getElementsByTagName("input")
    );
    const data = inputs.reduce((acc, currInput) => {
      let { value, name, type } = currInput;
      if (type === "number") {
        value = currInput.valueAsNumber;
      } else if (type === "date") {
        value = currInput.valueAsDate;
      } else if (type === "checkbox") {
        value = currInput.checked;
      }
      acc[name] = value;
      return acc;
    }, {});
    // do login
    fetch(config.api.url + "login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

customElements.define(Login.selector, Login);
