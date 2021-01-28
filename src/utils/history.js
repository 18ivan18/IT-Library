export const redirect = (path = "/") => {
  if (path === getCurrentURL()) return;
  history.pushState(null, "", path);
  window.dispatchEvent(new Event("navigate"));
  document.documentElement.scrollTop = 0;
};

export const getCurrentURL = () => {
  return window.location.href;
};

export const isLate = (date, daysToBeHeld) => {
  if (!date) return false;
  if (!daysToBeHeld) return false;
  const takenDate = new Date(date);
  const returnDate = daysToBeHeld * 24 * 60 * 60 * 1000 + +takenDate;
  const now = new Date();
  return now > returnDate;
};

export const scroll = () => {
  window.scrollTo({
    top: 100,
    left: 100,
    behavior: "smooth",
  });
};
