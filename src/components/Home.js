import { html } from "lit-html";

import { decorateAsComponent } from "../utils/";
import { NavAnchor } from "./CustomElements/NavAnchor";

const homePageTemplate = (context) => html`
  <style>
    section {
      background-image: url(https://accomplishonline.com/wp-content/uploads/2019/06/cropped-homepage1-1.png);
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      color: #dddddd;
    }

    #first {
      text-align: center;
    }

    .big-text {
      font-size: 7vw;
      margin: 0;
      padding: 50px 20px;
    }

    .quotes {
      display: flex;
      justify-content: space-evenly;
    }

    .quote {
      width: 12vw;
      font-size: 1.5em;
      font-weight: bold;
    }

    .headline {
      text-align: center;
      font-size: 3vw;
      margin-top: 30px;
      margin-bottom: 0;
    }

    p {
      margin-left: 10%;
      margin-right: 10%;
      font-size: 1.5vw;
    }

    .buttons {
      display: flex;
      justify-content: space-evenly;
    }

    a {
      display: inline-block;
      padding: 0.35em 2.3em;
      border: 0.05em solid #ffffff;
      margin: 0 0.3em 0.3em 0;
      border-radius: 0.12em;
      box-sizing: border-box;
      text-decoration: none;
      font-family: "Roboto", sans-serif;
      font-weight: 300;
      background-color: transparent;
      color: #ffffff;
      text-align: center;
      transition: all 0.2s;
      font-size: 40px;
      cursor: pointer;
    }

    a:hover {
      color: #000000;
      background-color: #ffffff;
    }
  </style>
  <section>
    <div id="first">
      <h1 class="big-text">What is IT Library?</h1>
      <div class="quotes">
        <div class="quote">if you love your books, let them go</div>
        <div class="quote">an unlikely global sociology experiment</div>
        <div class="quote">a modern-day message in a bottle</div>
      </div>
    </div>
    <article>
      <h2 class="headline">IT Library</h2>
      <p>
        IT library is ... Nulla ut voluptate aliquip in incididunt magna.
        Consequat aute sint enim cillum eu aliquip mollit labore eu culpa est
        irure eiusmod. Mollit cupidatat pariatur ullamco mollit velit incididunt
        est voluptate ad esse ea. Qui occaecat ea qui esse elit reprehenderit ad
        consectetur aute culpa ad cillum est. Mollit adipisicing exercitation
        est consectetur ea incididunt excepteur anim. Ut voluptate incididunt
        veniam labore ullamco. Duis est nulla quis exercitation consectetur
        pariatur qui cillum dolor.
      </p>
    </article>
    <article>
      <h2 class="headline">New books added</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam sequi
        saepe distinctio hic perferendis similique ad id corporis animi delectus
        eius, nostrum omnis placeat suscipit natus labore obcaecati fugiat?
        Doloribus!
      </p>
    </article>
    <article>
      <h2 class="headline">
        Become part of the revolutionary worldwide booksharing system!
      </h2>
      <p>
        Ad dolore in ea irure do eu sunt ullamco est nulla ex exercitation
        officia deserunt. Dolore ad minim pariatur ut sint laborum occaecat.
        Amet deserunt enim enim deserunt pariatur. Consectetur qui Lorem sit non
        cillum laboris.
      </p>
    </article>
    <article>
      <h3 class="headline">
        Book sharing – a great way to help our environment.
      </h3>
      <p>
        We can share books through different ways such as sharing between
        friends or family members or using libraries. You will also read about
        another way to share books.
      </p>
      <p>
        Dolor sit magna ad labore incididunt in tempor eu sint amet. Aute
        deserunt velit eiusmod tempor veniam minim occaecat est excepteur
        nostrud tempor minim. Adipisicing proident aute enim fugiat cupidatat et
        dolor. Reprehenderit id nulla esse irure aliqua magna nisi qui minim. Et
        commodo aliqua aliqua minim do adipisicing est aute. Aliquip in ea
        nostrud excepteur qui irure dolor ut nisi officia ipsum non amet.
        Officia deserunt duis veniam ut. Minim aliquip aliqua est enim. Tempor
        irure do cupidatat voluptate in. Mollit reprehenderit nostrud occaecat
        excepteur reprehenderit in veniam. Dolor labore commodo tempor in culpa
        aliqua mollit esse consectetur id. Est minim commodo dolor dolor.
      </p>
    </article>
    <div class="buttons">
      <a href="/aboutus" is="nav-anchor">About Us</a>
      <a href="/contacts" is="nav-anchor">Contact</a>
      <a href="/signup" is="nav-anchor">Sign Up 🐔</a>
    </div>
  </section>
`;

export class Home extends HTMLElement {
  static selector = "app-home-page";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    decorateAsComponent(this, homePageTemplate);
  }
}

customElements.define(Home.selector, Home);
