import { html } from "lit-html";

import { decorateAsComponent, decorateAsStateProperty } from "../utils/";

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
