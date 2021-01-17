import { html } from "lit-html";
// import { ifThen } from './directives/if-then.js';
import { Store } from "../utils/store/store";

import { decorateAsComponent } from "../utils/decorate-as-component.js";
import { decorateAsStateProperty } from "../utils/decorate-as-state-property.js";

const footerTemplate = (context) => html` <style>
    footer {
      position: sticky;
      height: 13vh;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: #ff1234;
      color: white;
      text-align: center;
      display: flex;
    }
  </style>
  <footer>
    <div class="social">
      <span> Be a part of us: </span>
      <div class="fb">
        <a href="https://www.facebook.com/"> <img src="images/fb.png" /></a>
      </div>
      <div class="yb">
        <a href="https://www.youtube.com/"> <img src="images/yb.png" /></a>
      </div>
      <div class="tw">
        <a href="https://www.twitter.com/"> <img src="images/tw.jpg" /></a>
      </div>
    </div>
    <div class="footer">
      <p>IT Library &copy; 2020. All rights reserved.</p>
    </div>
  </footer>`;

export class Footer extends HTMLElement {
  static selector = "app-footer";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    decorateAsComponent(this, footerTemplate);
    decorateAsStateProperty(this, "isLoading", false);
  }
}

customElements.define(Footer.selector, Footer);
