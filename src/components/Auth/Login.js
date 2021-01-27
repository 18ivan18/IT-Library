import { html } from "lit-html";

import {
  decorateAsComponent,
  decorateAsStateProperty,
  parse,
  redirect,
} from "../../utils/";
import { Store } from "../../utils/store/store";

const loginTemplate = (context) => html`
  <style>
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
        30px 50px 50px rgba(0, 0, 0, 0.2), -30px 50px 50px rgba(0, 0, 0, 0.2),
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
      width: 90%;
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
    .link {
      text-align: center;
      padding-top: 20px;
    }
    .link a {
      text-decoration: none;
      color: white;
      font-size: 20px;
    }
  </style>
  <div class="body">
    <div class="log-in">
      <div class="logo"></div>
      <div class="title">IT Library</div>
      <div class="sub-title">login</div>
      <form @submit="${context.submitHandler}" id="login-form">
        <div class="form-group">
          <svg class="svg-icon" viewBox="0 0 20 20">
            <path
              d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"
            ></path>
          </svg>
          <input
            id="username"
            type="text"
            name="username"
            value=""
            placeholder="Username"
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
            type="password"
            name="password"
            value=""
            placeholder="Password"
          />
        </div>
        <button class="submit-button" ?disabled=${context.isLoading}>
          Login
        </button>
        <div class="link"><a href="#" is="nav-anchor">Forgot password?</a></div>
      </form>
    </div>
  </div>
`;

export class Login extends HTMLElement {
  static selector = "app-login";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    decorateAsComponent(this, loginTemplate);
    decorateAsStateProperty(this, "isLoading", false);
  }

  submitHandler = (e) => {
    e.preventDefault();
    // TODO: validate
    this.isLoading = true;
    const inputs = Array.from(
      this.shadowRoot.getElementById("login-form").getElementsByTagName("input")
    );
    let formData = new FormData();
    for (const input of inputs) {
      let { value, name } = input;
      formData.append(name, value);
    }
    fetch(parse("login"), {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.success) {
          Store.dispatch({
            type: "LOGIN",
            payload: {
              user: resp.user,
            },
          });
          redirect();
        }
      })
      .catch((err) => console.log(err))
      .finally(() => (this.isLoading = false));
  };
}

customElements.define(Login.selector, Login);
