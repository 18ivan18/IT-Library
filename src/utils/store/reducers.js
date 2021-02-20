export const initialState = {
  auth: { isLoggedIn: false, user: null, token: null },
  resources: [],
};

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_RESOURCES = "SET_RESOURCES";

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        auth: {
          user: action.payload.user,
          isLoggedIn: true,
          token: action.payload.token,
        },
      };
    case LOGOUT:
      return { ...state, auth: { isLoggedIn: false } };
    case SET_RESOURCES:
      return { ...state, resources: action.payload.books };
    default:
      return state;
  }
};
