import { html } from "lit-html";

import {
  decorateAsComponent,
  decorateAsStateProperty,
  parse,
  redirect,
} from "../../utils/";
import { Store } from "../../utils/store/store";
import { spinner } from "../Loading/Spinner";

const bookViewerTemplate = (context) => {
  if (context.book) {
    return html` <style>
        .body {
          background-color: #fafafa;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 93vh;
        }
        .cover {
          width: calc(12px * 100);
          height: calc(12px * 70);
          box-shadow: 0 0 100px rgba(0, 0, 0, 0.3);
        }
        .book {
          width: 100%;
          height: 100%;
          display: flex;
          perspective: 1200px;
        }
        .book__page {
          position: relative;
          width: 50%;
          height: 100%;
          display: grid;
          transform: rotateY(0deg);
          transition: transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1);
          transform-origin: 0% 0%;
          background-color: #f5f5f5;
          background-image: linear-gradient(
            90deg,
            #e3e3e3 0%,
            rgba(247, 247, 247, 0) 18%
          );
        }
        .book__page:nth-of-type(1) {
          background-image: linear-gradient(
            -90deg,
            #e3e3e3 0%,
            rgba(247, 247, 247, 0) 18%
          );
        }
        .book__page--1 {
          overflow: hidden;
        }
        .book__page--1 img {
          width: 100%;
          max-width: 100%;
          height: auto;
        }
        .book__page-front {
          position: absolute;
          width: 100%;
          height: 100%;
          transform: rotateY(0deg) translateZ(1px);
        }
        .book__page .page__content {
          padding: 12px;
          height: 100%;
          position: relative;
          text-align: center;
        }
        .book__page .page__content-book-title {
          font-family: "Tulpen One", sans-serif;
          font-size: calc(14px * 3);
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #2a2935;
          margin-top: calc(12px * 5);
          margin-bottom: calc(12px * 2);
        }
        .book__page .page__content-author {
          font-family: "Cormorant Garamond", serif;
          font-size: calc(14px * 1.2);
          font-weight: 100;
          text-transform: uppercase;
          color: #2a2935;
          border-top: 1px solid #2a2935;
          border-bottom: 1px solid #2a2935;
          display: inline-block;
          padding: calc(12px / 2) calc(12px / 5);
          margin-bottom: calc(12px * 3);
        }

        .book__page .page__content-blockquote {
          margin-bottom: calc(var(--baseline) * 2);
        }
        .book__page .page__content-blockquote-text {
          font-family: var(--title);
          font-size: calc(var(--base-size) * 0.67);
          font-style: italic;
          text-align: justify;
        }
        .book__page .page__content-credits {
          font-family: "Cormorant Garamond", serif;
          text-transform: uppercase;
          font-size: calc(14px * 1.8);
          margin-bottom: calc(12px * 2);
          letter-spacing: 1px;
        }
        .book__page .page__content-credits span {
          display: block;
          font-size: calc(14px * 1.2);
          letter-spacing: 0;
        }
        .book__page .page__content-copyright {
          position: absolute;
          width: calc(100% - (12px * 2));
          bottom: calc(12px * 2);
          font-family: "Cormorant Garamond", serif;
          font-size: calc(14px * 0.8);
          text-transform: uppercase;
        }
        .page__content-block {
          display: flex;
          justify-content: space-around;
        }
        .order {
          cursor: pointer;
          transition: 0.3s;
          padding: 0 5%;
        }
        .order:hover {
          border: 1px #333 solid;
          border-radius: 20px;
          transform: scale(1.2);
          box-shadow: 10px 10px 8px #888888;
        }
        .info-message {
          text-align: center;
          font-weight: bold;
          font-size: 20px;
        }
        .success {
          color: lightgreen;
        }
        .failure {
          color: #ffcccb;
        }
      </style>
      ${spinner(context.isLoading)}
      <div class="body">
        <div class="cover">
          <div class="book">
            <label for="page-1" class="book__page book__page--1">
              <img src=${context.book.coverURL} alt="" />
            </label>

            <label class="book__page book__page--2">
              <div class="book__page-front">
                <div class="page__content">
                  <h1 class="page__content-book-title">
                    ${context.book.title}
                  </h1>
                  <h2 class="page__content-author">${context.book.author}</h2>

                  <div class="page__content-blockquote">
                    <p class="page__content-blockquote-text">
                      ${context.book.description}
                    </p>
                  </div>

                  <div class="page__content-block">
                    <p class="page__content-credits">
                      ${context.book.count > 0 ? context.book.count : "Not"}
                      <span>
                        ${context.book.count > 0 ? "left" : "available"}</span
                      >
                    </p>

                    <p
                      class="page__content-credits order"
                      @click=${context.book.count > 0
                        ? context.getBook
                        : () => {
                            redirect("/contacts");
                          }}
                    >
                      ${context.book.count > 0 ? "Get it" : "Contact"}
                      <span> ${context.book.count > 0 ? "NOW" : "us"}</span>
                    </p>
                  </div>

                  ${context.successMessage
                    ? html`<div class="info-message success">
                        ${context.successMessage}
                      </div>`
                    : ""}
                  <div class="page__content-copyright">
                    <p>${context.book.type}</p>
                    <p>${context.book.year}Bulgaria - XXI</p>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>`;
  }
  return "";
};

export class BookViewer extends HTMLElement {
  static selector = "app-book-viewer";

  constructor({ id }) {
    super();
    this.attachShadow({ mode: "open" });

    decorateAsComponent(this, bookViewerTemplate);

    decorateAsStateProperty(this, "isLoading", false);
    decorateAsStateProperty(this, "book", null);
    decorateAsStateProperty(this, "errorMessage", null);
    decorateAsStateProperty(this, "successMessage", null);
    decorateAsStateProperty(this, "auth", Store.getState().auth);
    this.id = id;
    Store.subscribe((action) => {
      if (action.type === "LOGIN" || action.type === "LOGOUT") {
        this.auth = Store.getState().auth;
      }
    });
  }

  connectedCallback() {
    this.isLoading = true;
    fetch(parse("book", new URLSearchParams({ id: this.id })))
      .then((resp) => resp.json())
      .then((json) => (this.book = json.book))
      .catch(console.log)
      .finally(() => {
        this.isLoading = false;
      });
  }

  getBook = () => {
    this.isLoading = true;
    this.successMessage = null;
    if (!this.auth.isLoggedIn) {
      this.errorMessage = "You must be logged in to get a book!";
      redirect("/login");
      return;
    }
    const formData = new FormData();
    formData.append("username", this.auth.user.username);
    formData.append("id", this.id);
    fetch(parse("buyBook"), {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.success) {
          this.successMessage = json.message;
        }
      })
      .catch(console.log)
      .finally(() => {
        this.isLoading = false;
      });
  };
}

customElements.define(BookViewer.selector, BookViewer);
