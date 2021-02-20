import { bootstrap } from ".";
import { NotFound } from "../components/";

export class Router {
  constructor(outlet, routes) {
    this.routes = routes;
    this.outlet = outlet;
  }

  route = () => {
    const path = this.parseLocation();
    let component = this.findComponentByPath(path, this.routes) || {
      ctor: NotFound,
    };
    console.log(component);
    let index = 0;
    while (this.outlet.firstChild) {
      this.outlet.removeChild(this.outlet.lastChild);
    }
    while (component) {
      bootstrap(this.outlet, component.ctor, component.params);
      component = component.childrenToBeRendered[index++];
    }
  };

  SetRoutes = (routes) => {
    this.routes = routes;
  };

  parseLocation = () => location.pathname.toLowerCase();

  // findComponentByPath = (path) => {
  //   const params = {};
  //   const result = this.routes.find((r) => {
  //     const pathArr = r.path.split("/").slice(1);
  //     const toBeMatchedArr = path.split("/").slice(1);
  //     if (pathArr.length !== toBeMatchedArr.length) {
  //       return false;
  //     }
  //     for (let index = 0; index < pathArr.length; index++) {
  //       const chunk = pathArr[index];
  //       if (chunk.match(/^:/)) {
  //         params[chunk.slice(1)] = toBeMatchedArr[index];
  //       } else if (chunk !== toBeMatchedArr[index]) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   });
  //   if (result) {
  //     result.params = params;
  //   }
  //   return result || undefined;
  // };

  findComponentByPath = (path, routes) => {
    if (!routes) return undefined;
    const params = {},
      children = [];
    let index;
    console.log(path, routes);
    const result = routes.find((r) => {
      index = 0;
      const base = r.path.split("/").slice(1)[0];
      const rest = path
        .split("/")
        .slice(2)
        .reduce((acc, next) => acc + "/" + next, "");
      const toBeMatched = path.split("/").slice(1)[0];
      console.log("pathARR", base, "toBeMatchedARR", toBeMatched, "rest", rest);

      if (base === toBeMatched) {
        const nested = this.findComponentByPath(rest, r.children);
        if (nested) children.push(nested);
        return true;
      }
      return false;
    });
    if (result) {
      result.params = params;
      result.childrenToBeRendered = children;
    }
    return result || undefined;
  };

  startListening = () => {
    this.route();
    window.addEventListener("navigate", this.route);
    window.addEventListener("popstate", this.route);
    window.addEventListener("hashchange", (e) => e.preventDefault());
  };

  stopListening = () => {
    window.removeEventListener("navigate", this.route);
    window.removeEventListener("popstate", this.route);
  };
}
