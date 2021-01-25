export const redirect = (path = "/") => {
  if (path === getCurrentURL()) return;
  history.pushState(null, "", path);
  window.dispatchEvent(new Event("navigate"));
};

export const getCurrentURL = () => {
  return window.location.href;
};
