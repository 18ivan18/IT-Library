export const redirect = (path = "/") => {
  if (path === getCurrentURL()) return;
  history.pushState(null, "", path);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
};

export const getCurrentURL = () => {
  return window.location.href;
};
