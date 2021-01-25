import { bootstrap, decorateAsComponent, nextTick, Router } from "./utils";
import {
  Navbar,
  Footer,
  Home,
  Login,
  Library,
  Profile,
  Signup,
  UploadBooks,
  Statistics,
} from "./components";
import { html } from "lit-html";

const appTemplate = () => html`
  <style>
    .body {
      min-height: 100vh;
      display: grid;
      grid-template-rows: auto 1fr auto;
      background: #f5f5f5;
    }
  </style>
  <div class="body">
    <div id="nav"></div>
    <div id="outlet"></div>
    <div id="footer"></div>
  </div>
`;

const routes = [
  { path: "/", ctor: Home },
  { path: "/login", ctor: Login },
  { path: "/library", ctor: Library },
  { path: "/profile", ctor: Profile },
  { path: "/signup", ctor: Signup },
  { path: "/import", ctor: UploadBooks },
  { path: "/statistics", ctor: Statistics },
];

export class App extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    decorateAsComponent(this, appTemplate);
  }

  connectedCallback() {
    nextTick(() => {
      bootstrap(this.shadowRoot.getElementById("nav"), Navbar);
      bootstrap(this.shadowRoot.getElementById("footer"), Footer);
      this.Router = new Router(
        this.shadowRoot.getElementById("outlet"),
        routes
      );
      this.Router.startListening();
    });
  }

  disconnectedCallback() {
    this.Router.stopListening();
  }
}

customElements.define("app-root", App);
