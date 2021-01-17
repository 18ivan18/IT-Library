import { html } from "lit-html";

import { decorateAsComponent } from "../utils/decorate-as-component.js";
import { decorateAsStateProperty } from "../utils/decorate-as-state-property.js";
import { Store } from "../utils/store/store";

const navBarTemplate = (context) => html`
  <style>
    li {
      float: left;
      height: 100%;
    }

    li a {
      display: block;
      color: white;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      height: 100%;
    }

    li a:hover {
      background-color: ${context.backgroundColor || "#111"};
    }
    header {
      margin: 0;
      width: 100%;
    }
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: ${context.color || "#333"};
      height: 100%;
    }
    .nav-menu {
      height: 10vh;
    }
  </style>
  <header>
    <nav>
      <div class="nav-menu">
        <ul class="menu">
          <a href="#" id="logo">
            <!-- <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt=""/> -->
          </a>
          <li><a href="/">Home</a></li>
          <li><a href="/browse">Books and People</a></li>
          <li><a href="/library">Library</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contacs">Contact us</a></li>
          <li>
            <div class="search"><img /></div>
          </li>
          ${context.auth.isLoggedIn
            ? html`<li><a href="/profile">${context.auth.user.name}</a></li>
                <li @click=${context.handleLogout.bind(context)}>
                  <button href="">Logout</button>
                </li>`
            : html` <li><a href="/signup">Sign Up</a></li>
                <li><a href="/login">Log in</a></li>`}
        </ul>
      </div>
    </nav>
  </header>
`;

export class Navbar extends HTMLElement {
  static selector = "app-nav";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    decorateAsComponent(this, navBarTemplate);
    decorateAsStateProperty(this, "auth", Store.getState().auth);
    Store.subscribe((action) => {
      if (action.type === "LOGIN" || action.type === "LOGOUT") {
        this.auth = Store.getState().auth;
      }
    });
  }

  handleLogout = (e) => {
    Store.dispatch({
      type: "LOGOUT",
    });
  };

  componentClickHandler(e) {
    if (e.target.tagName === "A") {
      e.preventDefault();
      history.pushState({}, "", e.target.pathname);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  }
}

customElements.define(Navbar.selector, Navbar);
