export const initialState = {
  auth: { isLoggedIn: false, user: null },
  resources: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        auth: { user: action.payload.user, isLoggedIn: true },
      };
      break;
    case "LOGOUT":
      return { ...state, auth: { isLoggedIn: false } };
      break;
    case "SET_RESOURCES":
      return { ...state, resources: action.payload.resources };
      break;
    default:
      return state;
      break;
  }
};
