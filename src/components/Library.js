import { html } from "lit-html";

import { decorateAsComponent } from "../utils/decorate-as-component.js";
import { decorateAsStateProperty } from "../utils/decorate-as-state-property.js";

import { Store } from "../utils/store/store";
import { ifThen } from "../utils";
import { config } from "../../config";

const printResourcesInfo = (arrOfBooks) =>
  arrOfBooks.map(
    (book) =>
      html`
        <style>
          .card-wrapper {
            background-color: #12aa12;
            border: 2px solid black;
            display: flex;
          }
          div {
            margin: 10px;
          }
        </style>
        <div class="card-wrapper">
          <div>Title: ${book.title}</div>
          <div>Type: ${book.type}</div>
          <div>Description: ${book.description}</div>

          ${book.available
            ? html`<div>${book.count + " copies left"}</div>
                <button>Get it now</button>`
            : html`<div>Not available</div>`}
        </div>
      `
  );

const basicFormRender = (
  handleSubmit
) => html` <form id="search-form" @submit=${handleSubmit}>
  <div class="form-group" >
    <label for="title">Title</label>
    <input type="text" id="title" name="title"/>
    <span>
      <input type="checkbox" name="titleExactMatch"> Exact Match only
    </span>
  </div>
    <div class="form-group">
    <label for="author">Author</label>
    <input type="text" id="author" name="author"/>
    <span>
      <input type="checkbox" name="authorExactMatch"> Exact Match only
    </span>
   </div>
    <div class="form-group">
    <label for="tags">Tags</label>
    <input type="text" id="tags" name="tags"/>
   </div>
   <label for="property">Sort by:</label>
    <select name="property" id="property" class="form-group">
      <option value="author">Author</option>
      <option value="title">Title</option>
      <option value="date">Registration Date</option>
    </select>
    <select name="order" id="order" class="form-group">
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
    <button>Search</button>
  </div>
</form>`;

const libraryTemplate = (context) => html`
  <h1>Library</h1>
  <div>
    <h4>Search</h4>
    <button>Users</button><button>Paper</button><button>Book</button>
    ${basicFormRender(context.handleSubmit)}
    ${ifThen(context.isLoading, html`<h1>LOADING...</h1>`)}
    ${printResourcesInfo(context.resources)}
  </div>
`;

export class Library extends HTMLElement {
  static selector = "app-library";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    decorateAsComponent(this, libraryTemplate);

    decorateAsStateProperty(this, "isLoading", false);
    decorateAsStateProperty(this, "auth", Store.getState().auth);
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
    const esc = encodeURIComponent;
    const query = Object.keys(data)
      .map((k) => esc(k) + "=" + esc(data[k]))
      .join("&");
    fetch(config.api.url + "?" + query)
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
