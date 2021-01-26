import { html } from "lit-html";

import { decorateAsComponent, decorateAsStateProperty, parse } from "../utils/";

import { Store } from "../utils/store/store";
import { ifThen } from "../utils";

const printResourcesInfo = (arrOfBooks) =>
  arrOfBooks.map(
    (book) =>
      html`
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
          .card-image {
            grid-area: image;
            background: url(${book.coverURL});
            background-size: cover;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
          }
          .card-text {
            grid-area: text;
            margin: 5%;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .card-text span {
            color: rgb(255, 7, 110);
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
            background: rgb(255, 7, 110);
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
            border-left: 1px solid rgb(172, 26, 87);
            border-right: 1px solid rgb(172, 26, 87);
          }

          .details {
            transition: background-color 0.3s ease-in;
            border-bottom-right-radius: 15px;
          }

          .details:hover {
            background: rgb(172, 26, 87);
            border-bottom-right-radius: 15px;
          }
        </style>
        <div class="card">
          <div class="card-image"></div>
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
    <span>
      <input type="checkbox" name="titleExactMatch"> Exact Match only
    </span>
  </div>
  <div class="form-group">
    <input type="text" id="author" name="author" placeholder="Autor" autocomplete="off"/>
    <span>
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
    <button id="search">Search</button>
  </div>
</form>`;

const libraryTemplate = (context) => html`
  <style>
    .checked {
      background-color: lightcoral;
    }
    .container {
      display: flex;
      flex-direction: column;
      margin: auto;
      align-items: center;
      width: 80vw;
      height: 60vh;
      border: 1px #eee solid;
      background: lightgray;
      z-index: 5;
    }

    .header {
      font-size: 9vw;
      position: absolute;
      transform: rotate(-40deg);
      opacity: 15%;
      letter-spacing: 0.2em;
      left: -3%;
      top: 14%;
      user-select: none;
      z-index: 0;
    }

    #search-form {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 24px;
    }

    input[type="text"],
    select {
      box-sizing: border-box;
      height: 38px;
      width: 360px;
      margin: 8px;
      border: solid 2px #bbc9ba;
      font-size: 14px;
      color: #757575;
      padding: 8px;
    }

    input:hover,
    select:hover {
      border: solid 2px #79a06b;
    }

    #search {
      background-color: #cfe7d9;
      color: #558d3d;
      border: solid 2px #bbc9ba;
      height: 30px;
      margin-top: 2%;
      margin-left: 8px;
      width: 360px;
    }

    #search:hover {
      background-color: #558d3d;
      color: #cfe7d9;
      border: solid 2px #cfe7d9;
    }

    .buttons {
      display: flex;
      justify-content: space-around;
      margin: 20px 0;
    }

    .search h4 {
      text-align: center;
      font-size: 1.5em;
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
    }

    button:hover {
      color: #000000;
      background-color: #ffffff;
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
  </style>
  <h1 class="header">Library</h1>
  <div class="container">
    <div class="search">
      <h4>Search your favourite books</h4>
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
      ${ifThen(context.isLoading, html`<h1>LOADING...</h1>`)}
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
    this.type = e.target.name;
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
    this.isLoading = false;
  };
}

customElements.define(Library.selector, Library);
