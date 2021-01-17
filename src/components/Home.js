import { html } from "lit-html";
// import { ifThen } from './directives/if-then.js';

import { decorateAsComponent } from "../utils/decorate-as-component.js";
import { decorateAsStateProperty } from "../utils/decorate-as-state-property.js";
import { Store } from "../utils/store/store.js";

const homePageTemplate = (context) => html`
  <section>
    <div>
      <h1 class="big-text">What is IT Library</h1>
      <div class="quotes">
        <div class="quote">if you love your books, let them go</div>
        <div class="quote">an unlikely global sociology experiment</div>
        <div class="quote">a modern-day message in a bottle</div>
      </div>
    </div>
    <article>
      <div class="">
        <h2>IT Library</h2>
        <p>
          IT library is ... Nulla ut voluptate aliquip in incididunt magna.
          Consequat aute sint enim cillum eu aliquip mollit labore eu culpa est
          irure eiusmod. Mollit cupidatat pariatur ullamco mollit velit
          incididunt est voluptate ad esse ea. Qui occaecat ea qui esse elit
          reprehenderit ad consectetur aute culpa ad cillum est. Mollit
          adipisicing exercitation est consectetur ea incididunt excepteur anim.
          Ut voluptate incididunt veniam labore ullamco. Duis est nulla quis
          exercitation consectetur pariatur qui cillum dolor.
        </p>
      </div>
    </article>
    <article>
      <div class="">
        <h2>New books added</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam sequi
          saepe distinctio hic perferendis similique ad id corporis animi
          delectus eius, nostrum omnis placeat suscipit natus labore obcaecati
          fugiat? Doloribus!
        </p>
      </div>
    </article>
    <article>
      <div class="">
        <h2>Become part of the revolutionary worldwide booksharing system!</h2>
        <p>
          Ad dolore in ea irure do eu sunt ullamco est nulla ex exercitation
          officia deserunt. Dolore ad minim pariatur ut sint laborum occaecat.
          Amet deserunt enim enim deserunt pariatur. Consectetur qui Lorem sit
          non cillum laboris.
        </p>
      </div>
    </article>
    <article>
      <div class="">
        <h3 class="">Book sharing – a great way to help our environment.</h3>
        <p>
          We can share books through different ways such as sharing between
          friends or family members or using libraries. You will also read about
          another way to share books.
        </p>
        <p>
          Dolor sit magna ad labore incididunt in tempor eu sint amet. Aute
          deserunt velit eiusmod tempor veniam minim occaecat est excepteur
          nostrud tempor minim. Adipisicing proident aute enim fugiat cupidatat
          et dolor. Reprehenderit id nulla esse irure aliqua magna nisi qui
          minim. Et commodo aliqua aliqua minim do adipisicing est aute. Aliquip
          in ea nostrud excepteur qui irure dolor ut nisi officia ipsum non
          amet. Officia deserunt duis veniam ut. Minim aliquip aliqua est enim.
          Tempor irure do cupidatat voluptate in. Mollit reprehenderit nostrud
          occaecat excepteur reprehenderit in veniam. Dolor labore commodo
          tempor in culpa aliqua mollit esse consectetur id. Est minim commodo
          dolor dolor.
        </p>
      </div>
    </article>
    <button>About Us</button>
    <button>How to</button>
    <button>Sign Up</button>
  </section>
`;

export class Home extends HTMLElement {
  static selector = "app-home-page";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    decorateAsComponent(this, homePageTemplate);

    decorateAsStateProperty(this, "isLoading", false);
  }
}

customElements.define(Home.selector, Home);
