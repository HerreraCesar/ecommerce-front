import { notifyInfo, notifySuccess } from "../../services/notifications";

import { authTypes } from "../types/auth.types";

const { SIGNUP, SIGNIN, SIGNOUT, CHECK_TOKEN } = authTypes;
const existingUser = JSON.parse(localStorage.getItem("user"));
let initialState;
if (existingUser) {
  initialState = {
    token: existingUser.token,
    email: existingUser.email,
    username: existingUser.username,
    cart: existingUser.cart,
    chat: existingUser.chat,
    timestamp: existingUser.timestamp,
    validated: true,
  };
} else {
  initialState = {
    token: null,
    email: null,
    username: null,
    cart: null,
    chat: null,
    timestamp: null,
    validated: false,
  };
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      notifySuccess(`Bienvenido ${action.username}`);
      return {
        ...state,
        token: action.token,
        email: action.email,
        username: action.username,
        cart: action.cart,
        chat: action.chat,
        timestamp: action.timestamp,
        validated: action.validated,
      };
    case SIGNIN:
      notifySuccess(`Bienvenido ${action.username}`);
      return {
        ...state,
        token: action.token,
        email: action.email,
        username: action.username,
        cart: action.cart,
        chat: action.chat,
        timestamp: action.timestamp,
        validated: action.validated,
      };
    case SIGNOUT:
      notifyInfo(`Hasta luego ${state.username}`);
      return {
        initialState,
        validated: action.validated,
      };
    case CHECK_TOKEN:
      return {
        ...state,
        validated: action.validated,
      };
    default:
      return state;
  }
};

export default authReducer;
