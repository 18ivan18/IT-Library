import { redirect } from "../../utils";

export class NavAnchor extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", (e) => {
      e.preventDefault();
      if (!this.href.match(/#$/)) {
        redirect(this.href);
      }
    });
  }
}

customElements.define("nav-anchor", NavAnchor, { extends: "a" });
