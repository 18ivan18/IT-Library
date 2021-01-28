import { Store, parse } from "../";
export const getBooks = (urlParams) => {
  fetch(parse("/", new URLSearchParams(urlParams)))
    .then((data) => data.json())
    .then((resources) => {
      Store.dispatch({
        type: "SET_RESOURCES",
        payload: {
          resources,
        },
      });
    })
    .catch((err) => console.log(err));
};
