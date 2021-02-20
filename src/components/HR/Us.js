import { html } from "lit-html";

import { decorateAsComponent } from "../../utils/";

const usTemplate = (context) =>
  html`<p>
    Us Voluptate nisi sunt velit ipsum incididunt amet. Sint occaecat magna
    culpa ullamco laborum. Exercitation commodo ex consequat enim deserunt
    aliquip voluptate labore irure tempor excepteur commodo ullamco. Adipisicing
    irure adipisicing Lorem eu velit. Aute sit ullamco proident ea reprehenderit
    in laborum ullamco nulla enim. Ullamco ullamco qui laboris esse eu irure
    labore eiusmod consequat adipisicing reprehenderit irure.
  </p> `;

export class Us extends HTMLElement {
  static selector = "app-us";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    decorateAsComponent(this, usTemplate);
  }
}

customElements.define(Us.selector, Us);
