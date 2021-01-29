import { html } from "lit-html";

import {
  decorateAsComponent,
  decorateAsStateProperty,
  redirect,
  parse,
} from "../../utils/";
import { Store } from "../../utils/store/store";
import { spinner } from "../Loading/Spinner";

const signupTemplate = (context) => {
  if (!Store.getState().auth.isLoggedIn) {
    return html`
      <style>
        .body {
          display: flex;
          justify-content: center;
          font-weight: 300;
        }

        .log-in {
          position: relative;
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

        .form-group {
          display: flex;
        }

        .form-group input {
          border: none;
          outline: none;
          background: none;
          padding: 10px 10px 10px 5px;
          color: white;
          font-size: 18px;
        }

        .form-group {
          display: block;
          border-bottom: 1px solid #b3b3b3;
          margin-bottom: 30px;
        }
        .form-group svg {
          height: 22px;
          margin-bottom: -3px;
          margin-right: 10px;
        }
        .submit-button {
          cursor: pointer;
          border: none;
          outline: none;
          width: 100%;
          height: 60px;
          margin-top: 10%;
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
        .link {
          text-align: center;
          padding-top: 20px;
        }
        .link a {
          text-decoration: none;
          color: white;
          font-size: 20px;
        }
        #sign {
          font-size: 11vw;
          position: absolute;
          transform: rotate(-140deg);
          bottom: 25%;
          margin: 0;
          opacity: 15%;
          letter-spacing: 0.4em;
          user-select: none;
        }
        #up {
          font-size: 11vw;
          position: absolute;
          opacity: 15%;
          right: 10%;
          bottom: 20%;
          letter-spacing: 0.4em;
          user-select: none;
          margin: 0;
          transition: 0.5s;
        }
        .horizontal {
          transform: rotate(${context.rand}deg);
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
        .failure {
          color: #ffcccb;
        }
        .pizza {
          transform: translateY(-500%) rotate(-60deg);
          width: 100px;
          opacity: 0;
          right: 0;
          position: absolute;
          transition: 1s;
        }
        .pizza:hover {
          opacity: 1;
        }
        .submit-button:disabled,
        .submit-button:disabled:hover {
          border: 1px solid #999999;
          background: #cccccc;
          color: #666666;
        }
        @media screen and (max-width: 1550px) {
          .log-in {
            width: 40vw;
          }
          .submit-button {
            margin-top: 10%;
          }
          #sign,
          #up {
            z-index: 1;
          }
        }
        @media screen and (max-width: 740px) {
          .log-in {
            width: 70vw;
          }
          .submit-button {
            margin-top: 6%;
          }
          #sign,
          #up {
            z-index: 1;
          }
        }
        @media screen and (max-width: 740px) {
          .log-in {
            width: 80vw;
          }
          #sign,
          #up {
            bottom: 70%;
            z-index: 1;
          }
        }
      </style>
      ${spinner(context.isLoading)}
      <h1 id="sign">Sign</h1>
      <h1 id="up" class="horizontal" @click=${context.haveFun}>Up</h1>
      <div class="body">
        <div class="log-in">
          <div class="logo"></div>
          <div class="title">IT Library</div>
          <div class="sub-title">Signup</div>
          <div class="pizza">
            <input type="checkbox" name="pizza" id="pizza" /><label for="pizza"
              >Pizza?</label
            >
          </div>
          <form id="register-form" @submit=${context.handleSubmit}>
            <div class="form-group">
              <svg class="svg-icon" viewBox="0 0 20 20">
                <path
                  d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"
                ></path>
              </svg>
              <input
                id="username"
                value=""
                name="username"
                type="text"
                placeholder="Username"
                autocomplete="off"
              />
            </div>
            <div class="form-group">
              <svg class="svg-icon" viewBox="0 0 20 20">
                <path
                  d="M8.749,9.934c0,0.247-0.202,0.449-0.449,0.449H4.257c-0.247,0-0.449-0.202-0.449-0.449S4.01,9.484,4.257,9.484H8.3C8.547,9.484,8.749,9.687,8.749,9.934 M7.402,12.627H4.257c-0.247,0-0.449,0.202-0.449,0.449s0.202,0.449,0.449,0.449h3.145c0.247,0,0.449-0.202,0.449-0.449S7.648,12.627,7.402,12.627 M8.3,6.339H4.257c-0.247,0-0.449,0.202-0.449,0.449c0,0.247,0.202,0.449,0.449,0.449H8.3c0.247,0,0.449-0.202,0.449-0.449C8.749,6.541,8.547,6.339,8.3,6.339 M18.631,4.543v10.78c0,0.248-0.202,0.45-0.449,0.45H2.011c-0.247,0-0.449-0.202-0.449-0.45V4.543c0-0.247,0.202-0.449,0.449-0.449h16.17C18.429,4.094,18.631,4.296,18.631,4.543 M17.732,4.993H2.46v9.882h15.272V4.993z M16.371,13.078c0,0.247-0.202,0.449-0.449,0.449H9.646c-0.247,0-0.449-0.202-0.449-0.449c0-1.479,0.883-2.747,2.162-3.299c-0.434-0.418-0.714-1.008-0.714-1.642c0-1.197,0.997-2.246,2.133-2.246s2.134,1.049,2.134,2.246c0,0.634-0.28,1.224-0.714,1.642C15.475,10.331,16.371,11.6,16.371,13.078M11.542,8.137c0,0.622,0.539,1.348,1.235,1.348s1.235-0.726,1.235-1.348c0-0.622-0.539-1.348-1.235-1.348S11.542,7.515,11.542,8.137 M15.435,12.629c-0.214-1.273-1.323-2.246-2.657-2.246s-2.431,0.973-2.644,2.246H15.435z"
                ></path>
              </svg>
              <input
                id="name"
                value=""
                name="name"
                type="text"
                placeholder="Name"
                autocomplete="off"
              />
            </div>
            <div class="form-group">
              <svg class="svg-icon" viewBox="0 0 20 20">
                <path
                  d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"
                ></path>
              </svg>
              <input
                id="email"
                value=""
                name="email"
                type="text"
                placeholder="Email"
                autocomplete="off"
              />
            </div>
            <div class="form-group">
              <svg class="svg-icon" viewBox="0 0 20 20">
                <path
                  d="M17.308,7.564h-1.993c0-2.929-2.385-5.314-5.314-5.314S4.686,4.635,4.686,7.564H2.693c-0.244,0-0.443,0.2-0.443,0.443v9.3c0,0.243,0.199,0.442,0.443,0.442h14.615c0.243,0,0.442-0.199,0.442-0.442v-9.3C17.75,7.764,17.551,7.564,17.308,7.564 M10,3.136c2.442,0,4.43,1.986,4.43,4.428H5.571C5.571,5.122,7.558,3.136,10,3.136 M16.865,16.864H3.136V8.45h13.729V16.864z M10,10.664c-0.854,0-1.55,0.696-1.55,1.551c0,0.699,0.467,1.292,1.107,1.485v0.95c0,0.243,0.2,0.442,0.443,0.442s0.443-0.199,0.443-0.442V13.7c0.64-0.193,1.106-0.786,1.106-1.485C11.55,11.36,10.854,10.664,10,10.664 M10,12.878c-0.366,0-0.664-0.298-0.664-0.663c0-0.366,0.298-0.665,0.664-0.665c0.365,0,0.664,0.299,0.664,0.665C10.664,12.58,10.365,12.878,10,12.878"
                ></path>
              </svg>
              <input
                id="password"
                value=""
                name="password"
                type="password"
                placeholder="Password"
                autocomplete="off"
              />
            </div>

            ${context.successMessage
              ? html`<div class="info-message success">
                  ${context.successMessage}
                </div>`
              : ""}
            ${context.errorMessage
              ? html`<div class="info-message failure">
                  ${context.errorMessage}
                </div>`
              : ""}
            <button class="submit-button" ?disabled=${context.isLoading}>
              Register
            </button>
          </form>
        </div>
      </div>
    `;
  } else {
    redirect("/profile");
  }
};

