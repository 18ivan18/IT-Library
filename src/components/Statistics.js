import { html } from "lit-html";

import {
  decorateAsComponent,
  decorateAsStateProperty,
  nextTick,
  parse,
} from "../utils/";

const statisticsTemplate = (context) => html`<p>Statistics</p>
  <p>FUNCITONALITY STILL NOT IMPLEMENTED</p>
  <form id="search-form">
    <label for="sortBy">Search for:</label>
    <select
      name="searchFor"
      id="searchFor"
      class="form-group"
      @change=${context.onSelectChange}
    >
      <option value="all">All</option>
      <option value="book">Book</option>
      <option value="paper">Paper</option>
    </select>
    <select
      name="order"
      id="order"
      class="form-group"
      @change=${context.onSelectChange}
    >
      <option value="mostPopular">Most popular</option>
      <option value="newest">Newest</option>
    </select>
  </form>
  ${context.resources.map(
    (r) => html`<div>
      <p>Book: ${r.name} has been taken ${r.timesTaken} times!</p>
    </div>`
  )}`;

export class Statistics extends HTMLElement {
  static selector = "app-statistics";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    decorateAsComponent(this, statisticsTemplate);

    decorateAsStateProperty(this, "isLoading", false);
    decorateAsStateProperty(this, "resources", [
      { name: "Book1", timesTaken: 5 },
      { name: "book2", timesTaken: 2 },
    ]);
  }

  getResources = () => {
    // this.isLoading = true;
    // const selectors = Array.from(
    //   this.shadowRoot
    //     .getElementById("search-form")
    //     .getElementsByTagName("select")
    // );
    // const data = selectors.reduce((acc, currInput) => {
    //   const { name, selectedIndex } = currInput;
    //   acc[name] = currInput.options[selectedIndex].value;
    //   return acc;
    // }, {});
    // fetch(parse("statistics", new URLSearchParams(data)))
    //   .then((data) => data.json())
    //   .then((json) => {
    //     this.resources = json;
    //   })
    //   .catch(console.log)
    //   .finally(() => {
    //     this.isLoading = false;
    //   });
  };

  onSelectChange = (e) => {
    this.getResources();
  };

  connectedCallback() {
    nextTick(this.getResources);
  }
}

customElements.define(Statistics.selector, Statistics);
