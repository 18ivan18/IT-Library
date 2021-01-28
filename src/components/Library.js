import { html } from "lit-html";

import {
  decorateAsComponent,
  decorateAsStateProperty,
  parse,
  redirect,
} from "../utils/";

import { Store } from "../utils/store/store";

const printResourcesInfo = (arrOfBooks) =>
  arrOfBooks.map(
    (book) =>
      html`
        <div class="card" @click=${() => redirect(`/books/${book.id}`)}>
          <div
            class="card-image"
            style="background: url(${book.coverURL});
            grid-area: image;
            background-size: cover;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;"
          ></div>
          <div class="card-text">
            <span>${book.author}</span>
            <h2>${book.title}</h2>
            <p>${book.description}</p>
          </div>
          <div class="card-stats">
            <div class="stat">
              <div class="value">
                ${book.count > 0
                  ? html`<div>${book.count}</div>`
                  : html`<div>Not</div>`}
              </div>
              <div class="type">
                ${book.count > 0
                  ? html`<div>${"copies left"}</div>`
                  : html`<div>available</div>`}
              </div>
            </div>
            <div class="stat border">
              <div class="value">${book.type}</div>
              <div class="type"></div>
            </div>
            <div class="stat details">
              <div class="value">
                ${book.count > 0 ? html`<div>Get</div>` : html`<div>More</div>`}
              </div>
              <div class="type">
                ${book.count > 0
                  ? html`<div>now</div>`
                  : html`<div>details</div>`}
              </div>
            </div>
          </div>
        </div>
      `
  );

const basicFormRender = (handleSubmit) => html` 
  <form id="search-form" @submit=${handleSubmit}>
  <div class="form-group" >
    <input type="text" id="title" name="title" placeholder="Title" autocomplete="off"/>
    <span class="exact-match">
      <input type="checkbox" name="titleExactMatch"> Exact Match only
    </span>
  </div>
  <div class="form-group">
    <input type="text" id="author" name="author" placeholder="Autor" autocomplete="off"/>
    <span class="exact-match">
      <input type="checkbox" name="authorExactMatch"> Exact Match only
    </span>
   </div>
    <div class="form-group">
    <input type="text" id="tag" name="tag" placeholder="Tag" autocomplete="off"/>
   </div>
   
    <select name="sortBy" id="sortBy" class="form-group">
      <option value="author">Author</option>
      <option value="title">Title</option>
      <option value="date">Registration Date</option>
    </select>
    <select name="order" id="order" class="form-group">
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
    <button class="submit-button" >
          Search
        </button>
  </div>
</form>`;

