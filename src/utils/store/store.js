import { initialState, reducer } from "./reducers";

const createStore = (reducer, initialState) => {
  const store = {};

  store.state = initialState;
  store.listeners = [];
  store.subscribe = (listener) => store.listeners.push(listener);
  store.dispatch = (action) => {
    // validateAction(action);

    store.state = reducer(store.state, action);
    store.listeners.forEach((listener) => listener(action));
  };
  store.getState = () => store.state;

  return store;
};

export const Store = createStore(reducer, initialState);
