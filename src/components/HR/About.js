import { html } from "lit-html";

import {
  decorateAsComponent,
  decorateAsStateProperty,
  nextTick,
} from "../../utils/";

const aboutTemplate = (context) => html`<style>
    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    .column {
      float: left;
      width: 33.3%;
      margin-bottom: 16px;
      padding: 0 8px;
    }

    .card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      margin: 8px;
    }

    .about-section {
      padding: 20px;
      text-align: center;
      background-image: linear-gradient(
        90deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(64, 69, 70, 1) 100%
      );
      color: white;
    }

    .container {
      padding: 0 16px;
    }

    .row {
      display: flex;
      justify-content: space-around;
    }

    .title {
      color: grey;
    }

    .team {
      text-align: center;
    }
    .container::after,
    .row::after {
      content: "";
      clear: both;
      display: table;
    }

    img {
      width: 100%;
    }
    button {
      display: inline-block;
      padding: 0.35em 2.3em;
      border: 0.05em solid #ffffff;
      margin: 0 0.3em 0.3em 0;
      border-radius: 0.5em;
      box-sizing: border-box;
      text-decoration: none;
      font-family: "Roboto", sans-serif;
      font-weight: 300;
      background-color: lightgray;
      color: #ffffff;
      text-align: center;
      transition: all 0.2s;
      cursor: pointer;
      width: 100%;
    }

    a {
      color: black;
      text-decoration: none;
    }

    button:hover {
      color: #000000;
      background-color: #ffffff;
    }

    @media screen and (max-width: 650px) {
      .column {
        width: 100%;
        display: block;
        padding: 0;
      }
      .row {
        display: block;
      }
    }
  </style>
  <div class="about-section">
    <h1>About Us Page</h1>
    <p>Some text about who we are and what we do.</p>
  </div>
  <a href="about/us" is="nav-anchor">Us</a>
  <a href="about/contacts" is="nav-anchor">Contacts</a>

  <h2 class="team">Our Team</h2>

  <div class="row">
    <div class="column">
      <div class="card">
        <img
          src="https://scontent.fsof8-1.fna.fbcdn.net/v/t1.0-9/135203019_3955396911139391_7197888626383351276_o.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_ohc=o6gU97Bc7T4AX80CsiZ&_nc_ht=scontent.fsof8-1.fna&oh=cef75ac63f71e4de96447d9bb291340e&oe=603B7506"
          alt="Jane"
        />
        <div class="container">
          <h2>
            <a href="https://github.com/TeodorKanev" target="_blank"
              >Theodor Kanev</a
            >
          </h2>
          <p class="title">CEO & Founder</p>
          <p>Some consectetur sint eiusmod nostrud anim.</p>
          <p>teo@teo.teo</p>
          <p><button class="button">Contact</button></p>
        </div>
      </div>
    </div>

    <div class="column">
      <div class="card">
        <img
          src="https://scontent.fsof8-1.fna.fbcdn.net/v/t1.0-9/138274944_3686494284765582_5066990454707284020_o.jpg?_nc_cat=102&ccb=2&_nc_sid=09cbfe&_nc_ohc=vyLCpUksj64AX-r5Bie&_nc_ht=scontent.fsof8-1.fna&oh=159ad858be0a36fe5654b52a7304e21d&oe=60390537"
          alt="Mike"
        />
        <div class="container">
          <h2>
            <a href="https://github.com/18ivan18" target="_blank"
              >Ivan Arabadzhiyski</a
            >
          </h2>
          <p class="title">Art Director</p>
          <p>Some esse adipisicing esse tempor amet veniam enim.</p>
          <p>ivan@ivan.ivan</p>
          <p><button class="button">Contact</button></p>
        </div>
      </div>
    </div>
  </div> `;

export class About extends HTMLElement {
  static selector = "app-about";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    decorateAsComponent(this, aboutTemplate);
  }

  connectedCallback() {
    nextTick(() => {
      document.documentElement.scrollTop = 200;
    });
  }
}

customElements.define(About.selector, About);
