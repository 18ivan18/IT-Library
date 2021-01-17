import { html } from "lit-html";
// import { ifThen } from './directives/if-then.js';

import { decorateAsComponent } from "../../utils/decorate-as-component.js";
import { decorateAsStateProperty } from "../../utils/decorate-as-state-property.js";
import { Store } from "../../utils/store/store";

const loginTemplate = (context) => html`
  <form @submit="${context.submitHandler}">
    <input type="text" />
    <input type="text" />
    <button>Login</button>
  </form>
`;

const user = {
  name: "Ivan",
  stuff: "Some stuff",
};

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
    Store.dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };
}

customElements.define(Login.selector, Login);
