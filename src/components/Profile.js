import { html } from "lit-html";

import {
  decorateAsComponent,
  decorateAsStateProperty,
  ifThen,
  isLate,
  parse,
  getBooks,
  getDateFormat,
} from "../utils";
import { Store } from "../utils/store/store";
import { redirect } from "../utils";
import { spinner } from "./Loading/Spinner";

const bookHistoryTemplate = ({ book, context }) => html`<div class="title">
    <img src=${book.coverURL} alt="book cover image" />
    <a href="/books/${book.id}" is="nav-anchor">${book.name}</a>
  </div>
  <div class="author">
    <a
      is="nav-anchor"
      href="library"
      @click=${(e) => {
        getBooks({ author: book.author }, context);
      }}
      >${book.author}</a
    >
  </div>
  ${ifThen(
    book.dateReturned,
    html` <p class="history-info">
      You took on the ${getDateFormat(new Date(book.dateTaken))} and returned it
      on the ${getDateFormat(new Date(book.dateReturned))}. You can no longer
      read it.
    </p>`
  )}
  ${ifThen(
    !book.dateReturned && isLate(book.dateTaken, book.daysToBeHeld),
    html`<div class="history-info ">
      <p class="late">
        You are late! You should've returned the book at
        ${getDateFormat(
          new Date(
            +new Date(book.dateTaken) + book.daysToBeHeld * 24 * 60 * 60 * 1000
          )
        )}.
        Return ${book.name} as soon as possible.
      </p>
      <button @click=${() => context.returnBook(book.id)}>
        Return the book!
      </button>
    </div>`
  )}
  ${ifThen(
    !book.dateReturned && !isLate(book.dateTaken, book.daysToBeHeld),
    html`<div class="history-info">
      <p>
        ${book.name} can still be read until
        ${getDateFormat(
          new Date(
            +new Date(book.dateTaken) + book.daysToBeHeld * 24 * 60 * 60 * 1000
          )
        )}
      </p>
      <button @click=${() => redirect(`/view/${book.id}`)}>Read now!</button>
      <button @click=${() => context.returnBook(book.id)}>
        Return the book!
      </button>
    </div>`
  )}`;

const profileTemplate = (context) => {
  if (context.auth.isLoggedIn) {
    return html`
      <style>
        .late {
          color: red;
        }
        .personal-info {
          background: white;
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
        }
        .personal-info h3,
        .th {
          text-align: center;
          text-transform: uppercase;
        }
        .th {
          background-color: lightskyblue;
        }
        .stats {
          text-transform: uppercase;
          font-weight: bold;
        }
        .container {
          margin: 3% 7%;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2em;
        }
        .buttons {
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin: 5% 0px;
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
        }

        button:hover {
          color: #000000;
          background-color: #ffffff;
        }

        .personal-info img {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .book-history {
          background: white;
          height: 100%;
          display: grid;
          grid-template-rows: 20px auto;
          grid-template-columns: 1fr 1fr 2fr;
          height: 85vh;
          overflow-y: scroll;
          grid-row-gap: 30px;
        }

        .info {
          margin-top: 4%;
          margin-bottom: 4%;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .info p {
          padding: 10px 15%;
          margin: 0;
        }

        .title {
          display: flex;
          justify-content: middle;
        }

        .title a,
        .author,
        .history-info {
          text-align: center;
          margin: 0;
          margin: auto;
        }

        .title img {
          width: 100px;
          height: 150px;
        }
        @media screen and (max-width: 1550px) {
          .container {
            display: block;
          }
          .personal-info {
            flex-direction: row;
            margin: 5% 0;
          }
          .personal-info h3 {
            display: none;
          }
        }
      </style>
      ${spinner(context.isLoading)}
      <div class="container">
        <div class="personal-info">
          <h3>Personal details</h3>
          <img src=${context.auth.user.profilePicture} alt="Profile picture" />
          <div class="info">
            <p class="stats">Name</p>
            <p>${context.auth.user.name}</p>
            <p class="stats">Username</p>
            <p>${context.auth.user.username}</p>
            <p class="stats">Phone</p>
            <p>${context.auth.user.phone}</p>

            <p class="stats">Email</p>
            <p>${context.auth.user.email}</p>
            <p class="stats">Website</p>
            <p>${context.auth.user.website}</p>
            <p class="stats">Resources</p>
            <p>${context.auth.user.points}</p>
          </div>
          <div class="buttons">
            <button @click=${() => redirect("/import")}>Upload books 📚</button>
            <button @click=${context.orderPizza}>Order pizza 🍕</button>
            <button>Update profile 👨‍🏫</button>
          </div>
        </div>
        <div class="book-history">
          <h3 class="th">Title</h3>
          <h3 class="th">Author</h3>
          <h3 class="th">Info</h3>
          ${context.history.map((book) =>
            bookHistoryTemplate({ book, context })
          )}
        </div>
      </div>
    `;
  } else {
    redirect("/login");
  }
};

export class Profile extends HTMLElement {
  static selector = "app-profile";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    decorateAsComponent(this, profileTemplate);

    decorateAsStateProperty(this, "isLoading", false);
    decorateAsStateProperty(this, "auth", Store.getState().auth);
    decorateAsStateProperty(this, "history", []);

    Store.subscribe((action) => {
      if (action.type === "LOGIN" || action.type === "LOGOUT") {
        this.auth = Store.getState().auth;
      }
    });
  }

  orderPizza = (e) => {
    if (this.auth.user.pizza) {
      window.open(
        "https://www.dominos.bg/menu/sofia-student-city#deals",
        "_blank"
      );
    }
  };

  getHistory = () => {
    this.isLoading = true;
    fetch(
      parse(
        "history",
        new URLSearchParams({ username: this.auth.user.username })
      )
    )
      .then((resp) => resp.json())
      .then((json) => {
        this.history = json.history;
      })
      .catch(console.log)
      .finally(() => {
        this.isLoading = false;
      });
  };

  connectedCallback() {
    if (this.auth.isLoggedIn) {
      this.getHistory();
    }
  }

  returnBook = (id) => {
    this.isLoading = true;
    const formData = new FormData();
    formData.append("username", this.auth.user.username);
    formData.append("id", id);
    fetch(parse("returnBook"), {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.success) {
          this.getHistory();
        }
      })
      .catch(console.log)
      .finally(() => {
        this.isLoading = false;
      });
  };
}

customElements.define(Profile.selector, Profile);
