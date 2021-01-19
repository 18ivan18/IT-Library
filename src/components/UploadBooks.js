import { html } from "lit-html";

import { decorateAsComponent } from "../utils/decorate-as-component.js";
import { decorateAsStateProperty } from "../utils/decorate-as-state-property.js";
import { Store } from "../utils/store/store";
import { redirect } from "../utils";
import { config } from "./../../config";

const uploadBooksTemplate = (context) => {
  if (Store.getState().auth.isLoggedIn) {
    return html`<form id="upload-form">
      <div class="form-group">
        <label for="file">Upload file</label>
        <input
          id="file"
          value=""
          name="file"
          type="file"
          accept="image/png, image/jpeg"
          multiple
        />
      </div>
      <button @click=${context.handleUpload}>Upload</button>
    </form>`;
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
  }

  handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const fileField = this.shadowRoot.querySelector('input[type="file"]');
    formData.append("username", Store.getState().auth.user.username);
    formData.append("avatar", fileField.files[0]);
    fetch(config.api.url + "addBooks/", {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
}

customElements.define(UploadBooks.selector, UploadBooks);
