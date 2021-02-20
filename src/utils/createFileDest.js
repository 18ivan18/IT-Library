import { config } from "./../../config";

export const parse = (url, query) => {
  if (config.api.technology === "php") {
    if (url === "/") {
      url = "root";
    }
    let parsed = config.api.url + url + ".php";
    if (query) {
      parsed += "?" + query;
    }
    return parsed;
  }
  if (config.api.technology === "js") {
    if (url === "/") {
      url = "";
    }
    let parsed = config.api.url + url;
    if (query) {
      parsed += "?" + query;
    }
    return parsed;
  }
};
