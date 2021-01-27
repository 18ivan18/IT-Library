export const redirect = (path = "/") => {
  if (path === getCurrentURL()) return;
  history.pushState(null, "", path);
  window.dispatchEvent(new Event("navigate"));
};

export const getCurrentURL = () => {
  return window.location.href;
};

export const getRouteParams = (url) => {
  let argsVal,
    argsNames,
    params = {};

  for (let x = 0; x < routes.length; x++) {
    const currRoute = routes[x].url;
    const routeMatcher = new RegExp(currRoute.replace(/(:\w+)/g, "([\\w-]+)"));
    argsVal = url.match(routeMatcher);

    if (argsVal) {
      argsVal.shift();
      argsNames = currRoute.match(/(:\w+)/g);

      if (argsNames) {
        for (let y = 0; y < argsNames.length; y++) {
          params[argsNames[y].slice(1)] = argsVal[y];
        }
      }

      return {
        params: params,
      };
    }
  }
  return null;
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