const libraryTemplate = (context) => html`
  <style>
    .card {
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: 190px 190px 80px;
      grid-template-areas: "image" "text" "stats";
      font-family: "Roboto", sans-serif;
      border-radius: 18px;
      background: white;
      box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.9);
      text-align: center;
      transition: 0.5s;
      cursor: pointer;
    }
    .card:hover {
      transform: scale(1.1);
      box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6);
    }
    .card-text {
      grid-area: text;
      margin: 5%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-text span {
      color: #545454;
      font-size: 14px;
    }
    .card-text p {
      color: gray;
      font-size: 15px;
      font-weight: 300;
    }
    .card-text h2 {
      margin-top: 0;
      font-size: 18px;
    }
    .card-stats {
      grid-area: stats;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      background: #545454;
    }
    .card-stats .stat {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 10px;
      color: white;
    }
    .card-stats .type {
      font-size: 11px;
      font-weight: 300;
      text-transform: uppercase;
    }

    .card-stats .value {
      font-size: 22px;
      font-weight: 500;
    }

    .card-stats .border {
      border-left: 1px solid #484848;
      border-right: 1px solid #484848;
    }

    .details {
      transition: background-color 0.3s ease-in;
      border-bottom-right-radius: 15px;
    }

    .details:hover {
      background: #484848;
      border-bottom-right-radius: 15px;
    }
    .body {
      display: flex;
      justify-content: center;
      font-weight: 300;
    }

    .library {
      width: 30vw;
      height: 80vh;
      margin: 2vh 0;
      padding: 60px 35px 35px 35px;
      border-radius: 40px;
      background: radial-gradient(
        circle,
        #555555,
        #535353,
        #505050,
        #4e4e4e,
        #4c4c4c
      );
      box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.2),
        0px 5px 10px rgba(0, 0, 0, 0.2), 0 70px 50px rgba(0, 0, 0, 0.4),
        30px 50px 50px rgba(0, 0, 0, 0.2), -30px 50px 50px rgba(0, 0, 0, 0.2),
        inset 20px 0 60px rgba(0, 0, 0, 0.1),
        inset -20px 0 60px rgba(0, 0, 0, 0.1);
    }
    .logo {
      background-image: url(https://cdn.logo.com/hotlink-ok/logo-social.png);
      background-position: center;
      background-size: cover;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 0 auto;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    .title {
      text-align: center;
      font-size: 28px;
      padding-top: 24px;
      letter-spacing: 0.5px;
    }

    .sub-title {
      text-align: center;
      font-size: 15px;
      padding-top: 7px;
      letter-spacing: 3px;
      text-transform: uppercase;
      font-weight: bold;
    }

    #login-form {
      width: 100%;
      padding: 100px 5px 30px 5px;
    }

    .form-group {
      display: flex;
    }

    .form-group input[type="text"],
    select {
      border: none;
      outline: none;
      background: none;
      padding: 10px 10px 10px 5px;
      color: white;
      font-size: 18px;
      width: 73%;
    }
    #tag,
    select {
      width: 100%;
    }
    option {
      color: black;
    }

    .form-group {
      display: block;
      border-bottom: 1px solid #b3b3b3;
      margin-bottom: 30px;
    }
    .form-group svg {
      height: 22px;
      margin-bottom: -3px;
      margin-right: 10px;
    }
    .submit-button {
      cursor: pointer;
      border: none;
      outline: none;
      width: 100%;
      height: 60px;
      border-radius: 5px;
      font-size: 22px;
      color: white;
      text-align: center;
      letter-spacing: 1px;
      background: radial-gradient(
        circle,
        #24cfaa,
        #26c5a3,
        #28bb9c,
        #29b294,
        #2aa88d
      );
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    .submit-button:hover {
      background: radial-gradient(
        circle,
        #2fdbb6,
        #32d6b3,
        #32c9a8,
        #36c7a7,
        #38bb9f
      );
    }
    .submit-button:active {
      background: radial-gradient(
        circle,
        #1da88a,
        #1ea084,
        #229c82,
        #23947b,
        #238d76
      );
    }

    .checked {
      background-color: lightcoral;
    }

    .floating {
      font-size: 9vw;
      position: absolute;
      transform: rotate(-40deg);
      opacity: 15%;
      letter-spacing: 0.2em;
      left: -3%;
      top: 17%;
      user-select: none;
      z-index: 0;
    }

    .buttons {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 5% 0;
    }

    button {
      display: inline-block;
      padding: 0.35em 2.3em;
      border: 0.05em solid #ffffff;
      margin: 0 0.3em 0.3em 0;
      border-radius: 0.12em;
      box-sizing: border-box;
      text-decoration: none;
      font-family: "Roboto", sans-serif;
      font-weight: 300;
      background-color: transparent;
      color: #ffffff;
      text-align: center;
      transition: all 0.2s;
      font-size: 15px;
      cursor: pointer;
      outline: none;
    }
    .card-container {
      display: grid;
      width: 80%;
      margin: 3% auto;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 3%;
      align-items: center;
      justify-content: center;
    }
    .exact-match {
      float: right;
    }
  </style>
  <h1 class="floating">Library</h1>
  <div class="body">
    <div class="library">
      <div class="logo"></div>
      <div class="title">IT Library</div>
      <div class="sub-title">Search your favourite books</div>
      <div class="buttons">
        <button
          name="book"
          class=${context.type === "book" ? "checked" : "unchecked"}
          @click=${context.handleButtonClick}
        >
          Book</button
        ><button
          name="paper"
          class=${context.type === "paper" ? "checked" : "unchecked"}
          @click=${context.handleButtonClick}
        >
          Paper</button
        ><button
          name="magazine"
          class=${context.type === "magazine" ? "checked" : "unchecked"}
          @click=${context.handleButtonClick}
        >
          Magazine
        </button>
      </div>
      ${basicFormRender(context.handleSubmit)}
    </div>
  </div>
  <div class="card-container">${printResourcesInfo(context.resources)}</div>
`;

export class Library extends HTMLElement {
  static selector = "app-library";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    decorateAsComponent(this, libraryTemplate);

    decorateAsStateProperty(this, "isLoading", false);
    decorateAsStateProperty(this, "auth", Store.getState().auth);
    decorateAsStateProperty(this, "type", "paper");
    decorateAsStateProperty(this, "resources", []);
    Store.subscribe((action) => {
      if (action.type === "LOGIN" || action.type === "LOGOUT") {
        this.auth = Store.getState().auth;
      }
    });
    Store.subscribe((action) => {
      if (action.type === "SET_RESOURCES") {
        this.resources = Store.getState().resources;
      }
    });
  }

  handleButtonClick = (e) => {
    if (this.type === e.target.name) {
      this.type = "";
    } else {
      this.type = e.target.name;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.isLoading = true;
    this.resources = [];
    const inputs = Array.from(
      this.shadowRoot
        .getElementById("search-form")
        .getElementsByTagName("input")
    );
    let data = inputs.reduce((acc, currInput) => {
      let { value, name, type } = currInput;
      if (type === "number") {
        value = currInput.valueAsNumber;
      } else if (type === "date") {
        value = currInput.valueAsDate;
      } else if (type === "checkbox") {
        value = currInput.checked;
      }
      acc[name] = value;
      return acc;
    }, {});
    const selectors = Array.from(
      this.shadowRoot
        .getElementById("search-form")
        .getElementsByTagName("select")
    );
    data = selectors.reduce((acc, currInput) => {
      const { name, selectedIndex } = currInput;
      acc[name] = currInput.options[selectedIndex].value;
      return acc;
    }, data);
    data.type = this.type;
    // const esc = encodeURIComponent;
    // const query = Object.keys(data)
    //   .map((k) => esc(k) + "=" + esc(data[k]))
    //   .join("&");
    fetch(parse("/", new URLSearchParams(data)))
      .then((data) => data.json())
      .then((resources) => {
        Store.dispatch({
          type: "SET_RESOURCES",
          payload: {
            resources,
          },
        });
      })
      .catch((err) => console.log(err));
    document.documentElement.scrollTop = window.innerHeight;
    this.isLoading = false;
  };
}

customElements.define(Library.selector, Library);
