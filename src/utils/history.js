export const redirect = (path = "/") => {
  history.pushState(null, "", path);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
};
