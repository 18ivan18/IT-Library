import { html } from "lit-html";

import { decorateAsComponent, decorateAsStateProperty, parse } from "../utils/";
import { Store } from "../utils/store/store";
import { redirect } from "../utils";

const uploadBooksTemplate = (context) => {
  if (Store.getState().auth.isLoggedIn) {
    return html` <style>
        .body {
          display: flex;
          justify-content: center;
          font-weight: 300;
        }

        .log-in {
          width: 20vw;
          height: 75vh;
          margin: 5vh 0;
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
            30px 50px 50px rgba(0, 0, 0, 0.2),
            -30px 50px 50px rgba(0, 0, 0, 0.2),
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
          margin-bottom: 30%;
        }

        #file {
          display: none;
        }

        .form-group {
          display: flex;
          border: 4px dashed #fff;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-weight: 500;
          font-size: 20px;
          cursor: pointer;
          color: #cccccc;
        }

        .form-group .text {
          margin: 20% 0;
        }

        .submit-button {
          cursor: pointer;
          border: none;
          outline: none;
          width: 100%;
          height: 60px;
          margin-top: 20%;
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
        .info-message {
          margin-top: 10%;
          text-align: center;
          font-weight: bold;
          font-size: 20px;
        }
        .success {
          color: lightgreen;
        }
        .error {
          color: red;
        }
      </style>
      <div class="body">
        <div class="log-in">
          <div class="logo"></div>
          <div class="title">IT Library</div>
          <div class="sub-title">upload</div>
          <form id="upload-form" @submit=${context.handleUpload}>
            <div
              class="form-group"
              @click=${() => context.shadowRoot.getElementById("file").click()}
              @drop=${context.handleDrop}
              @dragover=${context.handleDragover}
            >
              <div class="text">
                <span for="file"
                  >Drag your files here or click in this area.</span
                >
                ${context.filename
                  ? html`<span>${context.filename} selected.</span>`
                  : ""}
                <input
                  id="file"
                  value=""
                  name="file"
                  type="file"
                  accept=".csv"
                  @change=${context.handleChange}
                />
              </div>
            </div>
            <button class="submit-button">Upload</button>
            ${context.fileUploaded
              ? html`<div class="info-message success">
                  ${context.filename} uploaded
                </div>`
              : ""}
          </form>
        </div>
      </div>`;
  } else {
    redirect("/profile");
  }
};

export class UploadBooks extends HTMLElement {
  static selector = "app-upload-books";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    decorateAsComponent(this, uploadBooksTemplate);

    decorateAsStateProperty(this, "isLoading", false);
    decorateAsStateProperty(this, "file", null);
    decorateAsStateProperty(this, "fileUploaded", false);
    decorateAsStateProperty(this, "filename", null);
  }

  handleUpload = (e) => {
    e.preventDefault();
    this.isLoading = true;
    this.fileUploaded = false;
    const formData = new FormData();
    formData.append("csv", this.file);
    fetch(parse("addBooks"), {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        this.fileUploaded = true;
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  };

  handleChange = (e) => {
    this.file = e.target.files[0] || undefined;
    this.filename = e.target.files[0] ? e.target.files[0].name : undefined;
  };

  handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      this.file = e.dataTransfer.files[0];
      this.filename = e.dataTransfer.files[0].name;
    }
  };

  handleDragover = (e) => {
    e.preventDefault();
  };
}

customElements.define(UploadBooks.selector, UploadBooks);
