import { html } from "lit-html";
// import { ifThen } from './directives/if-then.js';

import { decorateAsComponent } from "../../utils/decorate-as-component.js";
import { decorateAsStateProperty } from "../../utils/decorate-as-state-property.js";
import { redirect } from "../../utils/index.js";
import { Store } from "../../utils/store/store";

const loginTemplate = (context) => html`
  <form @submit="${context.submitHandler}" class="login-form">
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
    // do login
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resp) => resp.json())
      .then((users) => {
        Store.dispatch({
          type: "LOGIN",
          payload: {
            user: users[0],
          },
        });
        console.log(users);
        redirect();
      })
      .catch((err) => console.log(err));
  };
}

customElements.define(Login.selector, Login);
