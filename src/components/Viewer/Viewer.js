import { html } from "lit-html";

import {
  decorateAsComponent,
  decorateAsStateProperty,
  nextTick,
  parse,
} from "../../utils/";

const render = (self) => {
  const state = self.state;
  state.pdf.getPage(state.currentPage).then((page) => {
    const canvas = self.shadowRoot.getElementById("pdf-renderer");
    const ctx = canvas.getContext("2d");

    const viewport = page.getViewport(state.zoom);

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    page.render({
      canvasContext: ctx,
      viewport: viewport,
    });
  });
};

const PDFViewerTemplate = (context) => html`
  <style>
    #canvas-container {
      width: 100%;
      height: 80vh;
      overflow: auto;
      background: #333;
      text-align: center;
      border: solid 3px;
    }
    #navigation-controls,
    #zoom-controls {
      display: flex;
      justify-content: center;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  </style>
  <div id="my-pdf-viewer">
    <div id="canvas-container">
      <canvas id="pdf-renderer"></canvas>
    </div>

    <div id="navigation-controls">
      <button id="go-previous" @click=${context.pageChange}>Previous</button>
      <input
        id="current-page"
        value="1"
        type="number"
        @keypress=${context.pageChangeByNumber}
      />
      <button id="go-next" @click=${context.pageChange}>Next</button>
    </div>

    <div id="zoom-controls">
      <button id="zoom-in" @click=${context.zoom}>+</button>
      <button id="zoom-out" @click=${context.zoom}>-</button>
    </div>
  </div>
`;

export class PDFViewer extends HTMLElement {
  static selector = "app-pdf-viewer";

  constructor({ id }) {
    super();
    this.attachShadow({ mode: "open" });

    decorateAsComponent(this, PDFViewerTemplate);
    decorateAsStateProperty(this, "isLoading", false);
    decorateAsStateProperty(this, "state", {
      pdf: null,
      currentPage: 1,
      zoom: 1,
    });
  }

  connectedCallback() {
    nextTick(() => {
      pdfjsLib
        .getDocument(parse("getPDFDocument"))
        .then((pdf) => {
          this.state.pdf = pdf;
          render(this);
        })
        .catch((err) => console.log(err));
    });
  }

  pageChange = (e) => {
    if (
      this.state.pdf == null ||
      (this.state.currentPage == 1 && e.target.id === "go-previous") ||
      (this.state.currentPage >= this.state.pdf._pdfInfo.numPages &&
        e.target.id === "go-next")
    )
      return;

    this.state.currentPage += e.target.id === "go-next" ? 1 : -1;
    this.shadowRoot.getElementById(
      "current-page"
    ).value = this.state.currentPage;
    render(this);
  };

  zoom = (e) => {
    if (this.state.pdf == null) return;
    this.state.zoom += e.target.id === "zoom-in" ? 0.5 : -0.5;

    render(this);
  };
  pageChangeByNumber = (e) => {
    if (this.state.pdf == null) return;

    // Get key code
    const code = e.keyCode ? e.keyCode : e.which;

    // If key code matches that of the Enter key
    if (code == 13) {
      const desiredPage = this.shadowRoot.getElementById("current-page")
        .valueAsNumber;

      if (desiredPage >= 1 && desiredPage <= this.state.pdf._pdfInfo.numPages) {
        this.state.currentPage = desiredPage;
        this.shadowRoot.getElementById("current-page").value = desiredPage;
        render(this);
      }
    }
  };
}

customElements.define(PDFViewer.selector, PDFViewer);
