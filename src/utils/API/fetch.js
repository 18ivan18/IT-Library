import { Store, parse, nextTick } from "../";
export const getBooks = (urlParams, self) => {
  self.isLoading = true;
  fetch(parse("/", new URLSearchParams(urlParams)))
    .then((data) => data.json())
    .then((resources) => {
      Store.dispatch({
        type: "SET_RESOURCES",
        payload: {
          resources,
        },
      });
      nextTick(() => (document.documentElement.scrollTop = window.innerHeight));
    })
    .catch(console.log)
    .finally(() => {
      self.isLoading = false;
    });
};
