import { bootstrap } from ".";
import { NotFound } from "../components/";

export class Router {
  constructor(outlet, routes) {
    this.routes = routes;
    this.outlet = outlet;
  }

  route = () => {
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
    window.addEventListener("hashchange", this.route);
    window.addEventListener("load", this.route);
  };

  stopListening = () => {
    window.removeEventListener("hashchange", this.route);
    window.removeEventListener("load", this.route);
  };
}
