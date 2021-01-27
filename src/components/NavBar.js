import { html } from "lit-html";

import { decorateAsComponent } from "../utils/decorate-as-component.js";
import { decorateAsStateProperty } from "../utils/decorate-as-state-property.js";
import { Store } from "../utils/store/store";
import { NavAnchor } from "../components/CustomElements/NavAnchor";

const navBarTemplate = (context) => html`
  <style>
    nav {
      overflow: hidden;
      background-color: #e9e9e9;
    }

    nav a {
      float: left;
      display: block;
      color: black;
      text-align: center;
      padding: 22px 24px;
      text-decoration: none;
      font-size: 17px;
    }

    nav a:hover {
      background-color: #ddd;
      color: black;
    }

    nav a.active {
      background-color: #2196f3;
      color: white;
    }

    nav .credentials-container {
      float: right;
    }

    .image-container {
      padding: 0 30px;
    }

    nav img {
      height: 60px;
      width: 60px;
    }

    #form-search {
      width: 10px;
      height: 10px;
    }

    form {
      float: left;
      display: block;
      color: black;
      text-align: center;
      padding: 18.5px 20.5px;
    }

    form button {
      border: none;
      outline: none;
    }

    input[type="text"] {
      outline: none;
      border-radius: 25px;
      border: none;
      /* border-bottom: 1px black solid; */
      /* background-color: transparent; */
      box-shadow: none;
      width: 200px;
      height: 25px;
    }
  </style>
  <header>
    <nav>
      <a class="image-container" href="/" is="nav-anchor"
        ><img src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png"
      /></a>
      <a href="/" is="nav-anchor">Home</a>
      <a href="/library" is="nav-anchor">Books and People</a>
      <a href="/statistics" is="nav-anchor">Statistics</a>
      <a href="/about" is="nav-anchor">About</a>
      <a href="/contacs" is="nav-anchor">Contact us</a>
      <form @submit=${context.handleSubmit}>
        <input type="text" placeholder="Search.." name="search" />
        <button type="submit">
          <img
            src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png"
            alt="search"
            id="form-search"
          />
        </button>
      </form>
      <div class="credentials-container">
        ${context.auth.isLoggedIn
          ? html`<a href="/profile" is="nav-anchor">Hello, ${context.auth.user.name}</a>
              <a href="/" @click=${context.handleLogout} is="nav-anchor">Logout</button> `
          : html` <a href="/signup" is="nav-anchor">Sign Up</a>
              <a href="/login" is="nav-anchor">Log in</a>`}
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
    // TODO: fetch to the api
    Store.dispatch({
      type: "LOGOUT",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("searched...");
  };
}

customElements.define(Navbar.selector, Navbar);
