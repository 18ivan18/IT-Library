import { html } from "lit-html";
// import { ifThen } from './directives/if-then.js';

import { decorateAsComponent } from "../utils/decorate-as-component.js";
import { decorateAsStateProperty } from "../utils/decorate-as-state-property.js";

const libraryTemplate = (context) => html` <p>Library</p> `;

export class Library extends HTMLElement {
  static selector = "app-library";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    decorateAsComponent(this, libraryTemplate);

    decorateAsStateProperty(this, "isLoading", false);
  }
}

customElements.define(Library.selector, Library);
