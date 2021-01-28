import { html } from "lit-html";

import { decorateAsComponent, decorateAsStateProperty } from "../../utils/";

const contactsTemplate = (context) => html`<p>Contacts</p> `;

export class Contacts extends HTMLElement {
  static selector = "app-contacts";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    decorateAsComponent(this, contactsTemplate);

    decorateAsStateProperty(this, "isLoading", false);
  }
}

customElements.define(Contacts.selector, Contacts);
