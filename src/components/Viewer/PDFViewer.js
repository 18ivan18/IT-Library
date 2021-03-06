import { html } from "lit-html";

import {
  decorateAsComponent,
  decorateAsStateProperty,
  nextTick,
  parse,
  Store,
} from "../../utils/";
import { spinner } from "../Loading/Spinner";

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
      height: 85vh;
      overflow: auto;
      background: #333;
      text-align: center;
      border: solid 3px;
    }
    #navigation-controls,
    #zoom-controls {
      display: flex;
      justify-content: center;
      margin-bottom: 5px;
      margin-top: 5px;
    }
    button {
      margin: 0 10px;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .tooltip {
      position: relative;
    }

    .tooltip::before,
    .tooltip::after {
      --scale: 0;
      --arrow-size: 10px;
      --tooltip-color: #333;

      position: absolute;
      top: -0.25rem;
      left: 50%;
      transform: translateX(-50%) translateY(var(--translate-y, 0))
        scale(var(--scale));
      transition: 150ms transform;
      transform-origin: bottom center;
    }

    .tooltip::before {
      --translate-y: calc(-100% - var(--arrow-size));

      content: "Copied to clipboard!";
      color: white;
      padding: 0.5rem;
      border-radius: 0.3rem;
      text-align: center;
      width: max-content;
      background: var(--tooltip-color);
    }

    .tooltip::before,
    .tooltip::after {
      --scale: 1;
    }

    .tooltip::after {
      --translate-y: calc(-1 * var(--arrow-size));

      content: "";
      border: var(--arrow-size) solid transparent;
      border-top-color: var(--tooltip-color);
      transform-origin: top center;
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
  </style>
  ${spinner(context.isLoading)}
  <div id="my-pdf-viewer">
    <div id="canvas-container">
      <canvas
        @mousemove=${context.mouseMove}
        @mousedown=${context.mouseDown}
        @mouseup=${context.mouseUp}
        id="pdf-renderer"
      ></canvas>
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
      <button @click=${context.copyToClipboard} id="quote-button">
        Quote!
      </button>
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
    decorateAsStateProperty(this, "auth", Store.getState().auth);
    decorateAsStateProperty(this, "state", {
      pdf: null,
      currentPage: 1,
      zoom: 1,
    });
    this.id = id;
  }

  connectedCallback() {
    nextTick(() => {
      this.isLoading = true;
      pdfjsLib
        .getDocument(
          parse(
            "getPDFDocument",
            new URLSearchParams({
              id: this.id,
              username: this.auth.user.username,
            })
          )
        )
        .then((pdf) => {
          this.state.pdf = pdf;
          render(this);
        })
        .catch(console.log)
        .finally(() => {
          this.isLoading = false;
        });
      this.ctx = this.shadowRoot
        .getElementById("pdf-renderer")
        .getContext("2d");
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

    const code = e.keyCode ? e.keyCode : e.which;

    if (code == 13) {
      const desiredPage = this.shadowRoot.getElementById("current-page")
        .valueAsNumber;

      if (desiredPage >= 1 && desiredPage <= this.state.pdf._pdfInfo.numPages) {
        this.state.currentPage = desiredPage;
        this.shadowRoot.getElementById("current-page").value = desiredPage;
        render(this);
      } else {
        this.shadowRoot.getElementById(
          "current-page"
        ).value = this.state.currentPage;
      }
    }
  };

  copyToClipboard = (e) => {
    this.isLoading = true;
    fetch(parse("quote", new URLSearchParams({ id: this.id })))
      .then((data) => data.json())
      .then((json) => {
        const aux = document.createElement("input");

        aux.setAttribute("value", json.quote);

        document.body.appendChild(aux);

        aux.select();

        document.execCommand("copy");

        document.body.removeChild(aux);
        this.shadowRoot.getElementById("quote-button").classList.add("tooltip");

        setTimeout(() => {
          this.shadowRoot
            .getElementById("quote-button")
            .classList.remove("tooltip");
        }, 2000);
      })
      .catch(console.log)
      .finally(() => {
        this.isLoading = false;
      });
  };

  mouseUp = (e) => {
    this.painting = false;
    this.ctx.beginPath();
    this.mouseMove(e);
  };
  mouseDown = (e) => {
    this.painting = true;
  };
  mouseMove = (e) => {
    if (!this.painting) return;
    this.ctx.lineWidth = 10;
    this.ctx.lineCap = "round";
    const canvasContainer = this.shadowRoot.getElementById("canvas-container");
    const pdfRenderer = this.shadowRoot.getElementById("pdf-renderer");
    const offsetX =
        -(canvasContainer.offsetWidth - pdfRenderer.offsetWidth) / 2,
      offsetY = -canvasContainer.offsetTop + canvasContainer.scrollTop;
    const targetX = e.clientX + offsetX,
      targetY = e.clientY + offsetY;
    this.ctx.lineTo(targetX, targetY);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(targetX, targetY);
  };
}

customElements.define(PDFViewer.selector, PDFViewer);
