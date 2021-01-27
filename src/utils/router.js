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
    bootstrap(this.outlet, component.ctor, component.params);
  };

  SetRoutes = (routes) => {
    this.routes = routes;
  };

  parseLocation = () => location.pathname.toLowerCase();

  findComponentByPath = (path) => {
    const params = {};
    const result = this.routes.find((r) => {
      const pathArr = r.path.split("/").slice(1);
      const toBeMatchedArr = path.split("/").slice(1);
      if (pathArr.length !== toBeMatchedArr.length) {
        return false;
      }
      for (let index = 0; index < pathArr.length; index++) {
        const chunk = pathArr[index];
        if (chunk.match(/^:/)) {
          params[chunk.slice(1)] = toBeMatchedArr[index];
        } else if (chunk !== toBeMatchedArr[index]) {
          return false;
        }
      }
      return true;
    });
    if (result) {
      result.params = params;
    }
    return result || undefined;
  };

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