export class Signup extends HTMLElement {
  static selector = "app-signup";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    decorateAsComponent(this, signupTemplate);

    decorateAsStateProperty(this, "isLoading", true);
    decorateAsStateProperty(this, "errorMessage", null);
    decorateAsStateProperty(this, "successMessage", null);
    decorateAsStateProperty(this, "rand", Math.random() * 60 + 120);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.errorMessage = null;
    this.successMessage = null;
    this.isLoading = true;
    const inputs = Array.from(
      this.shadowRoot
        .getElementById("register-form")
        .getElementsByTagName("input")
    );
    let formData = new FormData();
    for (const input of inputs) {
      let { value, name } = input;
      formData.append(name, value);
    }
    // formData.append("pizza", this.shadowRoot.getElementById("pizza").checked);
    fetch(parse("signup"), {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.success) {
          this.successMessage = "Successfully signed up!";
          setTimeout(() => {
            redirect("/login");
          }, 1000);
        } else {
          this.errorMessage = resp.message;
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.isLoading = false;
      });
  };

  haveFun = () => {
    if (this.shadowRoot.getElementById("up")) {
      if (
        this.shadowRoot.getElementById("up").classList.contains("horizontal")
      ) {
        this.shadowRoot.getElementById("up").classList.remove("horizontal");
      } else {
        this.shadowRoot.getElementById("up").classList.add("horizontal");
      }
    }
  };

  connectedCallback() {
    this.isLoading = false;
  }
}

customElements.define(Signup.selector, Signup);
