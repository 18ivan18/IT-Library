import { html } from "lit-html";

import {
  decorateAsComponent,
  decorateAsStateProperty,
  parse,
  redirect,
  ifThen,
} from "../../utils/";
import { Store } from "../../utils/store/store";

const loginTemplate = (context) => html`
  ${ifThen(context.isLoading, html`<h1>LOADING</h1>`)}
  <form @submit="${context.submitHandler}" id="login-form">
    <div class="form-group">
      <label for="username">Username:</label>
      <input id="username" type="text" name="username" value="" />
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input id="password" type="text" name="password" value="" />
    </div>
    <button ?disabled=${context.isLoading}>Login</button>
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
    // validate
    this.isLoading = true;
    const inputs = Array.from(
      this.shadowRoot.getElementById("login-form").getElementsByTagName("input")
    );
    let formData = new FormData();
    for (const input of inputs) {
      let { value, name } = input;
      formData.append(name, value);
    }
    // do login
    fetch(parse("login"), {
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

    this.isLoading = false;
  };
}

customElements.define(Login.selector, Login);
