import { html } from "lit-html";
// import { ifThen } from './directives/if-then.js';

import { decorateAsComponent } from "../utils/decorate-as-component.js";
import { decorateAsStateProperty } from "../utils/decorate-as-state-property.js";

const notFoundTemplate = (context) => html`<p>404 not found</p> `;

export class NotFound extends HTMLElement {
  static selector = "app-not-found";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    decorateAsComponent(this, notFoundTemplate);

    decorateAsStateProperty(this, "isLoading", false);
  }
}

customElements.define(NotFound.selector, NotFound);
