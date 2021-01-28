import { html } from "lit-html";

import { decorateAsComponent, decorateAsStateProperty } from "../../utils/";

const aboutTemplate = (context) => html`<p>About</p> `;

export class About extends HTMLElement {
  static selector = "app-about";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    decorateAsComponent(this, aboutTemplate);

    decorateAsStateProperty(this, "isLoading", false);
  }
}

customElements.define(About.selector, About);
