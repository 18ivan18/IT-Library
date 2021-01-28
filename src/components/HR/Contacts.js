import { html } from "lit-html";

import { decorateAsComponent, decorateAsStateProperty } from "../../utils/";

const contactsTemplate = (context) => html`
  <style>
    svg {
      height: 22px;
      margin-bottom: -3px;
      margin-right: 10px;
    }
  </style>
  <section>
    <div class="contact">
      <div class="content">
        <h2>Contact Us</h2>
        <p>Ad culpa do deserunt cillum consectetur eu ullamco.</p>
      </div>
      <div class="container">
        <div class="contact-info">
          <div class="box">
            <div class="icon">
              <svg class="svg-icon" viewBox="0 0 20 20">
                <path
                  d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"
                ></path>
              </svg>
            </div>
            <div class="text">
              <h3>Address</h3>
              <p>Somewher, <br />Some City, <br />Some Postcode</p>
            </div>
          </div>
          <div class="box">
            <div class="icon">
              <svg class="svg-icon" viewBox="0 0 20 20">
                <path
                  d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"
                ></path>
              </svg>
            </div>
            <div class="text">
              <h3>Email</h3>
              <p>Email@email.email</p>
            </div>
          </div>
          <div class="box">
            <div class="icon">
              <svg class="svg-icon" viewBox="0 0 20 20">
                <path
                  d="M13.372,1.781H6.628c-0.696,0-1.265,0.569-1.265,1.265v13.91c0,0.695,0.569,1.265,1.265,1.265h6.744c0.695,0,1.265-0.569,1.265-1.265V3.045C14.637,2.35,14.067,1.781,13.372,1.781 M13.794,16.955c0,0.228-0.194,0.421-0.422,0.421H6.628c-0.228,0-0.421-0.193-0.421-0.421v-0.843h7.587V16.955z M13.794,15.269H6.207V4.731h7.587V15.269z M13.794,3.888H6.207V3.045c0-0.228,0.194-0.421,0.421-0.421h6.744c0.228,0,0.422,0.194,0.422,0.421V3.888z"
                ></path>
              </svg>
            </div>
            <div class="text">
              <h3>Phone</h3>
              <p>088something</p>
            </div>
          </div>
        </div>
      </div>
      <div class="contact-form">
        <form>
          <h2>Send Message</h2>
        </form>
      </div>
    </div>
  </section>
`;

export class Contacts extends HTMLElement {
  static selector = "app-contacts";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    decorateAsComponent(this, contactsTemplate);

    decorateAsStateProperty(this, "isLoading", false);
  }
}

customElements.define(Contacts.selector, Contacts);
