import {
  bootstrap,
  decorateAsComponent,
  nextTick,
  Router,
  redirect,
} from "../utils";
import { Navbar, Footer } from "./index";
import { html } from "lit-html";
import { Home } from "./Home";
import { Login } from "./Auth/Login";
import { Library } from "./Library";
import { Profile } from "./Profile";
import { Signup } from "./Signup";
import { UploadBooks } from "./UploadBooks";

const appTemplate = (context) => html`
  <div>
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
];

export class App extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    decorateAsComponent(this, appTemplate);
  }

  connectedCallback() {
    // console.log("Init...");
    nextTick(() => {
      bootstrap(this.shadowRoot.getElementById("nav"), Navbar);
      bootstrap(this.shadowRoot.getElementById("footer"), Footer);
      this.Router = new Router(
        this.shadowRoot.getElementById("outlet"),
        routes
      );
      this.Router.startListening();
      window.addEventListener("click", this.componentClickHandler);
    });
  }

  componentClickHandler(e) {
    const target = e.composedPath()[0];
    if (target.nodeName === "A") {
      e.preventDefault();
      redirect(target.href);
    }
  }

  disconnectedCallback() {
    this.Router.stopListening();
    window.removeEventListener("click", this.componentClickHandler);
  }
}

customElements.define("app-root", App);
