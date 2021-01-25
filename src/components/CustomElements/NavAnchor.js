import { redirect } from "../../utils";

export class NavAnchor extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", (e) => {
      e.preventDefault();
      redirect(this.href);
    });
  }
}

customElements.define("nav-anchor", NavAnchor, { extends: "a" });
