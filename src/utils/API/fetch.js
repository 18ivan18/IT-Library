import { Store, parse, nextTick } from "../";
export const getBooks = (urlParams, self) => {
  self.isLoading = true;
  fetch(parse("books", new URLSearchParams(urlParams)))
    .then((data) => data.json())
    .then((resp) => {
      if (resp.success) {
        Store.dispatch({
          type: "SET_RESOURCES",
          payload: {
            books: resp.books,
          },
        });
      }
      nextTick(() => (document.documentElement.scrollTop = window.innerHeight));
    })
    .catch(console.log)
    .finally(() => {
      self.isLoading = false;
    });
};
