import { bootstrap } from ".";
import { NotFound } from "../components/";
import { getCurrentURL } from "./history";

export class Router {
  constructor(outlet, routes) {
    this.routes = routes;
    this.outlet = outlet;
  }

  route = () => {
    console.log("routing");
    const path = this.parseLocation();
    const component = this.findComponentByPath(path) || { ctor: NotFound };
    bootstrap(this.outlet, component.ctor, component.args);
  };

  SetRoutes = (routes) => {
    this.routes = routes;
  };

  parseLocation = () => location.pathname.toLowerCase();

  findComponentByPath = (path) =>
    this.routes.find((r) => r.path.match(new RegExp(`^${path}$`, "gmi"))) ||
    undefined;

  startListening = () => {
    this.route();
    window.addEventListener("navigate", this.route);
    window.addEventListener("popstate", this.route);
  };

  stopListening = () => {
    window.removeEventListener("navigate", this.route);
    window.removeEventListener("popstate", this.route);
  };
}
